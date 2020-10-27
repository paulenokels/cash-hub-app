import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';

import R from 'res/R'

import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';


import Loading from 'library/components/Loading'
import Modal from 'react-native-modal';
import { TextField } from 'react-native-material-textfield';
import Button from 'apsl-react-native-button'
import ISMaterialPicker from 'library/components/ISMaterialPicker';
import states from 'res/states.json'
import BankService from 'services/BankService'
import ProfileService from 'services/ProfileService'
import { RNToasty } from 'react-native-toasty'
import { PERMISSIONS, request } from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';





export default class EditProfileScreen extends Component {
  static navigationOptions = {
    title: 'Screen title here',

  };

  constructor(props) {
    super(props);
    this.state = {

      loading: false,
      user: null,
      services: null,
      showAddAccountModal: false,
      showInputModal: false,
      showLocationModal: false,
      inputTitle: '',
      inputValue: '',
      state: null,
      city: null,
      citiesInState: null,
      column: null,
      updatingProfilePic: false,
      bankAccounts: [{}],
      banks:null,
      accountNumberInput:null,
      accountTypeInput:null,
      bankIdInput:null,



      errors: {
        inputValueError: '',
        stateError: '',
        cityError: '',
      }
    }

    
  }
  componentDidMount() {
    this.setUser();
    this._checkCameraAndPhotosPermission();
    this.getBanks();
    this.getUserBanks();
  }

  getBanks = async() => {
    const req = await BankService.getBanks();
   // console.log(req);
    const res = req.data;
   if (res.success) {
      await this.setState({banks: res.banks, loading: false});
     
    }

  }

  getUserBanks = async() => {
    const req = await BankService.getUserBanks();
    const res = req.data;
   if (res.success) {
      await this.setState({bankAccounts: res.bank_accounts, loading: false});
     
    }

  }

