import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar,Image, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { s } from './style';
import { t } from './text';
import Traduction from './components/traduction';



const CustomDrawerContent = (props) => {
    // État pour le mode sombre ou clair
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Fonction de gestion du changement de thème
   const handleThemeChange = () => {
    // Inverse l'état actuel de isDarkMode
    setIsDarkMode((prevMode) => !prevMode);

    // Appliquez les styles de thème appropriés à votre application
    if (isDarkMode) {
        // Mode sombre activé
        // Changez les couleurs de l'interface pour le mode sombre (par exemple, arrière-plan noir, texte blanc)
        applyDarkTheme();
    } else {
        // Mode sombre désactivé
        // Changez les couleurs de l'interface pour le mode normal (par exemple, arrière-plan blanc, texte noir)
        applyLightTheme();
    }
};

const applyDarkTheme = () => {
    
    setThemeColors({
        backgroundColor: 'black',
        textColor: 'white',
     
    });
};

const applyLightTheme = () => {

    setThemeColors({
        backgroundColor: 'white',
        textColor: 'black',
       
    });
};

    return (
        <DrawerContentScrollView {...props}>
           
             <DrawerItem
                label="Traduction"
                onPress={() => props.navigation.navigate('Traduction')}
                 labelStyle={{
                fontWeight: 'bold', // Met le texte en gras
                fontSize: 18,
                color: '#000', 
                 }}
            />
            <DrawerItem
                label="Accueil"
                icon={() => <Icon name="home" size={24} />}
                onPress={() => props.navigation.navigate('Home')}
                 labelStyle={{
                fontWeight: 'bold', // Met le texte en gras
                fontSize: 14, // Augmente la taille de la police
                color: '#000', // Couleur du texte
                 }}
            />
          <DrawerItem
                label="Traductions enregistrées"
                icon={() => <Icon name="book" size={24} />}
                onPress={() => props.navigation.navigate('enregistrees')}
                 labelStyle={{
                fontWeight: 'bold', // Met le texte en gras
                fontSize: 12, // Augmente la taille de la police
                color: '#000', // Couleur du texte
                 }}
            />

           

            
            <DrawerItem
                label="Paramètres"
                icon={() => <Icon name="cog" size={24} />}
                onPress={() => props.navigation.navigate('Settings')}
                 labelStyle={{
                fontWeight: 'bold', // Met le texte en gras
                fontSize: 14, // Augmente la taille de la police
                color: '#000', // Couleur du texte
                 }}
            />
           
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <Icon name="adjust" size={24} style={{ marginRight: 8 }} />
                <Text style={{ marginRight: 30,marginLeft:30,fontWeight: 'bold',fontSize:14}}>Mode</Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={handleThemeChange}
                />
            </View>
             <DrawerItem
                label="Aides et commentaires"
                icon={() => <Icon name="help" size={24} color="#000" />}
                onPress={() => props.navigation.navigate('Aides')}
                 labelStyle={{
                fontWeight: 'bold', // Met le texte en gras
                fontSize: 14, // Augmente la taille de la police
                color: '#000', // Couleur du texte
                 }}
            />
        </DrawerContentScrollView>
    );
};

const App = ({ navigation }) => {
    return (
        <ScrollView style={s.container}>
            <View style={s.fullScreen}>
                <Text style={t.texto}>Traduction instantanée</Text>

                <Image source={require('./assets/inter.jpeg')} style={t.b} />
                <TouchableOpacity style={s.button0} onPress={() => navigation.navigate('Traduction')}>
                    <Text style={t.buttonText}>Commencer</Text>
                </TouchableOpacity>
            </View>
            <StatusBar hidden={false} />
        </ScrollView>
    );
};

const Drawer = createDrawerNavigator();

const MainApp = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContent={CustomDrawerContent}>
                <Drawer.Screen name="Home" component={App} />
                <Drawer.Screen name="Traduction" component={Traduction} />
              
                {/* Ajoutez d'autres écrans ici si nécessaire */}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MainApp;
