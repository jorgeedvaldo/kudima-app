import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const categories = [
    { id: 1, name: 'Design Gráfico', icon: 'palette', library: Ionicons },
    { id: 2, name: 'Marketing Digital', icon: 'bullhorn', library: MaterialCommunityIcons },
    { id: 3, name: 'Vídeo & Animação', icon: 'video', library: MaterialCommunityIcons },
    { id: 4, name: 'Prog. & Tech', icon: 'code', library: MaterialIcons },
    { id: 5, name: 'Música & Áudio', icon: 'music', library: FontAwesome5 },
    { id: 6, name: 'Fotografia', icon: 'camera', library: Ionicons },
    { id: 7, name: 'UI/UX Design', icon: 'pen-tool', library: FontAwesome5 },
    { id: 8, name: 'Reparações', icon: 'tools', library: FontAwesome5 },
];

const popularServices = [
    { id: 1, title: 'Limpeza Residencial', image: 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=500&auto=format&fit=crop&q=60' },
    { id: 2, title: 'Reparos Elétricos', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
    { id: 3, title: 'Encanador', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
];

const popularProfessionals = [
    { id: 1, name: 'Maria Silva', title: 'Especialista em Limpeza', rating: '4.9', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60' },
    { id: 2, name: 'João Sousa', title: 'Eletricista', rating: '4.7', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Lucas Pereira', title: 'Montador', rating: '4.8', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60' },
];

export default function HomeScreen({ navigation }) {
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
                                <cat.library name={cat.icon} size={24} color="#333" />
                            </View>
                            <Text style={styles.categoryName}>{cat.name}</Text>
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
                            onPress={() => navigation.navigate('ServiceDetails')}
                        >
                            <Image source={{ uri: service.image }} style={styles.popularImage} />
                            <View style={styles.popularOverlay}>
                                <Text style={styles.popularTitle}>{service.title}</Text>
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
                            onPress={() => navigation.navigate('ServiceDetails')}
                        >
                            <Image source={{ uri: pro.image }} style={styles.proImage} />
                            <View style={styles.proInfo}>
                                <Text style={styles.proName}>{pro.name}</Text>
                                <Text style={styles.proRole}>{pro.title}</Text>
                                <View style={styles.ratingRow}>
                                    <Ionicons name="star" size={12} color="#FFD700" />
                                    <Text style={styles.ratingText}>{pro.rating}</Text>
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
