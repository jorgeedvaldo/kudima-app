import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { dataService } from '../services/api';

const { width } = Dimensions.get('window');

export default function ServiceDetailsScreen({ route, navigation }) {
    const { serviceId, professionalId } = route.params || {};

    const [loading, setLoading] = useState(true);
    const [service, setService] = useState(null);
    const [professionalsList, setProfessionalsList] = useState([]);
    const [selectedPro, setSelectedPro] = useState(null);

    useEffect(() => {
        loadData();
    }, [serviceId, professionalId]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (serviceId) {
                // Fetch all services to find the specific one (as per current API understanding)
                const services = await dataService.getServices();
                const foundService = services.find(s => s.id === serviceId);

                if (foundService) {
                    setService(foundService);

                    // Fetch professionals for this category
                    const pros = await dataService.getProfessionals(foundService.category_id);
                    setProfessionalsList(pros);
                }
            } else if (professionalId) {
                // Fetch professional details and their services
                const pro = await dataService.getProfessionalDetails(professionalId);
                const prosServices = await dataService.getServices({ professional_id: professionalId });

                if (prosServices && prosServices.length > 0) {
                    setService(prosServices[0]); // Pick first service to display details
                    setProfessionalsList([pro]); // Show only this professional
                    setSelectedPro(pro);
                } else {
                    // If pro has no services, maybe show a generic view or just the pro details
                    // For now, we try to show at least the pro info if possible, referencing a generic service wrapper
                    setService({
                        name: 'Perfil Profissional',
                        description: pro.professional_profile?.bio || 'Sem descrição',
                        price: null,
                        image_url: pro.profile_image_url
                    });
                    setProfessionalsList([pro]);
                    setSelectedPro(pro);
                }
            } else {
                // Fallback / Default view for testing if no params
                const services = await dataService.getServices();
                if (services.length > 0) {
                    setService(services[0]);
                    const pros = await dataService.getProfessionals(services[0].category_id);
                    setProfessionalsList(pros);
                }
            }

        } catch (error) {
            console.error("Error loading service details:", error);
            Alert.alert("Erro", "Não foi possível carregar os detalhes do serviço.");
        } finally {
            setLoading(false);
        }
    };

    const handleBook = () => {
        if (!selectedPro) {
            Alert.alert("Selecione um profissional", "Por favor, escolha um profissional para continuar.");
            return;
        }

        Alert.alert("Sucesso", `Você escolheu ${selectedPro.name}. O pedido será iniciado.`);
        // Here you would navigate to a checkout or confirmation screen
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#7F57F1" />
            </View>
        );
    }

    if (!service) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>Serviço não encontrado.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#7F57F1' }}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Hero Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: service.image_url || 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=500&auto=format&fit=crop&q=60' }}
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
                        <Text style={styles.title}>{service.name}</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={16} color="#FFD700" />
                            <Text style={styles.rating}>4.8 (120 reviews)</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.category}>{service.category?.name || 'Geral'}</Text>
                        </View>
                    </View>

                    <View style={styles.priceSection}>
                        <Text style={styles.priceLabel}>Preço estimado</Text>
                        <Text style={styles.price}>{service.price ? `${service.price} Kz` : 'A combinar'}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Profissionais Disponíveis</Text>
                        <Text style={styles.sectionSubtitle}>Escolha um profissional para realizar o serviço</Text>

                        {professionalsList.map((pro) => (
                            <TouchableOpacity
                                key={pro.id}
                                style={[
                                    styles.providerCard,
                                    selectedPro?.id === pro.id && styles.selectedCard
                                ]}
                                onPress={() => setSelectedPro(pro)}
                            >
                                <Image source={{ uri: pro.profile_image_url || 'https://via.placeholder.com/150' }} style={styles.providerImage} />
                                <View style={styles.providerInfo}>
                                    <Text style={styles.providerName}>{pro.name}</Text>
                                    <Text style={styles.providerRole}>{pro.professional_profile?.bio ? pro.professional_profile.bio.substring(0, 30) + '...' : 'Profissional'}</Text>
                                    <View style={styles.proRatingRow}>
                                        <Ionicons name="star" size={12} color="#FFD700" />
                                        <Text style={styles.proRating}>5.0</Text>
                                        <Text style={styles.proPrice}>{service.price ? `${service.price} Kz` : ''}</Text>
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
                        {professionalsList.length === 0 && (
                            <Text style={{ color: '#999', fontStyle: 'italic' }}>Nenhum profissional disponível no momento.</Text>
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sobre o serviço</Text>
                        <Text style={styles.description}>
                            {service.description || 'Sem descrição disponível.'}
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
                        {selectedPro ? `Aceitar e Agendar ${service.price ? '(' + service.price + ' Kz)' : ''}` : 'Escolha um Profissional'}
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
