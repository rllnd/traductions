import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Picker} from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import for swap icon
import axios from 'axios';

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
            'x-rapidapi-host':  'google-translator9.p.rapidapi.com',
            'x-rapidapi-key': 'f28b55bb25msh23a503a34fc0f68p11c3b4jsnbc5bb8f6a1c5',
            'content-type': 'application/json',
            'useQueryString': true
          }
        }
      );
   
     
      if (response.data && response.data.data && response.data.data.translations) {
       
        const translatedText = response.data.data.translations[0].translatedText;
        
        setTranslatedText(translatedText);
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
  const swapLanguages = () => {
    const tempSourceLanguage = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempSourceLanguage);
  };
  const playTranslatedText = () => {
    // Implémentez ici la logique pour jouer le texte traduit, par exemple, via une synthèse vocale.
    // Cette fonction sera appelée lorsque l'utilisateur cliquera sur l'icône de haut-parleur.
    console.log('Lecture du texte traduit...');
  };
  const handleTextChange = (text) => {
    setTextToTranslate(text);
    playTranslatedText(text); // Lire le texte saisi
  };
  return (
    <LinearGradient colors={['#b2d7e9','#cb9d72' ]} style={styles.container}>
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
             <TouchableOpacity onPress={playTranslatedText.bind(null, translatedText)} style={styles.speakerIcon}>
              <MaterialCommunityIcons name="volume-high" size={24} color="black" />
            </TouchableOpacity>
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
    fontsize:16,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    padding: 10,
    left:40,
    borderRadius: 10,
    margin: 10,
  },
  speakerIcon: {
    position: 'absolute',
    left:1,
    bottom: -22, 
  },
  picker:{
    width:'100%',
    height:50,
      left:10,
  },
  input: {
    flex: 0,
    height: 80,
    width:300,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    borderWidth: 1,
    lineHeight: 90,
    borderRadius:5
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
    alignItems: 'center', // Center translated text
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
