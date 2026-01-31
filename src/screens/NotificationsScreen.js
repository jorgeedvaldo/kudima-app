import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Switch, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }) {
    const [isEnabled, setIsEnabled] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notificações</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>Comum</Text>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Notificações gerais</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#7F57F1" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        onValueChange={() => setIsEnabled(!isEnabled)}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Sons</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#7F57F1" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        value={true}
                    />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Vibração</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#7F57F1" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        value={false}
                    />
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Atualizações do Sistema</Text>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Atualizações do App</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#7F57F1" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        value={true}
                    />
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Novos Serviços</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#7F57F1" }}
                        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                        value={true}
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
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#999',
        marginBottom: 15,
        textTransform: 'uppercase',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    settingLabel: {
        fontSize: 16,
        color: '#333',
    },
});
