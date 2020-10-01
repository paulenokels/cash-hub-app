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


import R from 'res/R'

import LoanService from 'services/LoanService';

import { formatCurrency } from 'library/utils/StringUtils'
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome5';

const moment = require('moment');


class LoanCodeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        success: false,
        loanCode:null,
        validCode: false,
        loan:null,
        errors : {

        }
    };


  }

  componentDidMount() {

  }


  validateCode = async () => {
    const { loanCode } = this.state;
    let errors = {};
    this.setState({errors});
    if (!loanCode) {
      errors.codeError = "Please input valid loan code";
      this.setState({errors});
    }
    else {
      this.setState({loading: true, loadingText: 'Validating code please wait...'});
      const req = await LoanService.validateCode(loanCode);
      const res = req.data;

      console.log(res);

      this.setState({loading: false});

      if (res.success) {
        this.setState({loan: res.loan, validCode: true});
      }
      else if (!res.success) {
        errors.codeError = res.msg;
      this.setState({errors});
      }
    }
  }


  acceptLoanViaCode = async () => {
      this.setState({loading:true});
      const { loanCode } = this.state;
      const req = await LoanService.acceptLoanViaCode(loanCode);
      const res = req.data;
      console.log(res);

      await this.setState({loading: false});
      if (res.success) {
        this.setState({success: true});

      }
      else if (!res.success) {
        let errors = {};
        errors.codeError = res.msg;
        this.setState({errors});
      }
    
  }

 
  renderCodeForm() {
    const {  loanCode, errors } = this.state;

      return <View>
              {errors.codeError && <Text style={[R.pallete.errorText, {textAlign: "center", margin: 10}]}>{errors.codeError}</Text>}

            <TextField
                  label='Loan Code'
                  error={errors.amountError}
                  ref={this.amountRef}
                  keyboardType="default"
                  onChangeText={(loanCode) => {
                      this.setState({ loanCode });
                  }}
                  
                 {...R.pallete.textFieldStyle}
              />

        <TouchableOpacity style={R.pallete.proceedBtn} onPress={() => this.validateCode()}>
            <Text style={R.pallete.proceedBtnText}>Validate Code</Text>
          </TouchableOpacity>

      </View>
  }

  renderHeader() {
    return (
        <View style={R.pallete.headerStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Icon name={'arrow-left'} size={20} color={'#000'}  />
            </TouchableOpacity>

            <Text style={R.pallete.headerText}>Input Loan Code</Text>

        </View>
    );
}
  
  render() {
    const { loading, success, validCode, loan } = this.state;
    if (loading) {
      return <Loading text="Submitting your request please wait..." />
    }

    if (success) {
      return (
        <> 
        <this.renderHeader/>
        <View style={styles.successModal}>
          <Text style={styles.successTitle}>Application Successful</Text>
          <View style={styles.successImg}>
              <Image
                  style={{width:100, height:100, margin: 15}}
                  source={R.images.success}
              />
          </View>
          <Text style={{textAlign: "center"}}>Your loan application has been received you will receive a message shortly on the status of your request.</Text>
        
          <TouchableOpacity style ={[R.pallete.proceedBtn]} onPress={() => this.props.navigation.goBack(null)}>
                <Text style={R.pallete.proceedBtnText}>Continue</Text>
              </TouchableOpacity>
        </View>
        </>
      )
    }

    else if (!validCode) {
        return (
        <>
          <this.renderHeader/>
          <View style={styles.container}>
              {this.renderCodeForm()}
          </View>
        </>
        )
    }
   if (loan) return (
     <>
      <this.renderHeader/>
      <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Loan Amount</Text>
            <Text style={styles.sectionValue}>{formatCurrency(loan.amount)}</Text>
          </View>
        
        
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payback Amount</Text>
            <Text style={styles.sectionValue}>{formatCurrency(loan.payback_amount)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interest Rate</Text>
            <Text style={styles.sectionValue}>{loan.interest_rate}%</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payback Date</Text>
            <Text style={styles.sectionValue}>{loan.payback_date}</Text>
          </View>


          <TouchableOpacity style={R.pallete.proceedBtn} onPress={() => this.acceptLoanViaCode()}>
            <Text style={R.pallete.proceedBtnText}>Accept and Continue</Text>
          </TouchableOpacity>

      </View>
      </>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,

  },
  section: {
      marginBottom: 15
  },
  sectionTitle: {
      fontWeight: 'bold',
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






export default LoanCodeScreen;




