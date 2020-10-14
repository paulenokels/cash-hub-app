import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import R from 'res/R'
import { TextField } from 'react-native-material-textfield';


import Icon from 'react-native-vector-icons/FontAwesome5';


import Loading from 'library/components/Loading'
import SupportService from 'services/SupportService';
import { RNToasty } from 'react-native-toasty'


export default class ContactSupportScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {

      loading: false,
      email: '',
      phoneNumber: '',
      message: '',
      errors: {
        email: '',
        phoneNumber: '',
        message: '',
      }
    }

  }

  submit = async () => {
    const { message } = this.state;

    const formValid = this.validateForm();

    if (formValid) {
      this.setState({ loading: true });
      const req = await SupportService.sendMessage(message);
      const res = req.data;

      //console.log(req);
      if (typeof res == 'undefined') {
        RNToasty.Error({ title: `Network Error. Check your internet connection and try again`, duration: RNToasty.Duration.Long });

      }
      else if (res.success) {
        RNToasty.Success({ title: `Message sent successfully`, duration: RNToasty.Duration.Long });
        this.props.navigation.goBack(null);

      }

      this.setState({ loading: false });

    }

  }

  validateForm = () => {
    let formValid = true;
    this.setState({ errors: {} });
    const {
     
      message
    } = this.state;

    let errors = {};
  
    if (message == '') {
      errors.message = 'Please enter a message';
      formValid = false;
    }

    this.setState({ errors });


    return formValid;

  }

  render() {
    const { loading, message, errors } = this.state;

    if (loading) {
      return (
        <Loading text="submitting your message..." />
      )
    }
    return (

      <View style={styles.container}>
        <ScrollView style={{ padding: 10 }}>


          <TextField
            label={"Your Message"}
            error={errors.message}
            ref={this.inputRef}
            onChangeText={(message) => {
              this.setState({ message });
            }}
            value={message}
            multiline={true}
            keyboardType={"default"}
            {...R.pallete.textFieldStyle}
          />
        </ScrollView>

        <View style={styles.footerButtons}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.submit()}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: "space-around",
    padding: 20,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  }
});

