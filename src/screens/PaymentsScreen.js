import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

export default function PaymentsScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pagamentos</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Métodos Salvos</Text>

                <View style={styles.card}>
                    <View style={styles.cardInfo}>
                        <FontAwesome name="cc-visa" size={24} color="#1A1F71" style={{ marginRight: 15 }} />
                        <View>
                            <Text style={styles.cardName}>Visa termina em 4242</Text>
                            <Text style={styles.cardExpiry}>Expira 12/25</Text>
                        </View>
                    </View>
                    <Ionicons name="check-checkmark-circle" size={24} color="#7F57F1" />
                </View>

                <View style={styles.card}>
                    <View style={styles.cardInfo}>
                        <FontAwesome name="cc-mastercard" size={24} color="#EB001B" style={{ marginRight: 15 }} />
                        <View>
                            <Text style={styles.cardName}>Mastercard termina em 8888</Text>
                            <Text style={styles.cardExpiry}>Expira 09/24</Text>
                        </View>
                    </View>
                    <Ionicons name="ellipse-outline" size={24} color="#ccc" />
                </View>

                <TouchableOpacity style={styles.addButton}>
                    <Ionicons name="add" size={24} color="#7F57F1" />
                    <Text style={styles.addButtonText}>Adicionar novo cartão</Text>
                </TouchableOpacity>

                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Histórico de Transações</Text>

                {[1, 2, 3].map((i) => (
                    <View key={i} style={styles.transactionItem}>
                        <View style={styles.transactionLeft}>
                            <View style={styles.iconBox}>
                                <Ionicons name="home" size={20} color="#7F57F1" />
                            </View>
                            <View>
                                <Text style={styles.transactionTitle}>Limpeza Residencial</Text>
                                <Text style={styles.transactionDate}>15 Mai, 14:00</Text>
                            </View>
                        </View>
                        <Text style={styles.transactionAmount}>- 5.000 Kz</Text>
                    </View>
                ))}

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
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 10,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardName: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    cardExpiry: {
        fontSize: 12,
        color: '#999',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#7F57F1',
        borderRadius: 12,
        borderStyle: 'dashed',
        marginTop: 10,
    },
    addButtonText: {
        color: '#7F57F1',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0EFFC',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    transactionTitle: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    transactionDate: {
        fontSize: 12,
        color: '#999',
    },
    transactionAmount: {
        fontWeight: 'bold',
        color: '#333',
    },
});
