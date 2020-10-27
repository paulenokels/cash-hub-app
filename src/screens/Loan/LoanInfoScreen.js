import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';




import R from 'res/R'


import { formatCurrency } from 'library/utils/StringUtils'



class LoanInfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
       
    };



  }

  componentDidMount() {
    
  }

  

  
  render() {
   const { loan } = this.props.route.params;
   let approvedAndPaidBack = null;
   if (loan.status == 'APPROVED') {
       if (loan.paid_back == 0) {
           approvedAndPaidBack = false;
       }
       else if (loan.paid_back == 1) {
           approvedAndPaidBack = true;
       }
   }
    return (
      <View style={styles.container}>
          <Text style={styles.titleText}>Loan Information</Text>
      
        {loan && 
          <>
          <View style={styles.reportWrapper}>

        <Text>Loan Amount: {formatCurrency(loan.amount)}</Text>
        <Text>Payback Amount: {formatCurrency(loan.payback_amount)}</Text>
        <Text>Interest Rate: {loan.interest_rate}%</Text>

        <Text style={styles.cardTitle}>LOAN STATUS</Text>
       
            <View style={styles.levelDocument}>
            
            <Text style={styles.approvedText}>{loan.status}</Text>
        { loan.status == 'APPROVED' && <Text style={styles.approvedText}>Due date {loan.payback_date}</Text> }
              
              </View>
         

          </View>

          {approvedAndPaidBack == false &&

          <TouchableOpacity style={styles.continueBtn} onPress={() => this.props.navigation.navigate('PayScreen', {loan: this.props.route.params.loan})}>
            <Text style={styles.uploadText}>Payback Now</Text>
          </TouchableOpacity>
         
          }

          </>
          
          }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  titleText: {
    padding: 20,
    marginBottom: -33,
    fontSize: 18,
    color: 'white',
    backgroundColor: R.colors.appPrimary,
  },

  cardTitle: {
    fontSize: 14,
    marginTop: 25,
    marginBottom: 10,
    color: R.pallete.appPrimary,
    fontWeight: 'bold'
  },

  reportWrapper : {
    ...R.pallete.card, marginTop: 20
  },
  levelDocument: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  errorText : {
    color: 'red',
    fontWeight: '700'
  },
  approvedText: {
    color: 'green',
    fontWeight: '700'
  },
  checkFail: {
    color: "red",
    fontSize: 13,
    marginTop: 10,
    padding: 10,
  },
  uploadDocBtn : {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
    
  },
  continueBtn : {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
    
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
 



})






export default LoanInfoScreen;




