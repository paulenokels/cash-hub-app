import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';

import R from 'res/R'
import { TextField } from 'react-native-material-textfield';



import Loading from 'library/components/Loading'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AuthService from 'services/AuthService';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from 'react-native';



 export default class LoginScreen extends Component {
  static navigationOptions = {
     title: 'Screen title here',

   };

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      
      loading: false,
      email: null,
      password:null,
      errors: {},
    }
    //this.params = this.props.navigation.getParam('params');
    //console.log(this.params);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  if (this.props.navigation.isFocused()) {
    BackHandler.exitApp();
  }
 
}
  handleLogin = async () => {
    console.log("logging in...");
    if (!this.validateForm()) return;
    this.setState({loading:true});
    const req = await AuthService.doLogin(this.state.email, this.state.password);
    const res = req.data;
    
    console.log(res);
    if (res.success) {

      console.log("Logged in successfully");
      await AsyncStorage.setItem('@user', JSON.stringify(res.user));

      this.props.navigation.navigate("HomeScreen");

      
    }
    else {
      const errors = {
        invalidDetails : res.msg
      }
      this.setState({errors});

    }
    this.setState({loading: false});

  }

  validateForm = () => {
    let formValid = true;
    const { email, password } = this.state;
    let errors= {};
    this.setState({errors});
    if(!email) {
      formValid = false;
      errors.emailError = "Please input a valid email";

    }
    if (!password) {
      formValid = false;
      errors.passwordError = "Please enter your cash-HUB password";
    }

    this.setState({errors});

    return formValid;
  }


  handleRegister = async () => {
      this.props.navigation.navigate("RegisterScreen");
  }

  renderForm() {
    const { email, password, errors } = this.state;
     
      return (
          <View style={styles.formContainer}>
              <TextField
                  label='Email'
                  error={errors.emailError}
                  ref={this.emailRef}
                  onChangeText={(email) => {
                      this.setState({ email });
                  }}
                  value={email}
                 {...R.pallete.textFieldStyle}
              />

              <TextField
                  label='Password'
                  error={errors.passwordError}
                  ref={this.passwordRef}
                  secureTextEntry={true}
                  onChangeText={(password) => {
                      this.setState({ password });
                  }}
                  value={password}
                 {...R.pallete.textFieldStyle}

              />
               <TouchableOpacity style={R.pallete.proceedBtn} onPress={() => this.handleLogin()}>
                  <Text style={R.pallete.proceedBtnText}>Log in</Text>
              </TouchableOpacity>
              <View style={{flexDirection:"row", justifyContent:"space-around", marginTop: 18, marginBottom: 18}}>
                <TouchableOpacity onPress={this.handleRegister}>
                    <Text style={{fontFamily: 'Segoe-UI'}}>Register</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={{fontFamily: 'Segoe-UI'}}> Forgot Password </Text>
                </TouchableOpacity>
              </View>
             
          </View>
      )
  }

  render() {
    const { loading,errors } = this.state;
    if (loading) {
      return  <Loading text="Loggin you in..." />
    }
   return (
      
           <View style={styles.container}>
       

                 <View style={styles.headerContainer}>
                       <Image style={styles.headerLogo} source={R.images.logo_sm} />
                   </View>
                <ScrollView>
                 
                <View style={styles.subheadingContainer}>
                    <Text style={R.pallete.formTitle}>CASH-HUB LOGIN</Text>

                {errors.invalidDetails && <Text style={R.pallete.errorText}>{errors.invalidDetails}</Text>}
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
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
  
  subheadingContainer: {
      marginTop: 30
  },
  
  formContainer: {
      fontFamily: 'Segoe-UI'
  }
  
});

