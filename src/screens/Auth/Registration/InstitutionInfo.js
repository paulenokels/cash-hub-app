
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



export default class InstitutionInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            InstitutionName: null,
            state: null,
            isStudent: null,
            
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


    renderInstitutionDetails() {
        const { isStudent, errors } = this.state;

        if(isStudent == "I am a Student") {
            return (
                <View>
                  <Text style={R.pallete.formSubTitle}>INSTITUTION DETAILS</Text>

                     <TextField
                  label='Name of Tertiary Institution'
                  error={errors.InstitutionNameError}
                  ref={this.InstitutionRef}
                  onChangeText={(InstitutionName) => {
                      this.setState({ InstitutionName });
                  }}
                  
                 {...R.pallete.textFieldStyle}
              />

               

            <ISMaterialPicker 
                items={states} 
                label="State where located"
                errorText={errors.stateError}
                onValueChange={async (state, index) => {
                  if (index === 0) return this.setState({state: null});
                 await this.setState({state})

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
                errorText={errors.stateError}
                onValueChange={async (isStudent, index) => {
                  if (index === 0) return this.setState({isStudent: null});
                 await this.setState({isStudent})

                }}
                />
               
                {this.renderInstitutionDetails()}


              </ScrollView>
              <Button onPress={() => this.handleContinue()} style={{borderWidth: 0, backgroundColor: 'green'}} textStyle={{ color: 'white'}}>Continue</Button>

            </>
        )
    }
}