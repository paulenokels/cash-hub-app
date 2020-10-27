import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import R from 'res/R'

export default class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };


   



  }

   componentDidMount() {

    setTimeout(async () => {
      const user = await AsyncStorage.getItem("@user");
      const intro = await AsyncStorage.getItem('@introShown');
      if (!intro) {
        this.props.navigation.navigate('Intro');
      }
      else if (user === null) {
         this.props.navigation.navigate("LoginScreen");
      }
      else this.props.navigation.navigate("HomeScreen");

    }, 1000);
   
    
  }

  
  


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appText} >cash-HUB</Text>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.appPrimary,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  },

  appText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',

  },



});


