import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, StatusBar, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const services = [
    { id: '1', title: 'Limpeza Residencial', provider: 'Maria Silva', rating: '4.8', price: '5.000 Kz', image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=500&auto=format&fit=crop&q=60' },
    { id: '2', title: 'Reparos Elétricos', provider: 'João Sousa', rating: '4.7', price: '4.500 Kz', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: '3', title: 'Encanador Profissional', provider: 'Ana Costa', rating: '5.0', price: '6.000 Kz', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: '4', title: 'Jardinagem', provider: 'Pedro Santos', rating: '4.9', price: '5.500 Kz', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500&auto=format&fit=crop&q=60' },
    { id: '5', title: 'Pintura Residencial', provider: 'Carlos Oliveira', rating: '4.6', price: '4.000 Kz', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&auto=format&fit=crop&q=60' },
    { id: '6', title: 'Montagem de Móveis', provider: 'Lucas Pereira', rating: '4.8', price: '3.500 Kz', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=500&auto=format&fit=crop&q=60' },
];

export default function PopularServicesScreen({ navigation }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ServiceDetails')}
        >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.serviceName}>{item.title}</Text>
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>
                <Text style={styles.providerName}>por {item.provider}</Text>

                <View style={styles.cardFooter}>
                    <Text style={styles.price}>{item.price}</Text>
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
                <Text style={styles.headerTitle}>Serviços Populares</Text>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar nos populares..."
                    placeholderTextColor="#999"
                />
            </View>

            <FlatList
                data={services}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
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
