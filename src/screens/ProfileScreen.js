import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { authService, setAuthToken } from '../services/api';

export default function ProfileScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const menuItems = [
        { id: '1', icon: 'person-outline', title: 'Meus Dados', iconLib: Ionicons },
        { id: '2', icon: 'card-outline', title: 'Pagamentos', iconLib: Ionicons },
        { id: '3', icon: 'notifications-outline', title: 'Notificações', iconLib: Ionicons },
        { id: '4', icon: 'shield-check-outline', title: 'Segurança & Privacidade', iconLib: MaterialCommunityIcons },
        { id: '5', icon: 'headset', title: 'Ajuda e Suporte', iconLib: Ionicons },
        { id: '6', icon: 'settings-outline', title: 'Configurações', iconLib: Ionicons },
    ];

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            const userData = await authService.getUser();
            setUser(userData);
        } catch (error) {
            console.error("Failed to load user profile:", error);
            // Optionally redirect to login if 401
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            "Sair",
            "Tem certeza que deseja sair?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await authService.logout();
                            setAuthToken(null);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        } catch (error) {
                            console.error("Logout failed", error);
                            // Force logout anyway locally
                            setAuthToken(null);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Login' }],
                            });
                        }
                    }
                }
            ]
        );
    };

    const handleMenuPress = (itemId) => {
        switch (itemId) {
            case '1': navigation.navigate('EditProfile', { user }); break;
            case '2': navigation.navigate('Payments'); break;
            case '3': navigation.navigate('Notifications'); break;
            case '4': navigation.navigate('Security'); break;
            case '5': navigation.navigate('Help'); break;
            case '6': navigation.navigate('Settings'); break;
            default: break;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#7F57F1" />

            <View style={styles.header}>
                <View style={styles.profileInfo}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: user?.profile_image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60' }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile', { user })}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
                    <Text style={styles.email}>{user?.email || 'email@exemplo.com'}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Pedidos</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>4.8</Text>
                        <Text style={styles.statLabel}>Avaliação</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Pontos</Text>
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.menuItem}
                            onPress={() => handleMenuPress(item.id)}
                        >
                            <View style={[styles.menuIcon, { backgroundColor: '#F0EFFC' }]}>
                                <item.iconLib name={item.icon} size={22} color="#7F57F1" />
                            </View>
                            <Text style={styles.menuTitle}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={[styles.menuItem, { marginTop: 20 }]}
                        onPress={handleLogout}
                    >
                        <View style={[styles.menuIcon, { backgroundColor: '#FFEBEE' }]}>
                            <Ionicons name="log-out-outline" size={22} color="#F44336" />
                        </View>
                        <Text style={[styles.menuTitle, { color: '#F44336' }]}>Sair</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#7F57F1',
        paddingTop: 20,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#fff',
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#333',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#E0D4FC',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 16,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 10,
    },
    statItem: {
        alignItems: 'center',
        minWidth: 70,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    statLabel: {
        fontSize: 12,
        color: '#E0D4FC',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: 15,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    menuContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    menuTitle: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});
