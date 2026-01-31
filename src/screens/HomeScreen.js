import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { dataService } from '../services/api';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    const [categories, setCategories] = useState([]);
    const [popularServices, setPopularServices] = useState([]);
    const [popularProfessionals, setPopularProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [cats, servs, pros] = await Promise.all([
                    dataService.getCategories(),
                    dataService.getServices(), // Assuming this gives us a list we can slice for popular
                    dataService.getProfessionals() // Assuming this gives a list
                ]);

                // Map/Filter data as needed if API response structure differs slightly from UI needs
                // For now assuming direct mapping or slight adjustments:
                setCategories(cats);
                setPopularServices(servs.slice(0, 5)); // Take first 5 as popular
                setPopularProfessionals(pros.slice(0, 5)); // Take first 5
            } catch (error) {
                console.error("Error fetching home data:", error);
                // Fallback to mock data or empty state could be handled here
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to render category icon/image (API might return image_url)
    const renderCategoryIcon = (cat) => {
        if (cat.image_url) {
            return <Image source={{ uri: cat.image_url }} style={{ width: 30, height: 30 }} resizeMode="contain" />;
        }
        // Fallback icon logic if no image
        return <Ionicons name="grid-outline" size={24} color="#333" />;
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#7F57F1" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header Section */}
            <View style={styles.header}>
                <SafeAreaView edges={['top', 'left', 'right']}>
                    <View style={styles.headerTop}>
                        <View>
                            <Text style={styles.greeting}>Olá, Damilk 👋</Text>
                            <Text style={styles.headerTitle}>Vamos encontrar o{'\n'}melhor talento para você</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('Notifications')}>
                            <Ionicons name="notifications-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#7F57F1" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar serviço"
                            placeholderTextColor="#999"
                        />
                    </View>
                </SafeAreaView>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Categories Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categorias de Serviço</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Buscar')}>
                        <Text style={styles.seeAll}>Ver Tudo</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.categoriesGrid}>
                    {categories.map((cat) => (
                        <TouchableOpacity key={cat.id} style={styles.categoryItem} onPress={() => navigation.navigate('Buscar')}>
                            <View style={styles.iconContainer}>
                                {renderCategoryIcon(cat)}
                            </View>
                            <Text style={styles.categoryName} numberOfLines={2}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Popular Services Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Serviços Populares</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('PopularServices')}>
                        <Text style={styles.seeAll}>Ver Tudo</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularList}>
                    {popularServices.map((service) => (
                        <TouchableOpacity
                            key={service.id}
                            style={styles.popularCard}
                            onPress={() => navigation.navigate('ServiceDetails', { serviceId: service.id })}
                        >
                            <Image
                                source={{ uri: service.image_url || 'https://via.placeholder.com/200' }}
                                style={styles.popularImage}
                            />
                            <View style={styles.popularOverlay}>
                                <Text style={styles.popularTitle}>{service.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Popular Professionals Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Profissionais Populares</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>Ver Tudo</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.popularList}>
                    {popularProfessionals.map((pro) => (
                        <TouchableOpacity
                            key={pro.id}
                            style={styles.proCard}
                            onPress={() => navigation.navigate('ServiceDetails', { professionalId: pro.id })}
                        >
                            <Image
                                source={{ uri: pro.profile_image_url || 'https://via.placeholder.com/150' }}
                                style={styles.proImage}
                            />
                            <View style={styles.proInfo}>
                                <Text style={styles.proName}>{pro.name}</Text>
                                <Text style={styles.proRole} numberOfLines={1}>
                                    {pro.professional_profile?.bio ? pro.professional_profile.bio.substring(0, 20) : 'Profissional'}
                                </Text>
                                <View style={styles.ratingRow}>
                                    <Ionicons name="star" size={12} color="#FFD700" />
                                    <Text style={styles.ratingText}>5.0</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#7F57F1',
        paddingHorizontal: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 20,
    },
    greeting: {
        fontSize: 16,
        color: '#E0D4FC',
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        lineHeight: 32,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    content: {
        flex: 1,
        paddingTop: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: 14,
        color: '#7F57F1',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    categoryItem: {
        width: '25%',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    categoryName: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    popularList: {
        paddingLeft: 20,
        marginBottom: 30,
    },
    popularCard: {
        width: 200,
        height: 140,
        marginRight: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    popularImage: {
        width: '100%',
        height: '100%',
    },
    popularOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 12,
    },
    popularTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    proCard: {
        width: 160,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginRight: 16,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    proImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 10,
    },
    proInfo: {
        alignItems: 'center',
    },
    proName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    proRole: {
        fontSize: 12,
        color: '#999',
        marginBottom: 6,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9C4',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#FBC02D',
        marginLeft: 2,
    },
});
