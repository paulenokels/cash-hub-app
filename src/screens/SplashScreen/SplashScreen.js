import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class SplashScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };



  }

   componentDidMount() {

    setTimeout(async () => {
      const user = await AsyncStorage.getItem("@user");
      if (user === null) {
         this.props.navigation.navigate("LoginScreen");
      }
      else this.props.navigation.navigate("HomeScreen");

    }, 1000);
   
    
  }

  


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appText} >Cash HUB</Text>

      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  },

  appText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',

  },



});


