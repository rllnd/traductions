import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SavedTranslations = () => {
    const [translations, setTranslations] = useState([]);

    const fetchTranslations = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@translations');
            const savedTranslations = jsonValue ? JSON.parse(jsonValue) : [];
            setTranslations(savedTranslations);
        } catch (error) {
            console.error('Erreur lors de la récupération des traductions:', error);
        }
    };

    const deleteTranslation = async (index) => {
        try {
            const updatedTranslations = translations.filter((_, idx) => idx !== index);
            await AsyncStorage.setItem('@translations', JSON.stringify(updatedTranslations));
            setTranslations(updatedTranslations);
            console.log('Traduction supprimée avec succès');
        } catch (error) {
            console.error('Erreur lors de la suppression de la traduction:', error);
        }
    };

    useEffect(() => {
        fetchTranslations();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Traductions enregistrées</Text>
            <FlatList
                data={translations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.translationItem}>
                        <Text style={styles.translationText}>{item.original}</Text>
                        <Text style={styles.translationText}>{item.translated}</Text>
                        <Text style={styles.translationDate}>{item.date}</Text>
                        <TouchableOpacity onPress={() => deleteTranslation(index)}>
                            <MaterialCommunityIcons name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    translationItem: {
        marginBottom: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    translationText: {
        fontSize: 16,
        marginBottom: 4,
    },
    translationDate: {
        fontSize: 12,
        color: '#888',
    },
});

export default SavedTranslations;
