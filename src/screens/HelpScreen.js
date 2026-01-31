import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HelpScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ajuda e Suporte</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.searchBox}>
                    <Ionicons name="search" size={20} color="#999" />
                    <Text style={styles.searchPlaceholder}>Buscar ajuda...</Text>
                </View>

                <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>

                {[
                    'Como cancelar um pedido?',
                    'Como mudar meu método de pagamento?',
                    'Como entrar em contato com o profissional?',
                    'O serviço não foi realizado, e agora?'
                ].map((q, i) => (
                    <TouchableOpacity key={i} style={styles.faqItem}>
                        <Text style={styles.faqText}>{q}</Text>
                        <Ionicons name="chevron-down" size={20} color="#ccc" />
                    </TouchableOpacity>
                ))}

                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Fale Conosco</Text>

                <TouchableOpacity style={styles.contactItem}>
                    <View style={[styles.iconBox, { backgroundColor: '#E0F2F1' }]}>
                        <MaterialIcons name="chat" size={24} color="#009688" />
                    </View>
                    <View>
                        <Text style={styles.contactTitle}>Chat ao Vivo</Text>
                        <Text style={styles.contactDesc}>Fale com um atendente agora</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem}>
                    <View style={[styles.iconBox, { backgroundColor: '#E3F2FD' }]}>
                        <MaterialIcons name="email" size={24} color="#2196F3" />
                    </View>
                    <View>
                        <Text style={styles.contactTitle}>Enviar E-mail</Text>
                        <Text style={styles.contactDesc}>Resposta em até 24h</Text>
                    </View>
                </TouchableOpacity>

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
    content: {
        padding: 20,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    searchPlaceholder: {
        color: '#999',
        marginLeft: 10,
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    faqItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    faqText: {
        fontSize: 15,
        color: '#333',
        flex: 1,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 15,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    contactDesc: {
        color: '#666',
        fontSize: 14,
    },
});
