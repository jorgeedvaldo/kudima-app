import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const categories = [
    { id: 1, name: 'Design', icon: 'palette', library: Ionicons, color: '#E3F2FD' },
    { id: 2, name: 'Marketing', icon: 'bullhorn', library: MaterialCommunityIcons, color: '#FFF3E0' },
    { id: 3, name: 'Vídeo', icon: 'video', library: MaterialCommunityIcons, color: '#FCE4EC' },
    { id: 4, name: 'Tech', icon: 'code', library: MaterialIcons, color: '#E8F5E9' },
    { id: 5, name: 'Música', icon: 'music', library: FontAwesome5, color: '#F3E5F5' },
    { id: 6, name: 'Foto', icon: 'camera', library: Ionicons, color: '#E0F7FA' },
    { id: 7, name: 'Limpeza', icon: 'broom', library: MaterialCommunityIcons, color: '#FFF8E1' },
    { id: 8, name: 'Reparos', icon: 'tools', library: FontAwesome5, color: '#FFEBEE' },
];

const recentSearches = [
    'Eletricista residencial',
    'Limpeza de sofá',
    'Desenvolvimento Web',
    'Professor de Inglês'
];

export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="O que você está procurando?"
                        placeholderTextColor="#999"
                        autoFocus={false}
                    />
                    <TouchableOpacity>
                        <Ionicons name="options-outline" size={24} color="#7F57F1" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pesquisas Recentes</Text>
                    <View style={styles.recentTags}>
                        {recentSearches.map((search, index) => (
                            <TouchableOpacity key={index} style={styles.recentTag}>
                                <Ionicons name="time-outline" size={16} color="#666" style={{ marginRight: 6 }} />
                                <Text style={styles.recentText}>{search}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Navegar por Categorias</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>Ver Todas</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.categoriesGrid}>
                        {categories.map((cat) => (
                            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: cat.color }]}>
                                <View style={styles.categoryIcon}>
                                    <cat.library name={cat.icon} size={28} color="#333" />
                                </View>
                                <Text style={styles.categoryName}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tendências</Text>
                    <View style={styles.trendingContainer}>
                        <TouchableOpacity style={styles.trendingItem}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=500&auto=format&fit=crop&q=60' }}
                                style={styles.trendingImage}
                            />
                            <View style={styles.trendingInfo}>
                                <Text style={styles.trendingTitle}>Lavagem a Seco</Text>
                                <Text style={styles.trendingSubtitle}>+120 buscas hoje</Text>
                            </View>
                            <Ionicons name="trending-up" size={20} color="#7F57F1" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.trendingItem}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1581092921461-eab62e97a782?w=500&auto=format&fit=crop&q=60' }}
                                style={styles.trendingImage}
                            />
                            <View style={styles.trendingInfo}>
                                <Text style={styles.trendingTitle}>Manutenção de AC</Text>
                                <Text style={styles.trendingSubtitle}>+85 buscas hoje</Text>
                            </View>
                            <Ionicons name="trending-up" size={20} color="#7F57F1" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    section: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    seeAll: {
        fontSize: 14,
        color: '#7F57F1',
        fontWeight: '600',
    },
    recentTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    recentTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    recentText: {
        fontSize: 14,
        color: '#333',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: (width - 60) / 2, // 2 columns with spacing
        aspectRatio: 1.5,
        borderRadius: 16,
        padding: 15,
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    categoryIcon: {
        alignSelf: 'flex-start',
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 10,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    trendingContainer: {
        marginTop: -5,
    },
    trendingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    trendingImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    trendingInfo: {
        flex: 1,
        marginLeft: 15,
    },
    trendingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    trendingSubtitle: {
        fontSize: 12,
        color: '#4CAF50',
        marginTop: 4,
    },
});
