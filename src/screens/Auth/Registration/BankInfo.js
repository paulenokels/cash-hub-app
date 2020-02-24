
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
import banks from 'res/nigerianBanks.json';



export default class BankInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bankName: null,
            bvn: null,
            accountNumber: null,
            
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
                <Text style={R.pallete.formTitle}>BANK INFORMATION</Text>

                <TextField
                  label='BVN'
                  error={errors.bvnError}
                  ref={this.bvnRef}
                  keyboardType='number-pad'
                  onChangeText={(bvn) => {
                      this.setState({ bvn });
                  }}
                  
                 {...R.pallete.textFieldStyle}
              />


                <TextField
                  label='Account Number'
                  error={errors.accountNumberError}
                  ref={this.accountNumberRef}
                  keyboardType='number-pad'
                  onChangeText={(accountNumber) => {
                      this.setState({ accountNumber });
                  }}
                  
                 {...R.pallete.textFieldStyle}
              />
                <ISMaterialPicker 
                items={banks} 
                label="Choose Bank"
                errorText={this.state.errors.bankNameError}
                onValueChange={(bankName, index) => {
                  if (index === 0) return this.setState({bankName: null});
                  this.setState({bankName})

                }}
                />
               


              </ScrollView>
              <Button onPress={() => this.handleContinue()} style={{borderWidth: 0, backgroundColor: 'green'}} textStyle={{ color: 'white'}}>Continue</Button>

            </>
        )
    }
}