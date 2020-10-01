import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import R from 'res/R'



import Loading from 'library/components/Loading'

 export default class TemplateScreen extends Component {
  static navigationOptions = {
     title: 'Screen title here',

   };

  constructor(props) {
    super(props);
    this.state = {
      
      loading: false,
    }
    this.params = this.props.navigation.getParam('params');
    console.log(this.params);
  }

  doSomething = async () => {
   

  }

  render() {
   return (
      
           <View style={styles.container}>
                <ScrollView>
                    <Text>Hello world!</Text>
                </ScrollView>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  
});

