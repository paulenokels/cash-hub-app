import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';


import Loading from 'library/components/Loading'
import ProfileService from 'services/ProfileService'
import { RNToasty } from 'react-native-toasty'
import { TextField, OutlinedTextField } from 'react-native-material-textfield';



import R from 'res/R'


export default class AddRegNumberScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        regNumber: '',
        errors: {}
    };



  }

  componentDidMount() {

  }

  updateRegNumber = async () => {
    const { regNumber } = this.state;

    this.setState({loading:true});

    const req = await ProfileService.simpleUpdate('reg_number', regNumber);

    const res = req.data;

    if (res && res.success) {
      let user = await AsyncStorage.getItem('@user');
      user = JSON.parse(user);
      user = {...user, reg_number: regNumber};
      this.props.navigation.navigate('EligibilityStatusScreen');

    }

    else {
    RNToasty.Error({ title: res.msg });
    console.log(req);

    }

    this.setState({loading: false});


  }


  render() {
      const { regNumber, errors, loading } = this.state;

        if (loading) {
          return (
            <Loading text="Adding registration number" />
          )
        }
    return (
        <View style={styles.container}>
        <Text style={{marginBottom: 15}}>Input your UTME or Application Number, this number can be found on your admission letter.</Text>
        <OutlinedTextField
                  label='Enter UTME/Application Number'
                  keyboardType="default"
                  error={errors.regNumberError}
                  ref={this.regNumberRef}
                  onChangeText={(regNumber) => {
                      this.setState({ regNumber });
                  }}
                  value={regNumber}
                 {...R.pallete.textFieldStyle}
              />
    <TouchableOpacity style={[R.pallete.proceedBtn, {alignSelf:'flex-end', width:150}]} onPress={() => this.updateRegNumber()}>
        <Text style={R.pallete.proceedBtnText}>Continue</Text>
    </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,

  },
 



})
