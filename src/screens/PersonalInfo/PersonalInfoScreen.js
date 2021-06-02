import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from 'library/components/Loading'
import Icon from 'react-native-vector-icons/FontAwesome5';
import ISMaterialPicker from 'library/components/ISMaterialPicker';
import { TextField } from 'react-native-material-textfield';
import Button from 'apsl-react-native-button'



import R from 'res/R'

const genders = [{ name: 'Male' }, { name: 'Female' }];
const housingSituations = [{ name: 'Rent' }, { name: 'Owner' }, { name: 'Lease' }, { name: 'With Friends' }, { name: 'With Relatives' }];


class PersonalInfoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      housingSituation: "",
      nextOfKinName: "",
      nextOfKinPhone: "",
      gender: "",
      errors: {},
    };


    console.log(this.props.route.params);
  }

  componentDidMount() {

  }

  async handleContinue() {
    console.log("handle continue pressed");
    const formValid = await this.validateForm();
    console.log(formValid);
    if (!formValid) return;
    const { housingSituation, gender, nextOfKinPhone, nextOfKinName } = this.state;
    const params = { ...this.props.route.params, housingSituation, gender, nextOfKinPhone, nextOfKinName };
    this.props.navigation.navigate('EligibilityStatusScreen',  params);

  }

  async validateForm() {
    const { housingSituation, gender, nextOfKinPhone, nextOfKinName, errors } = this.state;
    await this.setState({ errors: {} });
    let formValid = true;

    if (!housingSituation) {
      errors.housingError = "Please Select Your Housing Situation";
      formValid = false;
    }
    if (!gender) {
      errors.genderError = "Please Select Your Gender";
      formValid = false;
    }
    if (!nextOfKinName) {
      errors.nameError = "Please Select Your Next of Kin";
      formValid = false;
    }
    if (!nextOfKinPhone) {
      errors.phoneError = "Please Select Your Next of Kin Phone Number";
      formValid = false;
    }

    await this.setState({ errors });

    return formValid;

  }


  render() {
    const { errors, nextOfKinName, nextOfKinPhone, gender, housingSituation } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>Gender</Text>
          <ISMaterialPicker
            items={genders}
            label="--Select Gender--"
            selectedItem={null}
            errorText={errors.genderError}
            onValueChange={async (gender, index) => {
              if (index === 0) return this.setState({ gender: null });
              await this.setState({ gender })

            }}
          />

          <Text>Housing</Text>
          <ISMaterialPicker
            items={housingSituations}
            label="--Housing Situation--"
            selectedItem={null}
            errorText={errors.housingError}
            onValueChange={async (housingSituation, index) => {
              if (index === 0) return this.setState({ housingSituation: null });
              await this.setState({ housingSituation })

            }}
          />


          <TextField
            label='Next of Kin Name'
            labelFontSize={12}
            error={errors.nameError}
            ref={this.lastNameRef}
            onChangeText={(nextOfKinName) => {
              this.setState({ nextOfKinName });
            }}
            value={nextOfKinName}
            {...R.pallete.textFieldStyle}
          />


          <TextField
            label='Next of Kin Phone Number'
            labelFontSize={12}
            keyboardType="number-pad"
            error={errors.phoneError}
            ref={this.lastNameRef}
            onChangeText={(nextOfKinPhone) => {
              this.setState({ nextOfKinPhone });
            }}
            value={nextOfKinPhone}
            {...R.pallete.textFieldStyle}
          />

          <Button onPress={() => this.handleContinue()} style={{ borderWidth: 0, backgroundColor: 'green' }} textStyle={{ color: 'white' }}>Continue</Button>

        </ScrollView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,

  },




})






export default PersonalInfoScreen;




