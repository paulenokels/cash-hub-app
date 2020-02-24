
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

import states from 'res/states';


export default class PersonalInfoForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            lastName: null,
            otherName: null,
            age:null,
            day:null,
            email: null,
            state:null,
            address:null,
            password:null,
            confirmPassword:null,
            errors: {
                
            }
        };
    }

    async componentDidMount() {

    }

    handleContinue = () => {
        console.log("handle continue pressed");
        this.props.onContinue();
    }

    render() {
        const { errors } = this.state;
        return(
            <>
                <ScrollView>
                <Text style={R.pallete.formTitle}>PERSONAL INFORMATION</Text>
                <TextField
                  label='Last Name (Surname)'
                  error={errors.emailError}
                  ref={this.lastNameRef}
                  onChangeText={(lastName) => {
                      this.setState({ lastName });
                  }}
                  
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
                  
                 {...R.pallete.textFieldStyle}
              />

                <TextField
                  label='Age'
                  error={errors.ageError}
                  keyboardType="numeric"
                  ref={this.ageRef}
                  onChangeText={(age) => {
                      this.setState({ age });
                  }}
                  
                 {...R.pallete.textFieldStyle}
              />

                  <Text>Date of Birth</Text>
              <View style={{flexDirection:'row'}}>
              <TextField
                  label='Day'
                  error={errors.dayError}
                  keyboardType="numeric"
                  ref={this.dayRef}
                  onChangeText={(day) => {
                      this.setState({ day });
                  }}
                 {...R.pallete.textFieldStyle}
                 containerStyle={{flexDirection: 'row'}}
              />

                <TextField
                  label='Day'
                  error={errors.dayError}
                  keyboardType="numeric"
                  ref={this.dayRef}
                  onChangeText={(day) => {
                      this.setState({ day });
                  }}
                 {...R.pallete.textFieldStyle}
                 containerStyle={{flexDirection: 'row'}}

              />

              </View>


                  <Text style={R.pallete.formSubTitle}>CONTACT DETAILS</Text>

                  <ISMaterialPicker 
                items={states} 
                label="State"
                errorText={errors.stateError}
                onValueChange={async (state, index) => {
                  if (index === 0) return this.setState({state: null});
                 await this.setState({state})

                }}
                />

            <TextField
                  label='Address'
                  error={errors.addressError}
                  keyboardType="default"
                  ref={this.addressRef}
                  multiline={true}
                  onChangeText={(address) => {
                      this.setState({ address });
                  }}
                  
                 {...R.pallete.textFieldStyle}
              />
              </ScrollView>
              <Button onPress={() => this.handleContinue()} style={{borderWidth: 0, backgroundColor: 'green'}} textStyle={{ color: 'white'}}>Continue</Button>

            </>
        )
    }
}