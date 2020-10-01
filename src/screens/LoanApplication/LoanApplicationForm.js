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
const moment = require('moment');


class LoanApplicationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        success: false,
        amount:0,
        paybackDate:moment(new Date()).format("YYYY-MM-DD"),
        errors : {

        }
    };


  }

  componentDidMount() {
  }



  requestLoan = async () => {
    
    const formValid = await this.validateForm();

    if (formValid) {
      this.setState({loading:true});
      const { amount, paybackDate } = this.state;
      const req = await LoanService.loanRequest(amount, paybackDate);
      const res = req.data;
      console.log(res);

      await this.setState({loading: false});
      if (res.success) {
        this.setState({success: true});

      }
      else if (!res.success) {
        let errors = {};
        errors.backEndErrorRes = res.msg;
        this.setState({errors});
      }
    }
  }

  validateForm = async () => {
    let formValid = true;
    let errors = {};
    this.setState({errors});

    const { amount, paybackDate } = this.state;
    const { report } = this.props;

    const currentDate =  report.current_date;

    console.log("amount is "+amount);
   
    if (paybackDate < currentDate) {
      errors.paybackDateError = "Please select a date greater than today's date";
      formValid = false;
    }

    
     if (parseFloat(amount) < 1000) {
      errors.amountError = "Minimum loan amount is N1,000";
      formValid = false;
    }

    if (parseFloat(amount) >  report.level.max_amount) {
      errors.amountError = "Maximum amount for this level is "+formatCurrency(report.level.max_amount);
      formValid = false;
    }

   await this.setState({errors});
   return formValid;



  }

  calculatePayback (amount, interestRate) {
    return parseInt(amount) + parseInt((interestRate/100) * amount);
  }

  
  render() {
    const { loading, errors, success, amount, paybackDate } = this.state;
    const { report } = this.props;
    if (loading) {
      return <Loading text="Submitting your request please wait..." />
    }

    if (success) {
      return (
        <View style={styles.successModal}>
          <Text style={styles.successTitle}>Application Successful</Text>
          <View style={styles.successImg}>
              <Image
                  style={{width:100, height:100, margin: 15}}
                  source={R.images.success}
              />
          </View>
          <Text style={{textAlign: "center"}}>Your loan application has been received you will receive a message shortly on the status of your request.</Text>
        
          <TouchableOpacity style ={[R.pallete.proceedBtn]} onPress={() => this.props.navigation.navigate('MyLoansScreen')}>
                <Text style={R.pallete.proceedBtnText}>Continue</Text>
              </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>Maximum amount for {report.level.name} level is N{report.level.max_amount}</Text>
        {errors.backEndErrorRes && <Text style={R.pallete.errorText}>{errors.backEndErrorRes}</Text>}

          <TextField
                  label='Loan Amount'
                  error={errors.amountError}
                  ref={this.amountRef}
                  keyboardType="number-pad"
                  onChangeText={(amount) => {
                      this.setState({ amount });
                  }}
                  
                 {...R.pallete.textFieldStyle}
              />

                {amount > 0 && <Text style={{marginTop: 7, marginBottom: 7}}>Payback amount: {formatCurrency(this.calculatePayback(amount, report.level.interest_rate))}</Text>}

          <Text>Repayment date</Text>
              {errors.paybackDateError && <Text style={R.pallete.errorText}>{errors.paybackDateError}</Text>}
              <DatePicker
                date={paybackDate}
                onDateChange={(date_) => {
                    const paybackDate = moment(date_).format("YYYY-MM-DD");
                    console.log(paybackDate);
                    this.setState({paybackDate});
                }}
                mode="date"
                androidVariant="nativeAndroid"
                style={{marginLeft: -55}}
                />


          <TouchableOpacity style={R.pallete.proceedBtn} onPress={() => this.requestLoan()}>
            <Text style={R.pallete.proceedBtnText}>APPLY</Text>
          </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,

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






export default LoanApplicationForm;




