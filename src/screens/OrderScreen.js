import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { orderService } from '../services/api';
import { getImageUrl } from '../api/axios';

// Mock Data
const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
        case 'pending': return { text: 'Pendente', color: '#FFA500', isHistory: false };
        case 'accepted': return { text: 'Agendado', color: '#FF9800', isHistory: false };
        case 'in_progress': return { text: 'Em andamento', color: '#7F57F1', isHistory: false };
        case 'completed': return { text: 'Concluído', color: '#4CAF50', isHistory: true };
        case 'cancelled':
        case 'rejected': return { text: 'Cancelado', color: '#F44336', isHistory: true };
        default: return { text: status || 'Desconhecido', color: '#999', isHistory: false };
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return 'Sem data definida';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
};

export default function OrderScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('Ativos');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const data = await orderService.getRequests();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        const info = getStatusInfo(order.status);
        if (activeTab === 'Ativos') {
            return !info.isHistory;
        } else {
            return info.isHistory;
        }
    });

    const renderOrderItem = ({ item }) => {
        const info = getStatusInfo(item.status);
        const image = getImageUrl(item.service?.image_url) || 'https://via.placeholder.com/200';
        return (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('OrderDetails', { order: item })}>
                <Image source={{ uri: image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.serviceName}>{item.service?.name || 'Serviço'}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: info.color + '20' }]}>
                            <Text style={[styles.statusText, { color: info.color }]}>{info.text}</Text>
                        </View>
                    </View>
                    <Text style={styles.providerName}>Profissional: {item.professional?.name || 'N/A'}</Text>

                    <View style={styles.divider} />

                    <View style={styles.cardFooter}>
                        <View style={styles.footerItem}>
                            <Ionicons name="calendar-outline" size={16} color="#666" />
                            <Text style={styles.footerText}>{formatDate(item.scheduled_date || item.created_at)}</Text>
                        </View>
                        <Text style={styles.price}>{item.price ? `${item.price} Kz` : 'A combinar'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meus Pedidos</Text>
            </View>

            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Ativos' && styles.activeTab]}
                    onPress={() => setActiveTab('Ativos')}
                >
                    <Text style={[styles.tabText, activeTab === 'Ativos' && styles.activeTabText]}>Ativos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Histórico' && styles.activeTab]}
                    onPress={() => setActiveTab('Histórico')}
                >
                    <Text style={[styles.tabText, activeTab === 'Histórico' && styles.activeTabText]}>Histórico</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#7F57F1" />
                </View>
            ) : (
                <FlatList
                    data={filteredOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id?.toString() || Math.random().toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons name="clipboard-text-outline" size={64} color="#ccc" />
                            <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tab: {
        marginRight: 20,
        paddingBottom: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#7F57F1',
    },
    tabText: {
        fontSize: 16,
        color: '#999',
        fontWeight: '600',
    },
    activeTabText: {
        color: '#7F57F1',
    },
    listContainer: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 16,
        flexDirection: 'row',
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    cardContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        marginRight: 8,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    providerName: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#f5f5f5',
        marginVertical: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7F57F1',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyText: {
        marginTop: 10,
        color: '#999',
        fontSize: 16,
    },
});
