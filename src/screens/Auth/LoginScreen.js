import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

import R from 'res/R'
import { TextField } from 'react-native-material-textfield';

  import Button from 'apsl-react-native-button'


import Loading from 'library/components/Loading'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import DeviceBackHandler from 'library/components/DeviceBackHandler';
import AuthService from 'services/AuthService';
import AsyncStorage from '@react-native-community/async-storage';


 export default class LoginScreen extends Component {
  static navigationOptions = {
     title: 'Screen title here',

   };

  constructor(props) {
    super(props);
    this.state = {
      
      loading: false,
      email: null,
      password:null,
      errors: {
          emailError: '',
          passwordError: '',
      }
    }
    //this.params = this.props.navigation.getParam('params');
    //console.log(this.params);
  }

  doSomething = async () => {
   

  }

  handleLogin = async () => {
    console.log("logging in...");
    const req = await AuthService.doLogin(this.state.email, this.state.password);
    const res = req.data;
    
    console.log(req);
    await AsyncStorage.setItem('@user', JSON.stringify(res.user));

      this.props.navigation.navigate("HomeScreen");
  }

  handleRegister = async () => {
      this.props.navigation.navigate("RegisterScreen");
  }

  renderForm() {
     
      return (
          <View style={styles.formContainer}>
              <TextField
                  label='Email'
                  error={this.state.errors.emailError}
                  ref={this.emailRef}
                  onChangeText={(email) => {
                      this.setState({ email });
                  }}
                  
                 {...R.pallete.textFieldStyle}
              />

              <TextField
                  label='Password'
                  error={this.state.errors.passwordError}
                  ref={this.passwordRef}
                  secureTextEntry={true}
                  onChangeText={(password) => {
                      this.setState({ password });
                  }}
                 {...R.pallete.textFieldStyle}

              />
              <TouchableOpacity onPress={this.handleRegister} style={{marginTop: 18, marginBottom: 18}}>
                  <Text style={{fontFamily: 'Segoe-UI'}}>Dont have an account ? Register</Text>
              </TouchableOpacity>
              <View>
                  <Button onPress={() => this.handleLogin()}>Login</Button>
              </View>
          </View>
      )
  }

  render() {
   return (
      
           <View style={styles.container}>
        <DeviceBackHandler {...this.props} />

                 <View style={styles.headerContainer}>
                       <Image style={styles.headerLogo} source={R.images.airbnb} />
                   </View>
                <ScrollView>
                 
                <View style={styles.subheadingContainer}>
                    <Text style={R.pallete.formTitle}>CASH-HUB LOGIN</Text>
                </View>


                <View>
                    {this.renderForm()}
                </View>
                </ScrollView>

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    fontFamily: 'Segoe-UI-Italic',
  },
  headerContainer: {
    paddingBottom: 10

  },
  headerLogo: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  
  subheadingContainer: {
      marginTop: 30
  },
  
  formContainer: {
      fontFamily: 'Segoe-UI'
  }
  
});

