import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrderDetailsScreen({ navigation, route }) {
    // Mock data if no params
    const { orderId = '#12345' } = route.params || {};

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pedido {orderId}</Text>
                <TouchableOpacity>
                    <Text style={styles.helpText}>Ajuda</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Status Section */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <Text style={styles.statusLabel}>Status do Pedido</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>EM ANDAMENTO</Text>
                        </View>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressStep, styles.activeStep]} />
                        <View style={[styles.progressStep, styles.activeStep]} />
                        <View style={styles.progressStep} />
                    </View>
                    <Text style={styles.statusDesc}>O profissional está a caminho do local.</Text>
                </View>

                {/* Service Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalhes do Serviço</Text>
                    <View style={styles.serviceCard}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=500&auto=format&fit=crop&q=60' }}
                            style={styles.serviceImage}
                        />
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceName}>Limpeza Residencial</Text>
                            <Text style={styles.serviceCategory}>Limpeza</Text>
                            <Text style={styles.price}>5.000 Kz</Text>
                        </View>
                    </View>
                </View>

                {/* Professional Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Profissional</Text>
                    <View style={styles.proCard}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60' }}
                            style={styles.proImage}
                        />
                        <View style={styles.proInfo}>
                            <Text style={styles.proName}>Maria Silva</Text>
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={14} color="#FFD700" />
                                <Text style={styles.rating}>4.8 (120 avaliações)</Text>
                            </View>
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
                        <Text style={styles.infoText}>15 Maio, 2024</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={20} color="#7F57F1" />
                        <Text style={styles.infoText}>14:00 - 16:00</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={20} color="#7F57F1" />
                        <Text style={styles.infoText}>Rua dos Exemplos, 123, Luanda</Text>
                    </View>
                </View>

                {/* Payment Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pagamento</Text>
                    <View style={styles.paymentRow}>
                        <Text style={styles.paymentLabel}>Método</Text>
                        <Text style={styles.paymentValue}>Cartão de Crédito (**** 1234)</Text>
                    </View>
                    <View style={[styles.paymentRow, { marginTop: 10 }]}>
                        <Text style={styles.paymentLabel}>Total</Text>
                        <Text style={[styles.paymentValue, { color: '#7F57F1', fontWeight: 'bold' }]}>5.000 Kz</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancelar Pedido</Text>
                </TouchableOpacity>

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
