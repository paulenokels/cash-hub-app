import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from 'library/components/Loading'
import Icon from 'react-native-vector-icons/FontAwesome5';
import BankService from 'services/BankService';
import { TextField } from 'react-native-material-textfield';

import ISMaterialPicker from 'library/components/ISMaterialPicker';
import { formatCurrency } from 'library/utils/StringUtils'


import R from 'res/R'


class BankTransferScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        success: false,
        banks:null,
        amount:null,
        accountNumber: null,
        selectedBank:null,
        errors:{},
    };



  }

  componentDidMount() {
      this.getBanks();

  }
  getBanks = async() => {
    const req = await BankService.getBanks();
    const res = req.data;
   if (res.success) {
      await this.setState({banks: res.banks, loading: false});
    }

  }

  transfer = async () => {
      const formValid = await this.validateForm();
      if (formValid) {
          this.setState({loading: true});
        const {accountNumber, selectedBank, amount } = this.state;
        const req = await BankService.transfer(accountNumber, selectedBank.bank_code, amount);
        const res = req.data;
        console.log(res);

        this.setState({loading: false});
        if (res.success) {
            this.setState({success:true})
        }
        else if (!res.success) {
            let errors = {};
            errors.accountBalanceError = res.msg;
            this.setState({errors});
        }

      }
  }
  validateForm = async() => {
    let formValid = true;
    const { accountNumber, selectedBank, amount } = this.state;
    console.log(selectedBank);
    let errors = {};
    await this.setState({errors});

    if (!accountNumber) {
      errors.accountNumberError = "Please enter account number";
      formValid = false;
    }
    if (!selectedBank) {
        errors.bankNameError = "Please select the receiving bank";
        formValid = false;
      }
      if (!amount) {
        errors.amountError = "Please enter an amount";
        formValid = false;
      }
  
  
  

    await this.setState({errors});

    return formValid;
    
  }

  renderHeader() {
    return (
        <View style={R.pallete.headerStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Icon name={'arrow-left'} size={20} color={'#000'}  />
            </TouchableOpacity>

            <Text style={R.pallete.headerText}>Bank Transfer</Text>

        </View>
    );
}


  render() {
      const { loading, errors, amount, banks, success } = this.state;
      if (success) {
        return (
          <> 
          <this.renderHeader/>
          <View style={styles.successModal}>
            <Text style={styles.successTitle}>Transfer Successful</Text>
            <View style={styles.successImg}>
                <Image
                    style={{width:100, height:100, margin: 15}}
                    source={R.images.success}
                />
            </View>
            <Text style={{textAlign: "center"}}>Your transfer of {formatCurrency(amount)} was successfull</Text>
          
            <TouchableOpacity style ={[R.pallete.proceedBtn]} onPress={() => this.props.navigation.goBack(null)}>
                  <Text style={R.pallete.proceedBtnText}>Continue</Text>
                </TouchableOpacity>
          </View>
          </>
        )
      }
    return (
        <>
            <this.renderHeader />
            <View style={styles.container}>
              {errors.accountBalanceError && <Text style={[R.pallete.errorText, {textAlign: "center", margin: 10}]}>{errors.accountBalanceError}</Text>}

            {loading && <Loading text="Please wait..." />}
            {!loading && 
            <View>
                <TextField
                    label='Amount'
                    error={errors.amountError}
                    ref={this.accountNumberRef}
                    keyboardType='number-pad'
                    onChangeText={(amount) => {
                        this.setState({ amount });
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
                  label="Select Bank"
                  errorText={this.state.errors.bankNameError}
                  onValueChange={(bank, index) => {
                    if (index === 0) return;
                    const selectedBank = banks[index - 1];
                    this.setState({selectedBank});
  
                  }}
                  />

            <TouchableOpacity style ={[R.pallete.proceedBtn]} onPress={() => this.transfer()}>
                <Text style={R.pallete.proceedBtnText}>Transfer</Text>
              </TouchableOpacity>
            </View>
            }
            </View>
        </>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginEnd: 10,
    marginStart: 10

  },
 

  successModal: {
    flex: 1,
    marginTop: 30,
    padding: 10,
  },
  successTitle: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    color: 'darkgreen',
    marginBottom: 10,
    marginTop: 10,
  },
  successImg : {
    justifyContent: "center",
    alignItems: "center"
  }

})






export default BankTransferScreen;




