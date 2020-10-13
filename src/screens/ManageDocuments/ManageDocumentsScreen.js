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
import DocumentService from 'services/DocumentService';

import Icon from 'react-native-vector-icons/FontAwesome5';



import R from 'res/R'
import { color } from 'react-native-reanimated';


class ManageDocumentsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        documents: null,
    };



  }

  componentDidMount() {
    this.getUserDocuments();
  }

  getUserDocuments = async () => {
      const req = await DocumentService.getUserDocuments();
      const res = req.data;
      //console.log(res);
      this.setState({loading: false});
      if (res.success) {
          await this.setState({documents: res.documents});
          
      }
  }

  renderDocuments() {
    const { loading, documents } = this.state;
    if (loading) return null;
    if ( documents.length > 0) {
       return documents.map((document, index) => {
           console.log(R.constants.FILE_SERVER+document.file);
            return <View key={index}>
                      <TouchableOpacity style={R.pallete.card}>
                        <Text style={styles.titleText}>{document.name}</Text>

                        <Image style={styles.cardImage} source={{uri: R.constants.FILE_SERVER+document.file}}/>
                            <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
                            {document.status == 'APPROVED' && <Text style={styles.approvedText}>APPROVED</Text>}
                            {document.status == 'REJECTED' && <Text style={styles.errorText}>REJECTED</Text>}
                            {document.status == 'PENDING' && <Text style={styles.pendingText}>PENDING VERIFICATION</Text>}
                            <Text>{document.document_number}</Text>
                            </View>
                        
                        </TouchableOpacity>
                    </View>
        })

    }
    else {
        return (
        <View> 
            <Text  style={{textAlign: 'center', marginTop: 20}}>You have not uploaded any documents</Text>
        </View>
        )
    }
  }

  renderHeader() {
    return (
        <View style={R.pallete.headerStyle}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Icon name={'arrow-left'} size={20} color={'#000'}  />
            </TouchableOpacity>

            <Text style={R.pallete.headerText}>Manage Your Documents</Text>

        </View>
    );
}


  render() {
      const { loading, documents } = this.state;
    return (
      <View style={styles.container}>
          {this.renderHeader()}
          <View style={styles.uploadBtnWrapper}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('UploadDocScreen')} style={styles.uploadBtn}>
                <Text style={{color: 'white'}}>  <Icon name='address-card' size={15} color={'#fff'}  /> Upload Document </Text>
                </TouchableOpacity>
            </View>

           { loading && <Loading text= "Getting your documents..." />}
           { documents &&  this.renderDocuments()}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  titleText: {
    padding: 15,
    marginBottom: 0,
    fontSize: 18,
    color: 'white',
    backgroundColor: R.colors.appPrimary,
  },

  cardImage:{
    height: 150,
    width: null,
  },
  errorText : {
    color: 'red',
    fontWeight: '700',
  },
  approvedText: {
    color: 'green',
    fontWeight: '700',

  },
  pendingText: {
    color: 'orange',
    fontWeight: '700',

  },

  uploadBtnWrapper: {
   
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  uploadBtn: {
    backgroundColor: 'darkgreen',
    borderRadius: 10,
    padding: 10,
  }
 



})






export default ManageDocumentsScreen;




