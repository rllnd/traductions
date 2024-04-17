import { StyleSheet, StatusBar, Platform, ImageBackground } from 'react-native';

const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#cb9d72',
    ImageBackground:'./assets/inter.jpeg',
  },
  iconContainer: {
    position: 'absolute', // Make the icon container absolute
    top: 15, // Position it 20px from the top
    left: 25, // Position it 20px from the left
  },
  button0: {
    borderRadius: 50,
    backgroundColor: 'grey',
    position: 'relative',
    width: 200,
    paddingTop:5,
    paddingBottom:5,
    top: 500,
    borderWidth:2,
    borderColor:'white',
    textAlign: 'center',
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.5, // Opacité de l'ombre
    shadowRadius: 3, // Rayon de l'ombre
    elevation: 7, // Elevation sur Android
  },
  button1: {
    borderRadius: 50,
    backgroundColor: '#2A0431',
    position: 'relative',
    width: 300,
    paddingTop:5,
    paddingBottom:5,
    top: 150,
    borderWidth:2,
    borderColor:'white',
    textAlign: 'center',
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.5, // Opacité de l'ombre
    shadowRadius: 3, // Rayon de l'ombre
    elevation: 7, // Elevation sur Android
  },
  button2: {
    borderRadius: 50,
    backgroundColor: '#2A0431',
    position: 'relative',
    width: 300,
    paddingTop:5,
    paddingBottom:5,
    top: 160,
    borderWidth:2,
    borderColor:'white',
    textAlign: 'center',
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.5, // Opacité de l'ombre
    shadowRadius: 3, // Rayon de l'ombre
    elevation: 7, // Elevation sur Android
  },
  buttons: {
    borderRadius: 50,
    backgroundColor: '#000',
    position: 'relative',
    height: 70,
    width: 400,
    top: 250,
    padding: 25,
    textAlign: 'center',
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.5, // Opacité de l'ombre
    shadowRadius: 3, // Rayon de l'ombre
    elevation: 7, // Elevation sur Android

  },
  
  fullScreen: {
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cb9d72',
    borderRadius:1,
    
  },
  icon :{
    right:160,
    top:-288,
    flex:-5,
    backgroundcolor:'black',

  },
  transparentStatusBar: {
    ...Platform.select({
      android: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: StatusBar.currentHeight,
        backgroundColor: '#fff',

      },
      backgroundImage:{
          
      },
      ios: {
        backgroundColor: 'transparent',
      },
    }),
  },
});
export { s };


