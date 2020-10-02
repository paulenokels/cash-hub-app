import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';

import R from 'res/R'
//import UserService from 'services/UserService'


import AsyncStorage from '@react-native-community/async-storage'


export default class CustomDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {

            loading: false,
            user: null,
        }

     
         
        

    }

    componentDidMount() {
     this.getUser();

    }

    getUser = async() => {
      let user = await AsyncStorage.getItem('@user');
      user = JSON.parse(user);
      this.setState({user});
    }
    

     render() {
       const { user } = this.state;

      if (user) return (
       <View style={[styles.containHeader, { backgroundColor: R.colors.appPrimary, marginTop: -5, paddingTop: 10, paddingBottom: 10 }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{uri:R.constants.FILE_SERVER+user.photo}} style={[R.pallete.avatar, { width: 85, height: 85 }]} />
          <Text style={{ color: '#fff', marginTop: '3%', fontFamily: 'Segoe-UI' }}>{`Hi ${user.first_name}`}</Text>
          <Text style={{ color: '#fff', fontFamily: 'Segoe-UI' }}>{user.email}</Text>
        </View>
      </View>
       )

       return null;
    }
}

const styles = StyleSheet.create({
    containHeader: {

    }
});

