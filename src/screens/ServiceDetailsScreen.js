import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const professionals = [
    {
        id: '1',
        name: 'Maria Silva',
        role: 'Especialista em Limpeza',
        rating: '4.9',
        reviews: '120',
        price: '5.000 Kz',
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60'
    },
    {
        id: '2',
        name: 'João Sousa',
        role: 'Limpeza e Organização',
        rating: '4.7',
        reviews: '85',
        price: '4.500 Kz',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    },
    {
        id: '3',
        name: 'Ana Costa',
        role: 'Limpeza Pós-Obra',
        rating: '5.0',
        reviews: '42',
        price: '6.000 Kz',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60'
    },
];

export default function ServiceDetailsScreen({ navigation }) {
    const [selectedPro, setSelectedPro] = useState(null);

    const handleBook = () => {
        if (!selectedPro) {
            Alert.alert("Selecione um profissional", "Por favor, escolha um profissional para continuar.");
            return;
        }
        Alert.alert("Sucesso", `Você escolheu ${selectedPro.name}. O pedido será iniciado.`);
        // Here you would navigate to a checkout or confirmation screen
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=500&auto=format&fit=crop&q=60' }}
                        style={styles.image}
                    />
                    <View style={styles.headerOverlay}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bookmarkButton}>
                            <Ionicons name="bookmark-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>Limpeza Residencial Completa</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.rating}>4.8 (120 reviews)</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.category}>Limpeza</Text>
                        </View>
                    </View>

                    <View style={styles.priceSection}>
                        <Text style={styles.priceLabel}>Preço médio</Text>
                        <Text style={styles.price}>5.000 Kz <Text style={styles.perUnit}>/ hora</Text></Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Profissionais Disponíveis</Text>
                        <Text style={styles.sectionSubtitle}>Escolha um profissional para realizar o serviço</Text>

                        {professionals.map((pro) => (
                            <TouchableOpacity
                                key={pro.id}
                                style={[
                                    styles.providerCard,
                                    selectedPro?.id === pro.id && styles.selectedCard
                                ]}
                                onPress={() => setSelectedPro(pro)}
                            >
                                <Image source={{ uri: pro.image }} style={styles.providerImage} />
                                <View style={styles.providerInfo}>
                                    <Text style={styles.providerName}>{pro.name}</Text>
                                    <Text style={styles.providerRole}>{pro.role}</Text>
                                    <View style={styles.proRatingRow}>
                                        <Ionicons name="star" size={12} color="#FFD700" />
                                        <Text style={styles.proRating}>{pro.rating}</Text>
                                        <Text style={styles.proPrice}>{pro.price}</Text>
                                    </View>
                                </View>
                                <View style={styles.radioContainer}>
                                    <View style={[
                                        styles.radioOuter,
                                        selectedPro?.id === pro.id && styles.radioOuterSelected
                                    ]}>
                                        {selectedPro?.id === pro.id && <View style={styles.radioInner} />}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sobre o serviço</Text>
                        <Text style={styles.description}>
                            Oferecemos limpeza completa para sua residência, incluindo sala, quartos, cozinha e banheiros.
                            Nossa equipe utiliza produtos de alta qualidade para garantir a melhor higienização do seu lar.
                            Inclui limpeza de vidros, poeira, e higienização de pisos.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.bookButton, !selectedPro && styles.disabledButton]}
                    onPress={handleBook}
                    disabled={!selectedPro}
                >
                    <Text style={styles.bookButtonText}>
                        {selectedPro ? `Aceitar e Agendar (${selectedPro.price})` : 'Escolha um Profissional'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        height: 250,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    headerOverlay: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookmarkButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
    },
    titleSection: {
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontWeight: '600',
        marginLeft: 5,
        color: '#333',
    },
    dot: {
        marginHorizontal: 8,
        color: '#ccc',
    },
    category: {
        color: '#666',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 12,
    },
    priceSection: {
        marginBottom: 20,
    },
    priceLabel: {
        color: '#999',
        fontSize: 12,
        marginBottom: 2,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7F57F1',
    },
    perUnit: {
        fontSize: 14,
        color: '#999',
        fontWeight: '400',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    section: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    providerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    selectedCard: {
        borderColor: '#7F57F1',
        backgroundColor: '#F0EFFC',
    },
    providerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    providerInfo: {
        flex: 1,
        marginLeft: 12,
    },
    providerName: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: 16,
    },
    providerRole: {
        color: '#666',
        fontSize: 12,
        marginBottom: 4,
    },
    proRatingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    proRating: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 4,
        marginRight: 10,
    },
    proPrice: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#7F57F1',
    },
    radioContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterSelected: {
        borderColor: '#7F57F1',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#7F57F1',
    },
    description: {
        color: '#666',
        lineHeight: 22,
        fontSize: 15,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingBottom: 30, // Safe area approximation
    },
    bookButton: {
        backgroundColor: '#7F57F1',
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
