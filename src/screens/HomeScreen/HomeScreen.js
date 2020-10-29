import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'



import Icon from 'react-native-vector-icons/FontAwesome5';

import UserService from 'services/UserService';
import { formatCurrency } from 'library/utils/StringUtils'

import { BackHandler } from 'react-native';
import R from 'res/R'
import { ScrollView } from 'react-native-gesture-handler';



class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = {
      user:null,
      userSummary:null,
    };



  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

    this.getUser();
    this.getUserSummary();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  if (this.props.navigation.isFocused()) {
    BackHandler.exitApp();
  }
 
}

  getUser = async() => {
    //await AsyncStorage.removeItem('@user');
    let user = await AsyncStorage.getItem('@user');
    if (!user) {
      this.props.navigation.navigate('LoginScreen');
    }
    user = JSON.parse(user);
    //console.log(user);
    this.setState({user});
  }

  getUserSummary = async () => {
    console.log("Getting user summary");

    const req = await UserService.getUserSummary();
    const res = req.data;
    let userSummary = {};

    if (res.success) {
      userSummary.loans = res.loans;
      userSummary.accountBalance = res.account_balance;
      userSummary.level = res.level;
      this.setState({userSummary});
    }
  }


  render() {
    const { user, userSummary } = this.state;
   if (user) return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon  name="bars" size={25} style={styles.menuIcon} color="#fff" />
            <Text style={{color: '#fff', marginTop: 4, marginLeft:-4, fontSize: 12}}>MENU</Text>
          </TouchableOpacity>

          <Text style={styles.headerText} >cash-HUB</Text>
          <Image source={{uri: R.constants.FILE_SERVER+user.photo}} style={[R.pallete.avatar, { width: 30, height: 30 }]} />

        </View>

        <View style={styles.accountBalanceWrapper}>
          <Text style={styles.accountBalanceTitle}>Account Balance</Text>
   {userSummary ? <Text style={styles.accountBalance}>{formatCurrency(userSummary.accountBalance)}</Text>  :  <ActivityIndicator />}
          
        </View>

        <ScrollView>

        <View style={styles.needALoanWrapper}>
   <Text style={styles.welcomeText}>Welcome {user.last_name}</Text>
          <Text style={styles.needALoanText}>Need a Loan ?</Text>
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={.5}
           
          >

              <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'center' }} onPress={() => this.props.navigation.navigate('EligibilityStatusScreen')}>
                <Text style={styles.getStartedText}> Apply Now </Text>
                <Icon onPress={() => { }} name="arrow-right" size={25} style={{ paddingStart: 6 }} color="#fff" />
              </TouchableOpacity>



          </TouchableOpacity>

        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, marginTop: 15, marginBottom: 2, paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
          <Text style={{fontSize: 11, fontWeight: 'bold'}}>Your Level</Text>
          <Text style={{fontSize: 11, fontWeight: 'bold'}}>Max amount for level</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10, marginTop: 0}}>
          {userSummary ? <Text style={{fontSize: 18, fontWeight: 'bold', color: 'green'}}>{userSummary.level.name}</Text> : <ActivityIndicator />}
          {userSummary ? <Text style={{fontSize: 18, fontWeight: 'bold', color: 'green'}}>{formatCurrency(userSummary.level.max_amount)}</Text> : <ActivityIndicator />}

        </View>

        <View style={styles.loanHistoryWrapper}>
          <Text style={styles.historyHeader}>Loan History</Text>

          {userSummary && userSummary.loans.length > 0 && userSummary.loans.map((loan, key) => {
            return (
              <View key={key} style={{marginBottom: 30}}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon onPress={() => { }} name="coins" size={30} style={{ paddingStart: 6, height: 30, marginTop: 7 }} color="green" />
                  <View style={{ marginLeft: 10, marginBottom: 10, marginTop: 10, paddingTop: -10 }}>
                    <Text style={{ color: '#000', fontSize: 17, }}>{formatCurrency(loan.amount)}</Text>
                    <Text style={{ color: 'grey', fontSize: 11, }}>Due : {loan.payback_date}</Text>
                  </View>

                </View>
                {loan.status == 'APPROVED' && <Text style={{ alignSelf: 'flex-end', marginTop: -50, fontWeight: 'bold', fontSize: 11, color: 'green', backgroundColor: 'lightblue', padding: 7, borderRadius: 10}}>{loan.status}</Text>}
                {loan.status == 'PENDING' && <Text style={{ alignSelf: 'flex-end', marginTop: -50, fontWeight: 'bold', fontSize: 11, color: 'white', backgroundColor: 'orange', padding: 7, borderRadius: 10}}>{loan.status}</Text>}
                {loan.status == 'REJECTED' && <Text style={{ alignSelf: 'flex-end', marginTop: -50, fontWeight: 'bold', fontSize: 11, color: 'white', backgroundColor: 'red', padding: 7, borderRadius: 10}}>{loan.status}</Text>}
                


              </View>
            );
          })}
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: 'orange' }]}
            activeOpacity={.5}
            onPress={() => { this.props.navigation.navigate('MyLoansScreen')}}
          >

            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.getStartedText]}> Manage Loans </Text>

            </View>


          </TouchableOpacity>
        </View>
        </ScrollView>

      </View>

    );

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: R.colors.appPrimary,
    flexDirection: 'row',
    padding: 10,
    paddingTop: 50,
    paddingBottom: 50,
    justifyContent: "space-between",


  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  menuIcon: {
    marginEnd: 20
  },
  accountBalanceWrapper: {
    margin: 0,
    marginTop: -7,
    padding: 10,
    backgroundColor: R.colors.appPrimary
  },
  accountBalanceTitle: {
    color: '#fff',
    fontSize: 11,
    textAlign: 'center',
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 1,
    width: 100,
    alignSelf: 'center'
  },
  accountBalance: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center'

  },
  
  needALoanWrapper: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  needALoanText: {
    fontWeight: 'bold'
  },
  getStartedText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 13,
    color: '#fff',

  },
  welcomeText : {
    fontSize: 20,
    marginBottom: 10
  },
  getStartedButton: {
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'green'
  },
  loanHistoryWrapper: {
   ...R.pallete.card
  },
  historyHeader: {
    color: R.colors.appPrimary,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    fontWeight: 'bold'
  }



})




export default HomeScreen;




