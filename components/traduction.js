import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'Anglais' },
  { code: 'es', label: 'Espagnol' },
  { code: 'de', label: 'Allemand' },
  { code: 'it', label: 'Italien' },
  { code: 'pt', label: 'Portugais' },
  { code: 'ru', label: 'Russe' },
  { code: 'zh', label: 'Chinois' },
  { code: 'ar', label: 'Arabe' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ja', label: 'Japonais' },
  { code: 'ko', label: 'Coréen' },
  { code: 'tr', label: 'Turc' },
  { code: 'nl', label: 'Néerlandais' },
  { code: 'sv', label: 'Suédois' },
  { code: 'pl', label: 'Polonais' },
  { code: 'th', label: 'Thaï' },
  { code: 'mg', label: 'Malagasy' }

];

const App = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto');
  const [targetLanguage, setTargetLanguage] = useState('en');

  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://google-translator9.p.rapidapi.com/v2',
        {
          q: textToTranslate,
          source: sourceLanguage,
          target: targetLanguage,
          format: 'text',
        },
        {
          headers: {
            'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
            'x-rapidapi-key': '7c23b346ddmsh76506c00eddc42fp138275jsn32db6224dcbe',
            'content-type': 'application/json',
            'useQueryString': true
          },
          timeout: 50000
        }
      );


      if (response.data && response.data.data && response.data.data.translations) {

        const translatedText = response.data.data.translations[0].translatedText;

        setTranslatedText(translatedText);
        saveTranslation(textToTranslate, translatedText);
      } else {

        setTranslatedText('Traduction introuvable');
      }
    } catch (error) {
      console.error('Erreur lors de la traduction du texte :', error);
      setTranslatedText('Erreur de traduction');
    }
  };
  const clearText = () => {

    setTextToTranslate('');
  };
  const playText = (text, language) => {
    Speech.speak(text, {
      language: language,
    });
  };


  const swapLanguages = () => {
    const tempSourceLanguage = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempSourceLanguage);
  };

  const playTranslatedText = () => {
    playText(translatedText, targetLanguage);
    console.log('Lecture du texte traduit...');
  };
  const handleTextChange = (text) => {
    setTextToTranslate(text);
    playTranslatedText(text); 
  };
  const saveTranslation = async (originalText, translatedText) => {
    try {
      
      const jsonValue = await AsyncStorage.getItem('@translations');
      const existingTranslations = jsonValue ? JSON.parse(jsonValue) : [];

      const newTranslation = {
        original: originalText,
        translated: translatedText,
        date: new Date().toLocaleString(), 
      };
      existingTranslations.push(newTranslation);

      await AsyncStorage.setItem('@translations', JSON.stringify(existingTranslations));
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la traduction :', error);
    }
  };
  const deleteSpecificTranslation = async (identifier) => {
    try {
     
      const jsonValue = await AsyncStorage.getItem('@translations');
      const existingTranslations = jsonValue ? JSON.parse(jsonValue) : [];

    
      const updatedTranslations = existingTranslations.filter(
        (translation) => translation.id !== identifier
      );

     
      await AsyncStorage.setItem('@translations', JSON.stringify(updatedTranslations));
      console.log('Traduction supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de la traduction :', error);
    }
  };

  return (
    <LinearGradient colors={['#b2d7e9', '#cb9d72']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.body}>
          <View style={styles.inputContainer}>
            <Picker
              selectedValue={sourceLanguage}
              style={styles.picker}
              onValueChange={setSourceLanguage}
            >

              <Picker.Item label="Auto" value="auto" />

              {languages.map((language) => (
                <Picker.Item key={language.code} label={language.label} value={language.code} />
              ))}

            </Picker>

          </View>
          <View>
            <TextInput

              style={styles.input}
              onChangeText={setTextToTranslate}
              value={textToTranslate}
              placeholder="  Entrez votre texte..."

            />
            
            <TouchableOpacity onPress={clearText} style={styles.clearIcon}>
              <MaterialCommunityIcons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity onPress={translateText}>
              <MaterialCommunityIcons name="translate" size={32} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={swapLanguages}>
              <MaterialCommunityIcons name="swap-horizontal" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Picker
            selectedValue={targetLanguage}
            style={styles.picker}
            onValueChange={setTargetLanguage}
          >
            {languages.map((language) => (
              <Picker.Item key={language.code} label={language.label} value={language.code} />
            ))}
          </Picker>
        </View>
        <View>
          <TextInput style={styles.input} value={translatedText} editable={false} />
          <TouchableOpacity onPress={playTranslatedText.bind(null, translatedText)} style={styles.speakerIcon}>
              <MaterialCommunityIcons name="volume-high" size={28} color="black" />
            </TouchableOpacity>
        </View>
       
      </View>
     
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    fontsize: 16,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    padding: 10,
    left: 40,
    borderRadius: 10,
    margin: 10,
  },
  speakerIcon: {
    position: 'absolute',
    left: 1,
    bottom: -22,
  },
  picker: {
    width: '100%',
    height: 50,
    left: 10,
  },
  input: {
    flex: 0,
    height: 80,
    width: 300,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    lineHeight: 90,
    borderRadius: 5
  },
  translatedText: {
    fontSize: 20,
    margin: 15,
  },
  clearIcon: {
    position: 'absolute',
    right: 20,
    top: 45,
  },
  translatedTextContainer: {
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
