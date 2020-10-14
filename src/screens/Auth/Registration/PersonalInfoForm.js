
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
  import Button from 'apsl-react-native-button'

  
  import R from 'res/R'
import { TextField } from 'react-native-material-textfield';

import ISMaterialPicker from 'library/components/ISMaterialPicker';
import AuthService from 'services/AuthService';
import states from 'res/states';
import DatePicker from 'react-native-date-picker'
import Loading from 'library/components/Loading'
import AsyncStorage from '@react-native-community/async-storage';
const moment = require('moment');



export default class PersonalInfoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            otherName: null,
            dateOfBirth:null,
            email:null,
            date:new Date(),
            email: null,
            phoneNumber:null,
            state:null,
            citiesInState: null,
            city:null,
            address:null,
            password:null,
            confirmPassword:null,
            loading: false,
            errors: {
                
            }
        };
    }

    componentDidMount() {
        //auto form filling for fast prototyping
        if (R.constants.DEV) {
            this.setState({
                firstName: 'Joseph',
                lastName: 'Ibrahim',
                otherName: 'Ojimaojo',
                email: 'ibro@gmail.com',
                phoneNumber: '08155668523',
                state: 'Benue',
                city: 'Makurdi',
                dateOfBirth: '1992-11-03',
                address: 'P. 173 FHE, North Bank Makurdi',
                password: '123',
                citiesInState : states[6].locals
            });
            
        }
    }

     async validateForm() {
        const { firstName, lastName, email, phoneNumber, state,city,address, password, dateOfBirth, errors } = this.state;
       await this.setState({errors:{}}); 
        let formValid = true;

        if (!firstName) {
            errors.firstNameError = "Please input your first name";
            formValid = false;
        }
        if (!lastName) {
            console.log("input last name");
            errors.lastNameError = "Please input your last name (surname)";
            formValid = false;
        }
        if (!email) {
            errors.emailError = "Please input your email";
            formValid = false;
        }
        if (!phoneNumber) {
            errors.phoneNumberError = "Please input your phone number";
            formValid = false;
        }
        if (!state) {
            errors.stateError = "Please select your state";
            formValid = false;
        }
        if (!city) {
            errors.cityError = "Please select LGA in your state";
            formValid = false;
        }
        if (!password) {
            errors.passwordError = "Please create a password";
            formValid = false;
        }
        if (!address) {
            errors.addressError = "Please tell us where you live.";
            formValid = false;
        }
        if (!dateOfBirth) {
            errors.dobError = "Please select your date of birth.";
            formValid = false;
        }

        await this.setState({errors});

        return formValid;
    }

    handleContinue = async () => {
        console.log("handle continue pressed");
        const formValid = await this.validateForm();
        console.log(formValid);
        if (!formValid) return;

        const validEmailandPhone = await this.checkEmailAndPhone();

        if (validEmailandPhone) {
            const { firstName, lastName, otherName, email, phoneNumber, dateOfBirth, state, city, password, address } = this.state;
            const user = {
                first_name: firstName,
                last_name: lastName,
                other_name: otherName,
                email: email,
                phone: phoneNumber,
                date_of_birth: dateOfBirth,
                state: state,
                city: city,
                password: password,
                address: address
            }
             await AsyncStorage.setItem('@new_user', JSON.stringify(user));
            this.props.onContinue();
            
        }

    }

    checkEmailAndPhone = async () => {
        this.setState({loading: true});
        let emailAndPhoneValid = true;
        const { email, phoneNumber } = this.state;
        const req = await AuthService.checkEmailAndPhoneNumber(email, phoneNumber);
        const res = req.data;
        console.log(res);

        let errors = {};

        if (typeof res === undefined) {
            errors.networkError = "Network error, please check your connection and try again";
            this.setState({errors, loading: false})
            return;
        }
        else if (res.success == false) {
            errors.checkError = res.msg;
            this.setState({errors});
            emailAndPhoneValid = false;
        }

        this.setState({loading: false});

        return emailAndPhoneValid;

    }

    render() {
        const { lastName, firstName, otherName, email, phoneNumber, dateOfBirth, address, password, errors, date, state, citiesInState, loading } = this.state;

        if (loading) {
            return <Loading text="Verifying personal information, please wait..." />
        }
        return(
            <>
                <ScrollView>
                <Text style={R.pallete.formTitle}>PERSONAL INFORMATION</Text>
                    {errors.checkError && <Text style={R.pallete.errorText}>{errors.checkError}</Text>}
                <TextField
                  label='Last Name (Surname)'
                  error={errors.lastNameError}
                  ref={this.lastNameRef}
                  onChangeText={(lastName) => {
                      this.setState({ lastName });
                  }}
                  value={lastName}
                 {...R.pallete.textFieldStyle}
              />

                <TextField
                  label='First Name'
                  error={errors.firstNameError}
                  ref={this.firstNameRef}
                  keyboardType="default"
                  onChangeText={(firstName) => {
                      this.setState({ firstName });
                  }}
                  value={firstName}
                 {...R.pallete.textFieldStyle}
              />

                <TextField
                  label='Other Name'
                  error={errors.otherNameError}
                  keyboardType="default"
                  ref={this.otherNameRef}
                  onChangeText={(otherName) => {
                      this.setState({ otherName });
                  }}
                  value={otherName}
                 {...R.pallete.textFieldStyle}
              />

            <TextField
                  label='Email'
                  error={errors.emailError}
                  keyboardType="email-address"
                  ref={this.emailRef}
                  onChangeText={(email) => {
                      this.setState({ email });
                  }}
                  value={email}
                 {...R.pallete.textFieldStyle}
              />
              <TextField
                  label='Phone Number'
                  error={errors.phoneNumberError}
                  keyboardType="number-pad"
                  ref={this.phoneNumberRef}
                  onChangeText={(phoneNumber) => {
                      this.setState({ phoneNumber });
                  }}
                  value={phoneNumber}
                 {...R.pallete.textFieldStyle}
              />
               

                  <Text>Date of Birth</Text>
                { errors.dobError && <Text style={{...R.pallete.errorText}}>{errors.dobError}</Text> }
              <DatePicker
                date={date}
                onDateChange={(date_) => {
                    const dateOfBirth = moment(date_).format("YYYY-MM-DD");
                    console.log(dateOfBirth);
                    this.setState({dateOfBirth});
                }}
                mode="date"
                androidVariant="nativeAndroid"
                />



                  <Text style={R.pallete.formSubTitle}>Contact Details</Text>

                  <ISMaterialPicker 
                items={states} 
                label="State"
                errorText={errors.stateError}
                onValueChange={async (state, index) => {
                  if (index === 0) return this.setState({state: null});
                 const citiesInState = states[index - 1].locals;
                 await this.setState({state, citiesInState});

                }}
                />

        {state &&  <ISMaterialPicker
              items={citiesInState}
              label="city"
              selectedItem={null}
              errorText={errors.cityError}
              onValueChange={async (city, index) => {
                if (index === 0) return this.setState({ city: null });

                await this.setState({ city })


              }}
            /> }

            <TextField
                  label='Full Residential Address'
                  error={errors.addressError}
                  keyboardType="default"
                  ref={this.addressRef}
                  multiline={true}
                  onChangeText={(address) => {
                      this.setState({ address });
                  }}
                  value={address}
                 {...R.pallete.textFieldStyle}
              />

              <Text style={R.pallete.formSubTitle}>Account Security</Text>
              <Text>Create a password to secure your account.</Text>
              <TextField
                  label='Password'
                  error={errors.passwordError}
                  keyboardType="visible-password"

                  ref={this.passwordRef}
                  onChangeText={(password) => {
                      this.setState({ password });
                  }}
                  value={password}
                 {...R.pallete.textFieldStyle}
              />
              </ScrollView>
              <Button onPress={() => this.handleContinue()} style={{borderWidth: 0, backgroundColor: 'green'}} textStyle={{ color: 'white'}}>Continue</Button>

            </>
        )
    }
}