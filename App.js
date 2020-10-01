/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react'


import SplashScreen from 'src/screens/SplashScreen/SplashScreen'
import HomeScreen from 'src/screens/HomeScreen/HomeScreen'
import LoginScreen from 'screens/Auth/LoginScreen';
import RegisterScreen from 'screens/Auth/Registration/RegisterScreen';
import EligibilityStatusScreen from 'screens/LoanApplication/EligibilityStatusScreen';
import ManageDocumentsScreen from 'screens/ManageDocuments/ManageDocumentsScreen';
import UploadDocScreen from 'screens/UploadDoc/UploadDocScreen';
import MyLoansScreen from 'screens/Loan/MyLoansScreen';
import LoanInfoScreen from 'screens/Loan/LoanInfoScreen';
import LoanCodeScreen from 'screens/LoanApplication/LoanCodeScreen';
import BankTransferScreen from 'screens/BankTransfer/BankTransferScreen';
import EditProfileScreen from 'screens/EditProfile/EditProfileScreen';
import PayScreen from 'screens/PayScreen';


import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  StyleSheet,
  
} from 'react-native';


import R from 'res/R'
import CustomDrawer from './src/library/components/CustomDrawer';

const MainStack = createStackNavigator();

 function MainScreenStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false}}/>
      <MainStack.Screen name="EligibilityStatusScreen" component={EligibilityStatusScreen} options={{ headerShown: true, title: 'Apply for a Loan'}}/>
      <MainStack.Screen name="ManageDocumentsScreen" component={ManageDocumentsScreen} options={{ headerShown: false, title: 'Manage Documents'}}/>
      <MainStack.Screen name="UploadDocScreen" component={UploadDocScreen} options={{ headerShown: true, title: 'Upload Document'}}/>
    </MainStack.Navigator>
 )
}

const LoanStack = createStackNavigator();

function LoanStackScreen() {
  return (
    <LoanStack.Navigator>
      <LoanStack.Screen name="MyLoansScreen" component={MyLoansScreen}  options={{ headerShown: false}} />
      <LoanStack.Screen name="LoanInfoScreen" component={LoanInfoScreen}  options={{ headerShown: true, title: 'Loan Information'}}/>
      <LoanStack.Screen name="PayScreen" component={PayScreen}  options={{ headerShown: true, title: 'Loan Payback'}}/>
    </LoanStack.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawer />
      <DrawerItemList {...props} />

    </DrawerContentScrollView>
  );
}

function MainDrawer() {
  return (
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
          component={MainScreenStack}
          options={{ drawerIcon: () => <Ionicons name="ios-home" size={30} style={styles.drawerItemIcon} color="#000" /> }}

        />
        <Drawer.Screen
          name="My Loans"
          component={LoanStackScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-heart" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
        <Drawer.Screen
          name="Manage Documents"
          component={ManageDocumentsScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-notifications" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
         <Drawer.Screen
          name="Transfer to Bank"
          component={BankTransferScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-notifications" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
        <Drawer.Screen
          name="Input Loan Code"
          component={LoanCodeScreen}
          options={{ drawerIcon: () => <Ionicons name="ios-notifications" size={30} style={styles.drawerItemIcon} color="#000" /> }}
        />
        <Drawer.Screen
          name="Profile"
          component={EditProfileScreen}
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
  );
}


const AppStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
        <AppStack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: true, title: 'Cash-HUB Login'}} />
        <AppStack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: true, title: 'Cash-HUB Registration'}} />
        <AppStack.Screen name="HomeScreen" component={MainDrawer} options={{headerShown: false}} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({
  drawerItemIcon: {
    color: R.colors.appPrimary
  },
})



export default App;
