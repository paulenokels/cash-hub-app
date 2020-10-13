import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';




import Loading from 'library/components/Loading'


import R from 'res/R'


import { formatCurrency } from 'library/utils/StringUtils'
import { TextField } from 'react-native-material-textfield';
import DatePicker from 'react-native-date-picker'
import AddCreditCardScreen from './AddCreditCardScreen';
const moment = require('moment');


class LoanApplicationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        amount:0,
        paybackDate:moment(new Date()).format("YYYY-MM-DD"),
        showAddCreditCardScreen: false,
        creditCards:[],
        errors : {

        }
    };


  }

  componentDidMount() {
  }



  showAddCreditCardScreen = async () => {
    
    const formValid = await this.validateForm();

    if (formValid) {
      this.setState({showAddCreditCardScreen:true});
     
    }
  }

  validateForm = async () => {
    let formValid = true;
    let errors = {};
    this.setState({errors});

    const { amount, paybackDate } = this.state;
    const { report } = this.props;

    const currentDate =  report.current_date;
    console.log('current date '+currentDate);

    console.log("amount is "+amount);
   
    if (paybackDate < currentDate) {
      errors.paybackDateError = "Please select a date greater than today's date";
      formValid = false;
    }

    const maxPaybackDate = moment(currentDate).add(report.level.max_duration, 'days').format('YYYY-MM-DD');
    if (paybackDate > maxPaybackDate) {
      errors.paybackDateError = `Maximum duration for this level is ${report.level.max_duration} days`;
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
    const { loading, errors, amount, paybackDate, showAddCreditCardScreen } = this.state;
    const { report } = this.props;
    if (loading) {
      return <Loading text="Submitting your request please wait..." />
    }

    if (showAddCreditCardScreen) {
      return <AddCreditCardScreen amount={amount} paybackDate={paybackDate} />
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

          <Text style={{marginTop: 25,}}>Repayment date</Text>
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



          <TouchableOpacity style={R.pallete.proceedBtn} onPress={() => this.showAddCreditCardScreen()}>
            <Text style={R.pallete.proceedBtnText}>Continue</Text>
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
 
 


})






export default LoanApplicationForm;




