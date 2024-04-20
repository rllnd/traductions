import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar,Image, Switch} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { s } from './style';
import { t } from './text';
import Traduction from './components/traduction';
import SavedTranslations from './components/enregistrees';
import help from './components/Aide';
import Settings from './components/parametre';

const CustomDrawerContent = (props) => {
        const [isDarkMode, setIsDarkMode] = useState(false);
        const handleThemeChange = () => {
         setIsDarkMode((prevMode) => !prevMode);
        if (isDarkMode) {
              applyDarkTheme();
        } else {
              applyLightTheme();
              }
}   ;

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
                fontWeight: 'bold', 
                fontSize: 18,
                color: '#000', 
                 }}
            />
            <DrawerItem
                label="Accueil"
                icon={() => <Icon name="home" size={24} />}
                onPress={() => props.navigation.navigate('Home')}
                 labelStyle={{
                fontWeight: 'bold', 
                fontSize: 14, 
                color: '#000',
                 }}
            />
          <DrawerItem
                label="Traductions enregistrées"
                icon={() => <Icon name="book" size={24} />}
                onPress={() => props.navigation.navigate('SavedTranslations')}
                 labelStyle={{
                fontWeight: 'bold',
                fontSize: 12,
                color: '#000',
                 }}
            />
            <DrawerItem
                label="Paramètres"
                icon={() => <Icon name="cog" size={24} />}
                onPress={() => props.navigation.navigate('Settings')}
                 labelStyle={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#000', 
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
                icon={() => <Icon name="question-circle" size={24} color="#000" />}
                onPress={() => props.navigation.navigate('help')}
                 labelStyle={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#000', 
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
                <Drawer.Screen name="SavedTranslations" component={SavedTranslations} />
                <Drawer.Screen name="help" component={help} />
                <Drawer.Screen name="Settings" component={Settings} />
               
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MainApp;
