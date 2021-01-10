
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
import AsyncStorage from '@react-native-community/async-storage';



export default class InstitutionInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            institutionName: '',
            regNumber:'',
            institutionState: '',
            userTypeId: 0,
            errors: {
                
            }
        };
    }

   
    componentDidMount() {
        //auto form filling for fast prototyping
        if (R.constants.DEV) {
            this.setState({
                userTypeId: 1,
                institutionName: 'University of Agriculture',
                institutionState: 'Benue',
             
            });
            
        }
    }
    handleContinue = async () => {
        console.log("handle continue pressed");
        const formValid = await this.validateForm();
        if (formValid) {
            let newUser = await AsyncStorage.getItem('@new_user');
            const { userTypeId, institutionName, regNumber, institutionState } = this.state;
            newUser = JSON.parse(newUser);
            newUser = {...newUser, type_id: userTypeId, institution_name: institutionName, institution_state: institutionState, reg_number: regNumber };
            await AsyncStorage.setItem('@new_user', JSON.stringify(newUser));
            this.props.onContinue();
        }
        
    }

    validateForm = async () => {
        let formValid = true;
        let errors = {};
        this.setState({errors});
        const { userTypeId, institutionName, institutionState, regNumber } = this.state;
        console.log(userTypeId);
        if (userTypeId == 0) {
            errors.userTypeIdError = "Please select an option.";
            formValid = false;
        }
        else if (userTypeId == 1) {
            if (!institutionName) {
                errors.institutionNameError = "Please fill in your institution name";
                formValid = false;
            }

            if (!institutionState) {
                errors.institutionStateError = "Please select the state where your institution is located";
                formValid = false;
            }
            if (!regNumber) {
                errors.regNumberError = "Please your registration number, this can be found on your admission letter";
                formValid = false;
            }
        } 

        //set error if any
        await this.setState({errors});

        return formValid;
    }


    renderInstitutionDetails() {
        const { userTypeId, errors } = this.state;

        if(userTypeId == 1) {
            return (
                <View>
                  <Text style={R.pallete.formSubTitle}>INSTITUTION DETAILS</Text>

                     <TextField
                  label='Name of Tertiary Institution'
                  error={errors.institutionNameError}
                  ref={this.InstitutionRef}
                  onChangeText={(institutionName) => {
                      this.setState({ institutionName });
                  }}
                  
                  
                 {...R.pallete.textFieldStyle}
              />

                <TextField
                  label='UTME/Registration number'
                  error={errors.regNumberError}
                  ref={this.regNumberRef}
                  onChangeText={(regNumber) => {
                      this.setState({ regNumber });
                  }}
                  
                  
                 {...R.pallete.textFieldStyle}
              />

               

            <ISMaterialPicker 
                items={states} 
                label="State where located"
                errorText={errors.institutionStateError}
                onValueChange={async (institutionState, index) => {
                  if (index === 0) return this.setState({institutionState: null});
                  console.log(institutionState);
                 await this.setState({institutionState, errors: {}});
                 

                }}
                />
                </View>
            )
        }
        return null;
    }

    render() {
        const { errors } = this.state;
        return(
            <>
                <ScrollView>
                <Text style={R.pallete.formTitle}>INSTITUTION</Text>

                <ISMaterialPicker 
                items={[{"name":"I am a Student"}, {"name":"I am NOT a Student"}]} 
                label="Are you a student ?"
                errorText={errors.userTypeIdError}
                onValueChange={async (isStudent, index) => {
                 await this.setState({userTypeId: index, errors:{}})

                }}
                />
               
                {this.renderInstitutionDetails()}


              </ScrollView>
              <Button onPress={() => this.handleContinue()} style={{borderWidth: 0, backgroundColor: 'green'}} textStyle={{ color: 'white'}}>Continue</Button>

            </>
        )
    }
}