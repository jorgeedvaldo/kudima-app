import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getImageUrl } from '../api/axios';

const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
        case 'pending': return { text: 'Pendente', color: '#FFA500', desc: 'Aguardando o aceite do profissional.' };
        case 'accepted': return { text: 'Agendado', color: '#FF9800', desc: 'O profissional aceitou o pedido.' };
        case 'in_progress': return { text: 'Em andamento', color: '#7F57F1', desc: 'O serviço está em andamento.' };
        case 'completed': return { text: 'Concluído', color: '#4CAF50', desc: 'O serviço foi finalizado.' };
        case 'cancelled':
        case 'rejected': return { text: 'Cancelado', color: '#F44336', desc: 'O pedido foi cancelado ou rejeitado.' };
        default: return { text: status || 'Desconhecido', color: '#999', desc: '' };
    }
};

const formatDate = (dateStr) => {
    if (!dateStr) return 'Sem data definida';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatTime = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '' : date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

export default function OrderDetailsScreen({ navigation, route }) {
    const { order } = route.params || {};

    if (!order) {
        return (
            <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#999' }}>Nenhum detalhe do pedido encontrado.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#7F57F1' }}>Voltar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const info = getStatusInfo(order.status);
    const serviceImg = getImageUrl(order.service?.image_url) || 'https://via.placeholder.com/200';
    const proImg = getImageUrl(order.professional?.avatar_url || order.professional?.professional_profile?.profile_picture_url) || 'https://via.placeholder.com/150';

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pedido #{order.id}</Text>
                <TouchableOpacity>
                    <Text style={styles.helpText}>Ajuda</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Status Section */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <Text style={styles.statusLabel}>Status do Pedido</Text>
                        <View style={[styles.statusBadge, { backgroundColor: info.color + '20' }]}>
                            <Text style={[styles.statusText, { color: info.color }]}>{info.text}</Text>
                        </View>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressStep, info.text !== 'Desconhecido' ? {backgroundColor: info.color} : {}]} />
                    </View>
                    <Text style={styles.statusDesc}>{info.desc}</Text>
                </View>

                {/* Service Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalhes do Serviço</Text>
                    <View style={styles.serviceCard}>
                        <Image
                            source={{ uri: serviceImg }}
                            style={styles.serviceImage}
                        />
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceName}>{order.service?.name || 'Serviço'}</Text>
                            <Text style={styles.serviceCategory}>{order.service?.category?.name || 'Geral'}</Text>
                            <Text style={styles.price}>{order.price ? `${order.price} Kz` : 'A combinar'}</Text>
                        </View>
                    </View>
                </View>

                {/* Professional Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profissional</Text>
                    <View style={styles.proCard}>
                        <Image
                            source={{ uri: proImg }}
                            style={styles.proImage}
                        />
                        <View style={styles.proInfo}>
                            <Text style={styles.proName}>{order.professional?.name || 'N/A'}</Text>
                        </View>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Chat')}>
                                <Ionicons name="chatbubble-ellipses-outline" size={24} color="#7F57F1" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconButton}>
                                <Ionicons name="call-outline" size={24} color="#7F57F1" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Location & Time */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Agendamento</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="calendar-outline" size={20} color="#7F57F1" />
                        <Text style={styles.infoText}>{formatDate(order.scheduled_date || order.created_at)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={20} color="#7F57F1" />
                        <Text style={styles.infoText}>{formatTime(order.scheduled_date || order.created_at)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={20} color="#7F57F1" />
                        <Text style={styles.infoText}>{order.details?.address || order.address || 'Endereço não fornecido'}</Text>
                    </View>
                </View>

                {/* Payment Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pagamento</Text>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Método</Text>
                        <Text style={styles.paymentValue}>{order.payment_method || 'Numerário / Transferência'}</Text>
                    </View>
                    <View style={[styles.paymentRow, { marginTop: 10 }]}>
                        <Text style={styles.paymentLabel}>Total</Text>
                        <Text style={[styles.paymentValue, { color: '#7F57F1', fontWeight: 'bold' }]}>{order.price ? `${order.price} Kz` : 'A combinar'}</Text>
                    </View>
                </View>

                {!info.isHistory && (
                    <TouchableOpacity style={styles.cancelButton} onPress={() => Alert.alert('Aviso', 'Funcionalidade para cancelar pedido não implementada.')}>
                        <Text style={styles.cancelButtonText}>Cancelar Pedido</Text>
                    </TouchableOpacity>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    helpText: {
        color: '#7F57F1',
        fontSize: 14,
        fontWeight: '600',
    },
    content: {
        padding: 20,
    },
    statusCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    statusLabel: {
        fontSize: 16,
        color: '#666',
    },
    statusBadge: {
        backgroundColor: '#E0D4FC',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        color: '#7F57F1',
        fontWeight: 'bold',
        fontSize: 12,
    },
    progressBar: {
        flexDirection: 'row',
        height: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 2,
        marginBottom: 10,
        overflow: 'hidden',
    },
    progressStep: {
        flex: 1,
        height: '100%',
        marginRight: 2,
        borderRadius: 2,
    },
    activeStep: {
        backgroundColor: '#7F57F1',
    },
    statusDesc: {
        color: '#333',
        fontSize: 14,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    serviceCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
    },
    serviceImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    serviceInfo: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    serviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    serviceCategory: {
        color: '#666',
        fontSize: 14,
        marginTop: 2,
    },
    price: {
        color: '#7F57F1',
        fontWeight: 'bold',
        marginTop: 4,
    },
    proCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
    },
    proImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    proInfo: {
        flex: 1,
        marginLeft: 15,
    },
    proName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    rating: {
        marginLeft: 4,
        color: '#666',
        fontSize: 12,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
        padding: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
    },
    infoText: {
        marginLeft: 12,
        color: '#333',
        fontSize: 15,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    paymentLabel: {
        color: '#666',
        fontSize: 15,
    },
    paymentValue: {
        color: '#333',
        fontSize: 15,
        fontWeight: '500',
    },
    cancelButton: {
        marginTop: 10,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F44336',
        borderRadius: 12,
    },
    cancelButtonText: {
        color: '#F44336',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
