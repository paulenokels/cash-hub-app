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




export default class CustomDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {

            loading: false,
            user: null,
        }

     
         
        

    }

    componentDidMount() {
      //UserService.getUser().then(user => this.setState({user}));

    }

    

     render() {
       return (
       <View style={[styles.containHeader, { backgroundColor: R.colors.appPrimary, marginTop: -5, paddingTop: 10, paddingBottom: 10 }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={R.images.avatar} style={[R.pallete.avatar, { width: 100, height: 100 }]} />
          <Text style={{ color: '#fff', marginTop: '3%', fontFamily: 'Segoe-UI' }}>{`Hi Paul`}</Text>
          <Text style={{ color: '#fff', fontFamily: 'Segoe-UI' }}>{`achemepaulenokela@gmail.com`}</Text>
        </View>
      </View>
       )
    }
}

const styles = StyleSheet.create({
    containHeader: {

    }
});

