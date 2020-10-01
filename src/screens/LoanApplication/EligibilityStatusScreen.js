import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from 'library/components/Loading'


import R from 'res/R'

import LoanService from 'services/LoanService';

import { formatCurrency } from 'library/utils/StringUtils'

import LoanApplicationForm from './LoanApplicationForm';


class EligibilityStatusScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        report:null,
        showApplicationForm: false,
    };



  }

  componentDidMount() {
    this.getEligibiltyStatus();
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
    const { loading, report, showApplicationForm } = this.state;
    if (loading) {
      return <Loading text="Getting eligibility status please wait..." />
    }
    else if (showApplicationForm) {
        return <LoanApplicationForm report={report} navigation={this.props.navigation} />
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
              {levelDocument.uploaded == false && <Text style={styles.errorText}>NOT UPLOADED</Text>}
              {levelDocument.approved == false && <Text style={styles.errorText}>PENDING APPROVAL</Text>}
              {levelDocument.approved == true && <Text style={styles.approvedText}>APPROVED</Text>}
              
              </View>
          )
        })} 

          </View>

          {report.eligible ?

          <TouchableOpacity style={styles.continueBtn} onPress={() => this.setState({showApplicationForm: true})}>
            <Text style={styles.uploadText}>Continue</Text>
          </TouchableOpacity>
          :
          <View>
            <Text style={styles.checkFail}>Eligibility check FAILED. Please upload the necessary documents. If you have uploaded the required documents, please wait a while for us to review and approve your provided document, note this may take up to 24 hours</Text>
            <TouchableOpacity style={styles.uploadDocBtn} onPress={() => this.props.navigation.navigate('UploadDocumentsScreen')}>
              <Text style={styles.uploadText}>Upload Document(s)</Text>
            </TouchableOpacity>
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




