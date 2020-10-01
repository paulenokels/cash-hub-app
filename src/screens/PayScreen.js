import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,  
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import Loading from 'library/components/Loading'
import { RNToasty } from 'react-native-toasty'
import PaystackWebView from 'react-native-paystack-webview'

import { formatCurrency } from 'library/utils/StringUtils';

import R from 'res/R';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LoanService from 'services/LoanService';


 export default class PayScreen extends Component {
  static navigationOptions = {
     title: 'Make Payment',

   };
   

  constructor(props) {
    super(props);
    this.state = {
      
      loading: true,
      success: false,
      successMsg: '',
      user: null,
    }

  
    
    

  }
  

  async componentDidMount() {
    
    let user = await AsyncStorage.getItem('@user');
    user = JSON.parse(user);
    this.setState({user, loading: false});
    
    
  }

  

  confirmPayment = async () => {
   
    await this.setState({loading: true});
    const req = await LoanService.payback(this.props.route.params.loan.id);
    //console.log(req);
    const res = req.data;
    console.log(res);
    await this.setState({loading: false});

    if (typeof res == 'undefined') {
      RNToasty.Error({
        title: 'Network error, check your internet connection and try again',
        duration: 1
     });
    }
    else if (res.success == true) {
      this.setState({success: true, successMsg: res.msg});
    }
    else if (!res.success) {
      RNToasty.Error({
        title: res.msg,
        duration: 2
     });
    }
  }
  

  render() {
    const { loading, user, success, successMsg } = this.state; 

    const { loan } = this.props.route.params;
   
    
    if (loading) {
      return (
        <Loading text="" />
      );
    }

    if (success) {
      return <View style={styles.modal}>
      <Text style={styles.successTitle}> {successMsg}</Text>
      <Image
                  style={{width:80, height:80, margin: 15}}
                  source={R.images.success}
              />
               <TouchableOpacity style ={[R.pallete.proceedBtn, {backgroundColor: R.colors.appPrimary}]} onPress={() => this.props.navigation.navigate('MyLoansScreen')}>
                <Text style={{color: 'white'}}>Continue</Text>
              </TouchableOpacity>
        </View> 
    }
   
   else return (

           <View style={styles.container}>
             <View>
                <ScrollView style={styles.infoCard}>
                    <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                      <View>
                        <Text style={styles.cardText}>Amount</Text>
                        <Text style={styles.cardText}>{formatCurrency(loan.payback_amount)}</Text>
                      </View>
                    </View>

                    <PaystackWebView
                      buttonText='Pay Now'
                      paystackKey={R.constants.paymentKeys.paystackTestPublicKey}
                      paystackSecretKey={R.constants.paymentKeys.paystackTestSecretKey}
                      amount={loan.payback_amount}
                      billingEmail={user.email}
                      billingMobile={user.phone}
                      billingName={user.last_name +' '+user.first_name}
                      ActivityIndicatorColor='green'
                      showPayButton={true}
                      btnStyles={[R.pallete.appButton, {backgroundColor: R.constants.appGreen}]}
                      textStyles ={{
                        color: 'white',
                        textAlign: 'center'
                      }}
                      refNumber={(new Date().getTime())}
                      onSuccess={(tranRef)=>{this.confirmPayment(tranRef)}}
                      onCancel={()=>{console.log('payment was cancelled')}}
                    />
                  </ScrollView>

                  
                 
                  
               
               </View>

              <View style={styles.securedPayment}> 
                <Text style={{textAlign: "center"}}>Your card and payment details are secured by paystack. We do not store your card/payment details</Text>

                <View>
                  <Text style={{fontWeight: 'bold', textAlign: "center", marginTop: 10}}><Ionicons name="ios-lock-closed-outline" size={20}/> Secured by PayStack</Text>
                </View>
              </View>


              </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "center"
    
  },

  infoCard : {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    
    
  },
  cardText: {
    fontSize: 13,
    color: '#000',
    fontWeight: "bold",
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  },
  securedPayment: {
    flexDirection: "column",
    alignContent: "center",
    padding: 10,
    backgroundColor: "#E3E9F3",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  modal: {
    flex: 1,
    marginTop: 20,
    padding: 10,
    alignItems: "center"
  },
  successTitle: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    color: 'darkgreen',
    marginBottom: 10,
    marginTop: 10,
  },
  cancelBtn: {
    marginRight: 15,
  },
  successImg : {
    justifyContent: "center",
    alignItems: "center"
  }
  
});


