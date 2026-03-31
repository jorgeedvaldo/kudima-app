import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../context/AuthContext';
import { updateBaseUrl } from '../api/axios';

export default function LoginScreen({ navigation }) {
    const { login } = React.useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfig, setShowConfig] = useState(false);
    const [customApiUrl, setCustomApiUrl] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            // AppNavigator will automatically transition to MainTabs
        } catch (error) {
            console.error(error);
            alert('Falha no login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveConfig = async () => {
        if (!customApiUrl) return;
        await updateBaseUrl(customApiUrl);
        Alert.alert('Sucesso', 'Endereço da API atualizado. Reinicie a app se necessário.');
        setShowConfig(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Bem-vindo ao Kudima</Text>
                        <Text style={styles.subtitle}>Faça login para continuar</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="seu@email.com"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="********"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && { opacity: 0.7 }]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.forgotButton}>
                            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowConfig(!showConfig)} style={{ marginTop: 15, alignSelf: 'center' }}>
                            <Text style={{ color: '#999', fontSize: 12 }}>Configurar Servidor API</Text>
                        </TouchableOpacity>

                        {showConfig && (
                            <View style={{ marginTop: 15, backgroundColor: '#f5f5f5', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#eee' }}>
                                <Text style={{fontSize: 12, color: '#666', marginBottom: 8}}>Insira a URL local da sua máquina (ex: http://192.168.1.100:8000)</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: '#fff', padding: 12 }]}
                                    placeholder="http://192.168.x.x:8000"
                                    value={customApiUrl}
                                    onChangeText={setCustomApiUrl}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity onPress={handleSaveConfig} style={[styles.button, { marginTop: 10, padding: 12 }]}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar URL</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Não tem uma conta? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.linkText}>Criar conta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#7F57F1', // Primary Purple
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
    button: {
        backgroundColor: '#7F57F1',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#7F57F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotButton: {
        alignItems: 'center',
        marginTop: 15,
    },
    forgotText: {
        color: '#7F57F1',
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#666',
        fontSize: 14,
    },
    linkText: {
        color: '#7F57F1',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
