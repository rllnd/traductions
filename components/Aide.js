import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const Aides = () => {
    const faqs = [
        {
            question: 'Comment traduire un texte ?',
            answer: 'Pour traduire un texte, accédez à la section Traduction de l\'application.',
        },
        {
            question: 'Comment enregistrer une traduction ?',
            answer: "Il suffit d'entrer dans la sauvegarde de traduction puisque la sauvegarde est automatique, vous voyez aussi la date de la traduction",
        },
       
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Aides</Text>

            {/* Afficher les FAQs */}
            {faqs.map((faq, index) => (
                <View key={index} style={styles.faqItem}>
                    <Text style={styles.question}>{faq.question}</Text>
                    <Text style={styles.answer}>{faq.answer}</Text>
                </View>
            ))}

            <TouchableOpacity style={styles.contactButton} onPress={() => console.log('Contact support')}>
                <Text style={styles.contactButtonText}>Contacter le support</Text>
            </TouchableOpacity>
        </ScrollView>
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
    faqItem: {
        marginBottom: 12,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    answer: {
        fontSize: 14,
    },
    contactButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    contactButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Aides;
