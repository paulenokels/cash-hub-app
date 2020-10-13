
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
  } from 'react-native';
  
  
import Button from 'apsl-react-native-button'
import R from 'res/R'
import { TextField } from 'react-native-material-textfield';

import ISMaterialPicker from 'library/components/ISMaterialPicker';
import AppService from 'services/AppService';
import Loading from 'library/components/Loading'


import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class BankInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bankName: null,
            bvn: null,
            bankAccounts: [{}],
            loading: true,
            banks:null,
            errors: {
                
            }
        };
    }

     componentDidMount() {
      if (R.constants.DEV) {
        this.setState({
            bvn: '0235263734',
            bankAccounts: [{bank_id: 6, account_number: '3097960033', account_type: 'Savings'}]
           
        });
        
    }
    this.getBanks();
    }

    getBanks = async() => {
      const req = await AppService.getBanks();
      const res = req.data;
     if (res.success) {
        await this.setState({banks: res.banks, loading: false});
        await AsyncStorage.setItem('@banks', JSON.stringify(res.banks));
      }

    }

    handleContinue = async () => {
        console.log("handle continue pressed");
        const { bankAccounts, bvn } = this.state;
        console.log(bankAccounts);
        const formValid = await this.validateForm();
        if (formValid) {
            let newUser = await AsyncStorage.getItem('@new_user');
            newUser = JSON.parse(newUser);
            newUser = {...newUser, bank_accounts: bankAccounts, bvn};
            console.log(newUser);
            await AsyncStorage.setItem('@new_user', JSON.stringify(newUser));
           this.props.onContinue();

        }
       
    }

    removeBankAccount = (index) => {
      let { bankAccounts } = this.state;
      bankAccounts.splice(index, 1);
      console.log(bankAccounts);
      this.setState({bankAccounts});
    }

    validateForm = async() => {
      let formValid = true;
      const { bvn, bankAccounts } = this.state;
      let errors = {};
      await this.setState({errors});

      if (!bvn) {
        errors.bvnError = "Please provide your bvn";
        formValid = false;
      }

      bankAccounts.forEach((bankAcount, index) => {
        if (!bankAcount.account_number || !bankAcount.account_type || !bankAcount.bank_id) {
          errors.bankError = "Please make sure you fill in the account number, account type and select the appropriate bank for all your added bank accounts";
          formValid = false;
        }
      });

      await this.setState({errors});

      return formValid;
      
    }

    renderAddBankForm() {
      const { banks, bankAccounts, errors } = this.state;
      const accountTypes = [{id: 1, name: 'Savings'}, {id: 1, name: 'Credit'}];

    return  <View>
      {
        bankAccounts.map((bankAccount, index) => {
          return <View style={styles.bankCard}>
              <Text style={{fontSize: 16, fontWeight: "bold", marginTop: 15, marginBottom: -15}}>Account {index+1}</Text>
              <TextField
                    label='Account Number'
                    error={errors.accountNumberError}
                    ref={this.accountNumberRef}
                    keyboardType='number-pad'
                    onChangeText={(accountNumber) => {
                      bankAccounts[index].account_number = accountNumber;
                        this.setState({ bankAccounts });
                    }}
                    
                   {...R.pallete.textFieldStyle}
                />  
                   <ISMaterialPicker 
                  items={accountTypes} 
                  label="Select account type"
                  errorText={this.state.errors.accountTypeError}
                  onValueChange={(accountType, index_) => {
                   if (index_ === 0) return ;
                    console.log(accountType);
                    console.log(index);
                    bankAccounts[index].account_type = accountType;
                    this.setState({bankAccounts})
  
                  }}
                  />
                  <ISMaterialPicker 
                  items={banks} 
                  label="Select Bank"
                  errorText={this.state.errors.bankNameError}
                  onValueChange={(b, bankIndex) => {
                    if (bankIndex === 0) return;//'select bank'
                    const bank = banks[bankIndex - 1];
                    console.log(bank);
                    bankAccounts[index].bank_id = bank.id;
                    this.setState({bankAccounts})
  
                  }}
                  />
                {/* User must have atlease one bank account */}
                {index != 0 && <TouchableOpacity style={{flexDirection: 'row',justifyContent:"flex-end", marginEnd: 10, marginBottom: 10}} onPress={()=> this.removeBankAccount(index)}>
                  <Text style={{...R.pallete.errorText}}>Remove Account</Text>
                  </TouchableOpacity>}
                </View>
        })

  
      }
      <View style={{justifyContent: "center", flexDirection: 'row'}}>
        <Button onPress={() => {bankAccounts.push({}); this.setState({bankAccounts})}} style={{borderWidth: 1, backgroundColor: 'white', width: 130, height: 30}} textStyle={{ color: 'black', fontSize: 12}}>Add Another Account</Button>

      </View>

    </View>
    
     

    }


    render() {
        const { errors, loading } = this.state;
        if (loading) return <Loading text="Retrieving information, please wait..." />
        return(
            <>
                <ScrollView>
                <Text style={R.pallete.formTitle}>BANK INFORMATION</Text>
                <Text>Please declare all the banks you have accounts here. Any undeclared bank found under your name will attract an addititonal fee of N500.</Text>
                {errors.bankError  && <Text style={{...R.pallete.errorText, marginTop: 10}}>ERROR: {errors.bankError}</Text>}

              <View style={{marginBottom: 20}}>
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
              </View>


             {this.renderAddBankForm()}
               
              </ScrollView>
              <Button onPress={() => this.handleContinue()} style={{borderWidth: 0, backgroundColor: 'green'}} textStyle={{ color: 'white'}}>Continue</Button>

            </>
        )
    }
}

const styles = StyleSheet.create({
  bankCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  }
})