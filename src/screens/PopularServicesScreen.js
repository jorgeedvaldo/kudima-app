import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { dataService } from '../services/api';
import { getImageUrl } from '../api/axios';

export default function PopularServicesScreen({ route, navigation }) {
    const { categoryId, categoryName, searchQuery } = route?.params || {};
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState(searchQuery || '');

    useEffect(() => {
        loadServices();
    }, [categoryId]);

    const loadServices = async () => {
        setLoading(true);
        try {
            const filters = {};
            if (categoryId) filters.category_id = categoryId;
            if (searchText) filters.search = searchText;
            
            const data = await dataService.getServices(filters);
            setServices(Array.isArray(data) ? data : (data?.data || []));
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })}
        >
            <Image source={{ uri: getImageUrl(item.image_url) || 'https://via.placeholder.com/200' }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>5.0</Text>
                    </View>
                </View>
                <Text style={styles.providerName}>Categoria: {item.category?.name || categoryName || 'Geral'}</Text>

                <View style={styles.cardFooter}>
                    <Text style={styles.price}>{item.price ? `${item.price} Kz` : 'A combinar'}</Text>
                    <View style={styles.bookButton}>
                        <Text style={styles.bookButtonText}>Reservar</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{categoryName ? categoryName : (searchQuery ? `Busca: ${searchQuery}` : 'Serviços')}</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar serviços..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                    onSubmitEditing={loadServices}
                />
            </View>

            {loading ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color="#7F57F1" />
                </View>
            ) : (
                <FlatList
                    data={services}
                    keyExtractor={item => item.id?.toString() || Math.random().toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text style={{textAlign: 'center', color: '#999', marginTop: 50}}>Nenhum serviço encontrado.</Text>}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 45,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        padding: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'space-between',
        paddingVertical: 2,
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
        marginRight: 5,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9C4',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FBC02D',
        marginLeft: 2,
    },
    providerName: {
        fontSize: 13,
        color: '#666',
        marginTop: -4,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7F57F1',
    },
    bookButton: {
        backgroundColor: '#F0EFFC',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    bookButtonText: {
        color: '#7F57F1',
        fontWeight: '600',
        fontSize: 12,
    },
});
