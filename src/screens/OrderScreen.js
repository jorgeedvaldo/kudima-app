import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Mock Data
const orders = [
    {
        id: '1',
        service: 'Limpeza Residencial',
        provider: 'Maria Silva',
        date: '15 Mai, 14:00',
        price: '5.000 Kz',
        status: 'Em andamento',
        statusColor: '#7F57F1',
        image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=500&auto=format&fit=crop&q=60',
    },
    {
        id: '2',
        service: 'Reparos Elétricos',
        provider: 'João Sousa',
        date: '18 Mai, 09:00',
        price: '12.000 Kz',
        status: 'Agendado',
        statusColor: '#FFA500',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
        id: '3',
        service: 'Encanador',
        provider: 'Pedro Santos',
        date: '10 Mai, 10:30',
        price: '8.000 Kz',
        status: 'Concluído',
        statusColor: '#4CAF50', // Green
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
        id: '4',
        service: 'Jardinagem',
        provider: 'Carlos Oliveira',
        date: '05 Mai, 08:00',
        price: '15.000 Kz',
        status: 'Cancelado',
        statusColor: '#F44336', // Red
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
];

export default function OrderScreen() {
    const [activeTab, setActiveTab] = useState('Ativos');

    const filteredOrders = orders.filter(order => {
        if (activeTab === 'Ativos') {
            return ['Em andamento', 'Agendado'].includes(order.status);
        } else {
            return ['Concluído', 'Cancelado'].includes(order.status);
        }
    });

    const renderOrderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.serviceName}>{item.service}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: item.statusColor + '20' }]}>
                        <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
                    </View>
                </View>
                <Text style={styles.providerName}>Profissional: {item.provider}</Text>

                <View style={styles.divider} />

                <View style={styles.cardFooter}>
                    <View style={styles.footerItem}>
                        <Ionicons name="calendar-outline" size={16} color="#666" />
                        <Text style={styles.footerText}>{item.date}</Text>
                    </View>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </View>
        </View>
    );

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

            <FlatList
                data={filteredOrders}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="clipboard-text-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>Nenhum pedido encontrado</Text>
                    </View>
                }
            />
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
