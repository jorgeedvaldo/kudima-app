import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/api';

export default function EditProfileScreen({ navigation, route }) {
    const { user: initialUser } = route.params || {};

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (initialUser) {
            populateFields(initialUser);
        } else {
            loadUser();
        }
    }, [initialUser]);

    const populateFields = (userData) => {
        setName(userData.name || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
        // API might not have address yet, handle gracefully
        setAddress(userData.address || '');
    };

    const loadUser = async () => {
        setLoading(true);
        try {
            const userData = await authService.getUser();
            populateFields(userData);
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível carregar os dados.');
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await authService.updateProfile({
                name,
                email, // Email change might require verification or be restricted
                phone,
                address
            });
            Alert.alert('Sucesso', 'Perfil atualizado com sucesso!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error(error);
            const msg = error.message || 'Falha ao atualizar perfil.';
            Alert.alert('Erro', msg);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#7F57F1" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meus Dados</Text>
                <TouchableOpacity onPress={handleSave} disabled={saving}>
                    {saving ? (
                        <ActivityIndicator size="small" color="#7F57F1" />
                    ) : (
                        <Text style={styles.saveText}>Salvar</Text>
                    )}
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.imageSection}>
                    <Image
                        source={{ uri: initialUser?.profile_image_url || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60' }}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.changePhotoText}>
                        <Text style={styles.photoText}>Alterar foto</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome Completo</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Seu nome"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: '#f0f0f0', color: '#999' }]}
                        value={email}
                        editable={false} // Usually email is not editable directly
                        placeholder="Seu email"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+244 923 ... "
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Endereço</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Sua morada"
                    />
                </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    saveText: {
        color: '#7F57F1',
        fontWeight: 'bold',
        fontSize: 16,
    },
    content: {
        padding: 20,
    },
    imageSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    photoText: {
        color: '#7F57F1',
        fontWeight: '600',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#666',
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#eee',
    },
});
