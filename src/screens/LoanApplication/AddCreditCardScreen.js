import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';


import { TextField } from 'react-native-material-textfield';

import Loading from 'library/components/Loading'
import Icon from 'react-native-vector-icons/FontAwesome5';
import LoanService from 'services/LoanService';
import Modal from 'react-native-modal';
import {  LiteCreditCardInput, CreditCardInput } from "react-native-credit-card-input";

import Button from 'apsl-react-native-button'

import R from 'res/R'


class AddCreditCardScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        success: false,
        showAddCardModal: false,
        cardNumber:null,
        expiryDate:null,
        creditCards:[],
        errors:{},
        cvc:null,
    };
    this.params = this.props.params;
    this.userContacts = this.props.userContacts;

    console.log(this.params);


  }

  componentDidMount() {
      this.getUserCreditCards();
 
  }

  getUserCreditCards = async() => {
      const req = await LoanService.getUserCreditCards();
      const res = req.data;
      if (res.success) {
          let creditCards = [];

          if (res.creditCards.length > 0) {
              creditCards = res.creditCards.map(creditCard => {
                  return {
                      cardNumber: creditCard.card_number,
                      expiryDate: creditCard.expiry_date,
                      cvc: creditCard.cvc
                  }
              });
          }

          console.log(creditCards);
        this.setState({loading: false, creditCards});
      }

  }

  requestLoan = async () => {
    
   const { creditCards } = this.state;
   console.log(creditCards);

   if(!creditCards || creditCards.length == 0) {
        
    Alert.alert(
        "Add a card",
        "You must add at least one credit card to continue",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => this.setState({showAddCardModal: true}) }
        ],
        { cancelable: false }
      );
  
    return;
   }

      this.setState({loading:true});
      const { amount, paybackDate } = this.props;
      const req = await LoanService.loanRequest(amount, paybackDate, JSON.stringify(creditCards), this.params, this.userContacts);
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

 
  dismissModal = () => {
    this.setState({ showAddCardModal:false });
  }
  onCardChange = (form) => {
    this.setState({
        cardNumber: form.values.number,
        expiryDate: form.values.expiry,
        cvc: form.values.cvc
    });
  }

  addCard = async () => {
    const { cardNumber, expiryDate, cvc, creditCards} = this.state;
    if (!cardNumber || !expiryDate || !cvc) {
        Alert.alert(
            "Check your input",
            "Invalid card details, make sure the card number, expiry date and cvc are correct",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
      
        return;
    }
    this.dismissModal();
    creditCards.push({
        cardNumber,
        expiryDate,
        cvc
    });

    await this.setState({creditCards});
    this.setState({cardNumber: null, expiryDate:null, cvc:null});//reset card 
  }

  removeCard = (index) => {
      console.log(index);
      const { creditCards } = this.state;
      creditCards.splice(index,1);
      this.setState({creditCards});

  }

  renderCreditCards () {
      const { creditCards } = this.state;
      if (creditCards.length > 0) {
        return (
            <View>
                <Text style={{marginTop: 15, fontWeight: 'bold'}}>Tap on a card to remove</Text>
            {
                creditCards.map((creditCard, index) => {
                    return (
                        <TouchableOpacity onPress={() => this.removeCard(index)}>
                            <View style={styles.cardDisplay}>
                            <Text style={{fontWeight: 'bold'}}>{creditCard.cardNumber}</Text>
                            <Text>{creditCard.expiryDate}</Text>
                            <Text>{creditCard.cvc}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                    })
        }
        </View> );
    
  }
  return null;
}
  
  render() {
    const { loading, success, showAddCardModal } = this.state;

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
        <Text style={{fontSize:16, fontWeight: 'bold', marginBottom: 10}}>Add Credit Cards</Text>
        <Text>Please add all your credit cards here from which the payback amount will be deducted after your payback due date. Note that all cards are verified before any loan is approved. Any undeclared card found under your name will attract an addititonal fee of N500.</Text>
      

        {this.renderCreditCards()}
        <TouchableOpacity style={styles.addCardStyle} onPress={() => this.setState({showAddCardModal: true, errors:{}})}>
                  <Icon name={'credit-card'} size={20} style={{ marginEnd: 10, width: 30 }} />
                  <Text style={styles.addCardText}>Add Credit Card</Text>
        </TouchableOpacity>


        <TouchableOpacity style={R.pallete.proceedBtn} onPress={() => this.requestLoan()}>
            <Text style={R.pallete.proceedBtnText}>APPLY</Text>
          </TouchableOpacity>

        {/* INPUT CREDIT MODAL*/}
        <Modal isVisible={showAddCardModal} onBackButtonPress={this.dismissModal} onBackdropPress={this.dismissModal}>
          <View style={R.pallete.inputModal}>
              <Text style={{fontSize:16, fontWeight: 'bold', marginBottom: 10}}>Input Card Details</Text>
              <View style={{marginBottom: 10}}>
                <CreditCardInput onChange={this.onCardChange} />
              </View>
            <Button onPress={this.addCard}>Add</Button>

          </View>
        </Modal>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15

  },
  addCardStyle : {
    flexDirection: 'row',
    alignSelf: "flex-end",
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    marginTop: 10
  },
  cardDisplay: {
      flexDirection: 'row',
       justifyContent: 'space-between', 
       marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: '#ccc'
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






export default AddCreditCardScreen;




