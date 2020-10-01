import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from 'library/components/Loading'
import Icon from 'react-native-vector-icons/FontAwesome5';


import R from 'res/R'


class TemplateScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: false
    };



  }

  componentDidMount() {

  }


  render() {
    return (
      <View style={styles.container}>
      
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
 



})






export default TemplateScreen;




