import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from 'library/components/Loading'
import { openSettings } from 'react-native-permissions';


import R from 'res/R'

import LoanService from 'services/LoanService';

import { formatCurrency } from 'library/utils/StringUtils'

import LoanApplicationForm from './LoanApplicationForm';
import Contacts from 'react-native-contacts';



class EligibilityStatusScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        report:null,
        showApplicationForm: false,
        contactsPermission: false,
        userContacts : [],
    };



  }

  componentDidMount() {
    this.getEligibiltyStatus();
    this.requestContactsPermission();
  }

  requestContactsPermission = async () => {
    console.log("Getting contacts permissions");
    const  status  = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      'title': 'Contacts',
      'message': 'This app would like to view your contacts.',
      'buttonPositive': 'Accept'
    });
    console.log(status);
    if (status === 'granted') {
      const contacts = await Contacts.getAll();
       console.log(contacts.length);
      await this.setState({contactsPermission:true});
      contacts.forEach(contact => {
        const contactName = `${contact.familyName} ${contact.givenName} ${contact.middleName}`;
        let contactNumber = 0;
        if (contact.phoneNumbers.length > 0) {
          contactNumber = (contact.phoneNumbers[0].number).replace(/\s/g, '');
        }

        if (contactNumber != 0) {
         this.state.userContacts.push({contactName, contactNumber});

        }

      });
      console.log(this.state.userContacts.length);
    

    }
    else {
      Alert.alert(
        "Permission Required",
        "cash-HUB needs access to your contacts in order to proceed. Go to your settings and allow cash-HUB app",
        [
          {
            text: "Ok",
            onPress: () => openSettings()
          },
          {
            text: "Cancel",
            onPress: () => this.props.navigation.goBack(null),
            style: "cancel",
          },
        ]
      );
    }

    
  }

  handelContinue = async() => {
    const { contactsPermission } = this.state;
    if (!contactsPermission) {
     this.requestContactsPermission();
      return;
    }

    this.setState({showApplicationForm: true});
  }

  getEligibiltyStatus = async () => {
    console.log('getting eligibility status');
    const req = await LoanService.getEligibilityStatus();
    const res = req.data;
    console.log(res);

    this.setState({loading:false});

    if (typeof res !== undefined) {
      this.setState({report: res});
    }

    
  }

  
  render() {
    const { loading, report, showApplicationForm, userContacts } = this.state;
    if (loading) {
      return <Loading text="Getting eligibility status please wait..." />
    }
    else if (showApplicationForm) {
        return <LoanApplicationForm report={report} params={this.props.route.params} navigation={this.props.navigation} userContacts={userContacts} />
    }
    return (
      <View style={styles.container}>
          <Text style={styles.titleText}>Loan Eligibility Report</Text>
      
        {report && 
          <>
          <View style={styles.reportWrapper}>

        <Text>Current Level: {report.level.name}</Text>
        <Text>Maximum Amount: {formatCurrency(report.level.max_amount)}</Text>

        <Text style={styles.cardTitle}>REQUIRED DOCUMENTS</Text>
        {report.level_documents.map((levelDocument, index) => {
          return (
            <View style={styles.levelDocument}>
              <Text>{levelDocument.name}</Text>
              {levelDocument.uploaded == false && 
              <View>
                <Text style={styles.errorText}>NOT UPLOADED</Text>
                <TouchableOpacity style={styles.uploadDocBtn} onPress={() => this.props.navigation.navigate('UploadDocScreen')}>
                  <Text style={styles.uploadText}>Upload Document</Text>
                </TouchableOpacity>
              </View>
              }
              {levelDocument.approved == false && <Text style={styles.errorText}>PENDING APPROVAL</Text>}
              {levelDocument.approved == true && <Text style={styles.approvedText}>APPROVED</Text>}
              {levelDocument.uploaded == true && <Text style={styles.approvedText}>UPLOADED</Text>}
              
              </View>
          )
        })} 

          </View>

          {report.eligible ?

          <TouchableOpacity style={styles.continueBtn} onPress={this.handelContinue}>
            <Text style={styles.uploadText}>Continue</Text>
          </TouchableOpacity>
          :
          <View>
            <Text style={styles.checkFail}>Eligibility check FAILED. {report.reason}</Text>
          </View>
          
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






export default EligibilityStatusScreen;




