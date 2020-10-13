import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  
} from 'react-native';


import PersonalInfoForm from './PersonalInfoForm';
import InstitutionInfo from './InstitutionInfo';
import BankInfo from './BankInfo';
import Selfie from './Selfie';

import StepIndicator from 'react-native-step-indicator';
const labels = ["Personal Information","Institution","Bank Details","Selfie"];



 export default class RegisterScreen extends Component {
  static navigationOptions = {
     title: 'Cash-HUB Registration',

   };

  constructor(props) {
    super(props);
    this.state = {
      
      loading: false,
      currentPosition: 0,
    }
   
  }

  doSomething = async () => {
   

  }

  onPageChange(position){
    this.setState({currentPosition: position});
}

gotoNextScreen = (position) => {
  this.setState({currentPosition:position});

}
switchForm() {
  const { currentPosition } = this.state;

  switch (currentPosition) {
    case 0:
      return (<PersonalInfoForm onContinue={() => this.gotoNextScreen(1)}/>);
    case 1:
       return(<InstitutionInfo onContinue={() => this.gotoNextScreen(2)} />);
    case 2:
      return (<BankInfo onContinue={() => this.gotoNextScreen(3)} />);
    case 3:
      return (<Selfie onContinue={() => this.props.navigation.navigate("HomeScreen")} />);

  }
}

  render() {
   return (
      
           <View style={styles.container}>
              
             <View style={{marginTop: 30}}>
              <StepIndicator
              currentPosition={this.state.currentPosition}
              labels={labels}
              stepCount={4}
            />
            </View>
              
                   {this.switchForm()}

            </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 15,
    marginTop: 0,
    backgroundColor: '#fff'
  },
  
});