  _checkCameraAndPhotosPermission = async () => {
     await request(PERMISSIONS.ANDROID.CAMERA);
     await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  };
  launchImagePicker = () => {
    console.log("Open camera tapped")
    ImagePicker.launchImageLibrary({quality: 0.5, storageOptions: {
      skipBackup: true,
      path: 'images'
      }}, (response) => {
      // Same code as in above section!
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = response.uri;

       this.updateDP(source);


      }
    });

  }

  updateDP = async (source) => {
    this.setState({updatingProfilePic: true});
    const req = await ProfileService.changeProfilePicture(source.uri);
    const res = req.data;
    if (typeof res === 'undefined') {
    RNToasty.Error({ title: `Network error, please check your internet connection and try again` });

    }
    else if (res.success) {
      this.setState({
        user: { ...this.state.user, photo: res.photo },
      });
      await ProfileService.updateUser('photo', res.photo);

    RNToasty.Success({ title: `Profile picture changed successfully` });

    }
    else {
    RNToasty.Error({ title: `Error: ${res.msg}` });

    }
    

    this.setState({updatingProfilePic: false});

  }


  setUser = async () => {
    let user = await AsyncStorage.getItem('@user');
    user = JSON.parse(user);
   // console.log(user);

    this.setState({ user, services: user.services, state: user.state, city: user.city });

    for (var i = 0; i < states.length; ++i) {
      if (states[i].name = user.state) {
        const citiesInState = states[i].locals;
        this.setState({ citiesInState });
        break;
      }
    }

  }

  signOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
      
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: async () => {
          await AsyncStorage.removeItem('@user');
          this.props.navigation.navigate("LoginScreen");
        } }
      ],
      { cancelable: false }
    );
  }

  simpleUpdate = async () => {
    this.dismissModal();
    const { column, inputValue, inputTitle } = this.state;

    if (inputValue == '' || inputValue.trim().length == 0) { RNToasty.Error({ title: `Please enter a value for ${inputTitle}` }); return; }
    RNToasty.Info({ title: `Updating ${inputTitle}` });

    const req = await ProfileService.simpleUpdate(column, inputValue);
    const res = req.data;
    //console.log(req);
    if (typeof res == 'undefined') {
      RNToasty.Error({ title: `Network Error. Please check your internet connection and try again.` });
    }
    else if (res.success) {
      RNToasty.Success({ title: `${inputTitle} updated successfully` });
      const { user } = this.state;


      //local updates, asyc storage and state
      if (column == 'full_name') {
        user.full_name = inputValue;
        ProfileService.updateUser('full_name', inputValue);
      }
      else if (column == 'phone') {
        user.phone = inputValue;
        ProfileService.updateUser('phone', inputValue);

      }
      else if (column == 'address') {
        user.address = inputValue;
        ProfileService.updateUser('address', inputValue);

      }
      else if (column == 'email') {
        user.email = inputValue;
        ProfileService.updateUser('email', inputValue);

      }
      this.setState({ user });
    }
    else if (!res.success) {
      RNToasty.Error({ title: `Error - ${res.msg}` });

    }
    else {
      RNToasty.Error({ title: `Error updating ${inputTitle}`, duration: RNToasty.Duration.Long });

    }

  }
  dismissModal = () => {
    let showAddAccountModal, showInputModal, showLocationModal = false;
    this.setState({ showAddAccountModal, showInputModal, showLocationModal });
  }
  
  changeLocation = async () => {
    //clear all errors
    this.setState({ errors: {} });
    let { state, city, errors, user } = this.state;
    const originalLocation = Object.assign({}, { state: state, city: city });
    let selectError = false;
    if (state == null) {
      errors.stateError = 'Please select a state';
      this.setState({ errors });
      selectError = true;
    }
    if (city == null) {
      errors.cityError = 'Please select a city';
      this.setState({ errors });
      selectError = true;
    }

    if (selectError) return;

    //hide modal
    this.setState({ showLocationModal: false });

    this.setState({ user: { ...user, state, city } });
    const req = await ProfileService.changeLocation(state, city);
    const res = req.data;

    if (typeof res == 'undefined') {
      RNToasty.Error({ title: `Network Error. Check your internet connection and try again` });
      //revert back
      this.setState({ state: originalLocation.state, city: originalLocation.city });
    }

    else if (res.success) {
      RNToasty.Success({ title: `Location changed successfully` });
      await ProfileService.updateUser('state', state);
      ProfileService.updateUser('city', city);
    }
    else if (!res.success) {
      RNToasty.Error({ title: res.msg });
    }


  }

  addAccount = async () => {
    let { accountNumberInput, accountTypeInput, bankIdInput  } = this.state;
    let errors = {};
    this.setState({errors});

    let formValid = true;

    if (!accountNumberInput) {
      errors.accountNumberError = "Please input account number";
      formValid = false;
    }
    if (!accountTypeInput) {
      errors.accountTypeError = "Please select account type";
      formValid = false;
    }
    if (!bankIdInput) {
      errors.bankNameError = "Please select bank";
      formValid = false;
    }

    await this.setState({errors});
      
      if (formValid) {
        await this.setState({ showAddAccountModal: false});
        RNToasty.Info({ title: 'Adding bank account, please wait' });
        const req = await BankService.addAccount( accountNumberInput, accountTypeInput, bankIdInput);
        const res = req.data;
        if (res.success) {
          this.setState({bankAccounts: res.bank_accounts});
        RNToasty.Success({ title: 'Bank Added Successfully' });

        }
        else if (!res.success) {
          RNToasty.Error({ title: res.msg });
        }
      }
  }

  deleteBankAccount = async (index) => {

    let { bankAccounts } = this.state;
    const theBankAccount = bankAccounts[index];
    RNToasty.Info({ title: 'Removing Bank Account' });
    
    const req = await BankService.deleteAccount(theBankAccount.id);
    const res = req.data;
    if (res.success) {
        bankAccounts.splice(index,1);
        this.setState({bankAccounts});
        RNToasty.Success({ title: 'Bank account removed successfully' });
    }
    else if (!res.success) {
      RNToasty.Error({ title: res.msg });

    }

  }

  renderProfileItem(name, value, icon) {
    return (

      <View style={styles.profileItem}>
        <Icon name={icon} size={20} style={{ marginEnd: 10, width: 30 }} />
        <Text style={{ fontWeight: 'bold' }}>{name}</Text>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ color: 'gray' }}>{value}</Text>
        </View>

      </View>
    );
  }
  renderHeader() {
    return (
        <View style={[R.pallete.headerStyle, {backgroundColor: R.colors.appPrimary, marginBottom: -10}]}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Icon name={'arrow-left'} size={20} color={'#fff'}  />
            </TouchableOpacity>

            <Text style={[R.pallete.headerText, {color: 'white'}]}>Cash-HUB</Text>

        </View>
    );
}

  render() {
    const { banks, errors, showAddAccountModal, showInputModal, showLocationModal, inputTitle, inputValue, updatingProfilePic } = this.state;
    const accountTypes = [{id: 1, name: 'Savings'}, {id: 1, name: 'Credit'}];

    let { citiesInState, user, bankAccounts } = this.state;
    console.log(R.constants.FILE_SERVER);

    if (!user) return null;//if state not yet ready
    return (

      <View style={styles.container}>
              {this.renderHeader()}

        <ScrollView>
          <View style={styles.header}>
            <View style={{ height: 100, backgroundColor: R.colors.appPrimary }}>
            </View>
            <TouchableOpacity onPress={() => this.launchImagePicker()}>
              <Image source={{uri:`${R.constants.FILE_SERVER}${user.photo}`}} style={[R.pallete.avatar, styles.photo]} />
            </TouchableOpacity>

            {updatingProfilePic ? <Loading text="Updating picture" />: null}

            <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 19 }}>{user.full_name}</Text>
              <TouchableOpacity style={{ marginStart: 30, marginTop: 5 }}
                onPress={() => this.setState({ inputTitle: "FULL NAME", column: 'full_name', inputValue: user.full_name, showInputModal: true })}>
                <Icon name={'pencil-alt'} size={15} color={'black'} />
              </TouchableOpacity>
            </View>

            


            <View style={{ margin: 10, marginTop: 35 }}>
              <Text style={{ color: 'gray', fontSize: 12 }}>PERSONAL</Text>

              <TouchableOpacity onPress={() => this.setState({ inputTitle: "Phone Number", column: 'phone', inputValue: user.phone, showInputModal: true })}>
                {this.renderProfileItem("Mobile", user.phone, "mobile-alt", 0)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ inputTitle: "Email", column: 'email', inputValue: user.email, showInputModal: true })}>

                {this.renderProfileItem("Email", user.email, "envelope", 1)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ showLocationModal: true })}>
                {this.renderProfileItem("Location", `${user.city}, ${user.state}`, "map-marker", 2)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ inputTitle: "Address", column: 'address', inputValue: user.address, showInputModal: true })}>
                {this.renderProfileItem("Address", user.address, "home", 2)}
              </TouchableOpacity>
            </View>

            {user.type_id == 1 && 
            <View style={{ margin: 10, marginTop: 4 }}>
              <Text style={{ color: 'gray', fontSize: 12 }}>Institution Information</Text>
              <TouchableOpacity onPress={() => this.setState({ inputTitle: "Institution Name", column: 'institution_name', inputValue: user.institution_name, showInputModal: true })}>
                {this.renderProfileItem("Institution Name", user.institution_name, "mobile-alt", 3)}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({ inputTitle: "Institution Location", column: 'institution_state', inputValue: user.institution_state, showInputModal: true })}>
                {this.renderProfileItem("Institution Location", user.institution_state, "mobile-alt", 3)}
              </TouchableOpacity>
            </View>}

            <View style={{ margin: 10, marginTop: 4 }}>
              <Text style={{ color: 'gray', fontSize: 12 }}>Bank Information</Text>
              <TouchableOpacity onPress={() => this.setState({ inputTitle: "BVN", column: 'bvn', inputValue: user.bvn, showInputModal: true })}>
                {this.renderProfileItem("BVN", user.bvn, "fingerprint", 3)}
              </TouchableOpacity>
            </View>

            <View style={{ margin: 10, marginTop: 4 }}>
              <Text style={{ color: 'gray', fontSize: 12 }}>Bank Accounts</Text>
              {bankAccounts && 
              <View>
                {bankAccounts.map((bankAccount, index) => {
                  return (
                    <>
                    <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                        <TouchableOpacity style={styles.removeEditStyle} onPress={() => this.deleteBankAccount(index)}>
                          <Text>Remove</Text>
                        </TouchableOpacity>
                     
                    </View>
                  <TouchableOpacity >
                  {this.renderProfileItem(bankAccount.name, `${bankAccount.account_number}/${bankAccount.type}`, "university", 3)}
                  </TouchableOpacity>
                </>
                  )
                })}
                <TouchableOpacity style={styles.addAccountStyle} onPress={() => this.setState({showAddAccountModal: true, errors:{}})}>
                  <Icon name={'plus-circle'} size={20} style={{ marginEnd: 10, width: 30 }} />
                  <Text style={styles.addAccountText}>Add Account</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 25, marginBottom: 20}} onPress={this.signOut}>
                    <Text style={{textAlign: 'center', color: '#000', fontWeight: 'bold'}}>Sign Out</Text>
                </TouchableOpacity>
              </View>
              }
              
            </View>
          </View>
        </ScrollView>

        {/* SHOW MODALS*/}
        {/* ADD Bank Account MODAL*/}

        <Modal isVisible={showAddAccountModal} onBackButtonPress={this.dismissModal} onBackdropPress={this.dismissModal}>
              <View style={R.pallete.inputModal}>
        
              <TextField
                    label='Account Number'
                    error={errors.accountNumberError}
                    ref={this.accountNumberRef}
                    keyboardType='number-pad'
                    onChangeText={(accountNumberInput) => {
                        this.setState({ accountNumberInput });
                    }}
                    
                   {...R.pallete.textFieldStyle}
                />  
                   <ISMaterialPicker 
                  items={accountTypes} 
                  label="Select account type"
                  errorText={this.state.errors.accountTypeError}
                  onValueChange={(accountType, index_) => {
                   if (index_ === 0) return ;
                    this.setState({accountTypeInput:accountType})
  
                  }}
                  />
                  <ISMaterialPicker 
                  items={banks} 
                  label="Select Bank"
                  errorText={this.state.errors.bankNameError}
                  onValueChange={(bank, index) => {
                    if (index === 0) return;
                    this.setState({bankIdInput: banks[index - 1].id})
  
                  }}
                  />
                  <TouchableOpacity style={{flexDirection: 'row',justifyContent:"center"}} onPress={() => this.addAccount()}>
                  <Text>Add </Text>
                  </TouchableOpacity>
              </View>
        </Modal>

        {/* INPUT MODAL*/}
        <Modal isVisible={showInputModal} onBackButtonPress={this.dismissModal} onBackdropPress={this.dismissModal}>
          <View style={R.pallete.inputModal}>
            <TextField
              label={inputTitle}
              error={this.state.errors.inputValueError}
              ref={this.inputRef}
              onChangeText={(inputValue) => {
                this.setState({ inputValue });
              }}
              value={inputValue}
              multiline={true}

              {...R.pallete.textFieldStyle}
            />
            <Button onPress={this.simpleUpdate}>Update</Button>

          </View>
        </Modal>


        {/* CHANGE LOCATION MODAL*/}
        <Modal isVisible={showLocationModal} onBackButtonPress={this.dismissModal} onBackdropPress={this.dismissModal}>
          <View style={R.pallete.inputModal}>
            <Text>Change Location</Text>
            <ISMaterialPicker
              items={states}
              label="Select state"
              selectedItem={user.state}
              errorText={this.state.errors.stateError}
              onValueChange={async (state, index) => {
                if (index === 0) return this.setState({ state: null });
                citiesInState = states[index - 1].locals;
                await this.setState({ state, citiesInState })


              }}
            />

            <ISMaterialPicker
              items={citiesInState}
              label="city"
              selectedItem={user.city}
              errorText={this.state.errors.cityError}
              onValueChange={async (city, index) => {
                if (index === 0) return this.setState({ city: null });

                await this.setState({ city })


              }}
            />
            <Button onPress={this.changeLocation}>Update</Button>

          </View>
        </Modal>

      </View>

    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  photo: {
    alignSelf: "center",
    marginRight: 15,
    width: 110,
    height: 110,
    marginTop: -50,
    borderWidth: 3,
    borderColor: '#fff'
  },
 
  profileItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8
  },
  inputModal: {
    backgroundColor: '#fff',
   
    padding: 20,
  },
  removeEditStyle: {
    marginEnd: 8,
  },
  addAccountStyle : {
    flexDirection: 'row',
    alignSelf: "flex-end",
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 2,
    padding: 5,
  }

});

