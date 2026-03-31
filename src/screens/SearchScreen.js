import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getImageUrl } from '../api/axios';
import { dataService } from '../services/api';

const { width } = Dimensions.get('window');

export default function SearchScreen({ navigation }) {
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const cats = await dataService.getCategories();
                setCategories(cats);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);
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
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={() => {
                            if (searchText.trim()) {
                                navigation.navigate('PopularServices', { searchQuery: searchText });
                            }
                        }}
                    />
                    <TouchableOpacity>
                        <Ionicons name="options-outline" size={24} color="#7F57F1" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Navegar por Categorias</Text>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color="#7F57F1" style={{ marginTop: 20 }} />
                    ) : (
                        <View style={styles.categoriesGrid}>
                            {categories.map((cat) => (
                                <TouchableOpacity 
                                    key={cat.id} 
                                    style={[styles.categoryCard, { backgroundColor: '#F7F7F7' }]}
                                    onPress={() => navigation.navigate('PopularServices', { categoryId: cat.id, categoryName: cat.name })}
                                >
                                    <View style={styles.categoryIcon}>
                                        {cat.image_url ? (
                                            <Image source={{ uri: getImageUrl(cat.image_url) }} style={{ width: 30, height: 30 }} resizeMode="contain" />
                                        ) : (
                                            <Ionicons name="grid" size={28} color="#7F57F1" />
                                        )}
                                    </View>
                                    <Text style={styles.categoryName} numberOfLines={2}>{cat.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
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
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: (width - 60) / 2,
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
});
