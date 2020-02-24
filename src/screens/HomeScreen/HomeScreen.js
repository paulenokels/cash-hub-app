import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


import { BottomNavigation } from 'react-native-material-ui';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from "react-navigation-tabs";
import IconWithBadge from 'library/components/IconWithBadge';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Button from 'apsl-react-native-button'


import R from 'res/R'

const loans = [
  {
    "amount": "20,000",
    "due_date": "March 3rd, 2020",
    "status": 'PAID'
  },
  {
    "amount": "100,000",
    "due_date": "March 20th, 2020",
    "status": 'PAID'
  },
  {
    "amount": "1,000",
    "due_date": "April 20th, 2020",
    "status": 'UNPAID'
  },
]

class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };



  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons onPress={() => this.props.navigation.toggleDrawer()} name="ios-menu" size={30} style={styles.menuIcon} color="#fff" />

          <Text style={styles.headerText} >Cash HUB</Text>
          <Image source={R.images.avatar} style={[R.pallete.avatar, { width: 30, height: 30 }]} />

        </View>

        <View style={styles.accountBalanceWrapper}>
          <Text style={styles.accountBalanceTitle}>Account Balance</Text>
          <Text style={styles.accountBalance}>&#8358;{`20,000`}</Text>
        </View>

        <View style={styles.needALoanWrapper}>
          <Text style={styles.needALoanText}>Need a Loan ?</Text>
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={.5}
            onPress={() => { }}
          >

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.getStartedText}> Get Started </Text>
              <Ionicons onPress={() => { }} name="ios-arrow-forward" size={25} style={{ paddingStart: 6 }} color="#fff" />

            </View>


          </TouchableOpacity>

        </View>

        <View style={styles.loanHistoryWrapper}>
          <Text style={styles.historyHeader}>Loan History</Text>

          {loans.map((loan, key) => {
            return (
              <View key={key} style={{marginBottom: 30}}>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons onPress={() => { }} name="ios-wallet" size={30} style={{ paddingStart: 6, height: 30, marginTop: 7 }} color="green" />
                  <View style={{ marginLeft: 10, marginBottom: 10, marginTop: 10, paddingTop: -10 }}>
                    <Text style={{ color: '#000', fontSize: 17, }}>&#8358;{loan.amount}</Text>
                    <Text style={{ color: 'grey', fontSize: 11, }}>Due : {loan.due_date}</Text>
                  </View>

                </View>
                <Text style={{ alignSelf: 'flex-end', marginTop: -50, fontWeight: 'bold', fontSize: 11, color: 'green', backgroundColor: 'lightblue', padding: 7, borderRadius: 10}}>{loan.status}</Text>


              </View>
            );
          })}
          <TouchableOpacity
            style={[styles.getStartedButton, { backgroundColor: 'orange' }]}
            activeOpacity={.5}
            onPress={() => { }}
          >

            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.getStartedText]}> View More </Text>

            </View>


          </TouchableOpacity>
        </View>

      </View>

    );
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
  drawerItemIcon: {
    color: R.colors.appPrimary
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
    fontSize: 16,
    color: '#fff',

  },
  getStartedButton: {
    alignSelf: 'center',
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
    backgroundColor: 'green'
  },
  loanHistoryWrapper: {
    marginStart: -5,
    marginEnd: -5,
    borderColor: '#ccc',
    marginTop: 30,
    minHeight: 250,
    padding: 15,
    elevation: 4,
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




const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={[styles.containHeader, { backgroundColor: R.colors.appPrimary, marginTop: -5, paddingTop: 10, paddingBottom: 10 }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={R.images.avatar} style={[R.pallete.avatar, { width: 100, height: 100 }]} />
          <Text style={{ color: '#fff', marginTop: '3%', fontFamily: 'Segoe-UI' }}>{`Hi Paul`}</Text>
          <Text style={{ color: '#fff', fontFamily: 'Segoe-UI' }}>{`achemepaulenokela@gmail.com`}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType={'back'}
        drawerContent={props => <CustomDrawerContent {...props} />}
        drawerStyle={{ backgroundColor: '#fff' }}
        drawerContentOptions={{
          labelStyle: {
            color: R.colors.appPrimary
          }
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-home" size={30} style={styles.drawerItemIcon} color="#000" /> }}

        />
        <Drawer.Screen
          name="Loan History"
          component={HomeScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-heart" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
        <Drawer.Screen
          name="Notifications"
          component={HomeScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-notifications" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
        <Drawer.Screen
          name="Profile"
          component={HomeScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-person" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
        <Drawer.Screen
          name="Settings"
          component={HomeScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-settings" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
        <Drawer.Screen
          name="Help"
          component={HomeScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-heart" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


export default MyDrawer;




