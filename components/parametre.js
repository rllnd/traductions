import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Picker } from 'react-native';

const Settings = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const handleDarkModeChange = () => {
        setIsDarkMode((prevMode) => !prevMode);

    };
    const handleNotificationsChange = () => {
        setNotificationsEnabled((prevStatus) => !prevStatus);
    };
    const [dataUsage, setDataUsage] = useState('wifi');
    const [interfaceLanguage, setInterfaceLanguage] = useState('en');
    const [isHistoryEnabled, setIsHistoryEnabled] = useState(true);
    return (
        <View style={styles.container}>


            <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Mode sombre</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={handleDarkModeChange}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={handleNotificationsChange}
                />
            </View>
            <View style={styles.settingItem}>
                <Text style={styles.label}>Utilisation des données</Text>
                <Picker
                    selectedValue={dataUsage}
                    onValueChange={(value) => setDataUsage(value)}
                >
                    <Picker.Item label="Wi-Fi uniquement" value="wifi" />
                    <Picker.Item label="Données mobiles" value="mobile" />
                </Picker>
            </View>
            <View style={styles.settingItem}>
                <Text style={styles.label}>Langue de l'interface utilisateur</Text>
                <Picker
                    selectedValue={interfaceLanguage}
                    onValueChange={(value) => setInterfaceLanguage(value)}
                >
                    <Picker.Item label="Anglais" value="en" />
                    <Picker.Item label="Français" value="fr" />
                </Picker>
            </View>
            <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>Historique des traductions</Text>
                <Switch
                    value={isHistoryEnabled}
                    onValueChange={(value) => setIsHistoryEnabled(value)}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#cb9d72'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    settingLabel: {
        fontSize: 16,
        color: '#fff',
    },
    label: {
        fontSize: 16,
        color: '#fff',
        textDecorationStyle: 'double',

    }
});
export default Settings;
