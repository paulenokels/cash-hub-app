import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';



import { RNToasty } from 'react-native-toasty'

import Loading from 'library/components/Loading'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextField, OutlinedTextField } from 'react-native-material-textfield';
import AuthService from 'services/AuthService';

import { validateEmail } from 'library/utils/StringUtils'
import R from 'res/R'


class ForgotPasswordScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        loadingTxt:'',
        errors:{},
        email:null,
        password:null,
        showConfCode: false,
        confCode:null,
        realConfCode:null,
    };



  }

  componentDidMount() {
    // if (R.constants.DEV) {
    //   // this.setState({
    //   //   email: 'achemepaulenokela@gmail.com',
    //   //   password: '1234',
    //   // });
    // }
  }

  sendPasswordResetCode = async() => {
    const { email,password } = this.state;
    await this.setState({errors:{}});

    if (!email || !validateEmail(email)) {
      const errors = {
        emailError: 'Please input a valid email',
      }
      await this.setState({errors});
      return;
    }

    if (!password) {
      const errors = {
        passwordError: 'Please enter a new password',
      }
      await this.setState({errors});
      return;
    }
    
   


   await this.setState({loading:true, loadingTxt: 'Sending password reset code...'})
    const req = await AuthService.sendPasswordResetCode(email);

    const res = req.data;
    console.log(res);
    await this.setState({loading:false});
    if (res.success) {
     await this.setState({showConfCode: true, realConfCode: res.code});
    }
    else {
      RNToasty.Error({title: `Error - , ${res.msg}.`})
    }
    
  }

  resetPassword = async() => {
    const { email, password, confCode, realConfCode } = this.state;

    //we are only validating confirmation code because we have already validated email and password
    //in sendPasswordResetCode();
    if (!confCode) {
      const errors = {
        confCodeError: 'Please input the 4-digit confirmation code sent to your email and phone number',
      }
     await this.setState({errors});
      return;
    }

    if (confCode != realConfCode) {
      const errors = {
        confCodeError: 'Incorrect confirmation code inputed.',
      }
     await this.setState({errors});
      return;
    }

    await this.setState({loading: true, loadingTxt: 'Resetting your password, please wait'});
    const req = await AuthService.resetPassword(email, password, confCode);
    const res = req.data;
    console.log(res);
    await this.setState({loading:false});
    if (res.success) {
      Alert.alert(
        'Success',
        'Your password reset is successful. Log in with your new password in the login screen',
        [
          { text: 'OK', onPress: async () => {
            this.props.navigation.navigate("LoginScreen");
          } }
        ],
        { cancelable: false }
      );
    }

    else {
      RNToasty.Error({ title: `Error resetting password ${res.msg}` });
    }

  }


  render() {
    const { email, password, errors, loading, loadingTxt, showConfCode, confCode } = this.state;

    if (loading) {
      return <Loading text={loadingTxt} />
    }

    if (showConfCode) {
      return (
      <View style={styles.container}>
        <Text style={{marginBottom: 15}}>Input the confirmation code sent to your email and phone number</Text>
        <OutlinedTextField
                  label='Enter Confirmation Code'
                  keyboardType="number-pad"
                  error={errors.confCodeError}
                  ref={this.confCodeRef}
                  onChangeText={(confCode) => {
                      this.setState({ confCode });
                  }}
                  value={confCode}
                 {...R.pallete.textFieldStyle}
              />
    <TouchableOpacity style={[R.pallete.proceedBtn, {alignSelf:'flex-end', width:150}]} onPress={() => this.resetPassword()}>
        <Text style={R.pallete.proceedBtnText}>Reset Password</Text>
    </TouchableOpacity>
      </View>
      )
    }
    else return (
      <View style={styles.container}>
      <Text>Input your email and enter a new password. You will receive a confirmation code to reset your password</Text>
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
                  label='New Password'
                  error={errors.passwordError}
                  ref={this.passwordRef}
                  onChangeText={(password) => {
                      this.setState({ password });
                  }}
                  value={password}
                 {...R.pallete.textFieldStyle}
              />
  <TouchableOpacity style={[R.pallete.proceedBtn, {alignSelf:'flex-end', width:100}]} onPress={() => this.sendPasswordResetCode()}>
            <Text style={R.pallete.proceedBtnText}>Continue</Text>
    </TouchableOpacity>


      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,

  },
 



})






export default ForgotPasswordScreen;




