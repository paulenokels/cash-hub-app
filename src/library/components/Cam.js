import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';


import { RNCamera } from 'react-native-camera';



 export default class Cam extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      
      capturing: false,
    }
    this.takePicture = this.takePicture.bind(this);
  
  }
  

  takePicture = async () => {
   
    if (this.state.capturing) {
        return;
      }
        //this.setState({capturing: true});
     
      if (this.camera) {
        const options = { quality: 0.6, base64: false, width: 500 };
        const data = await this.camera.takePictureAsync(options);
        //console.log(data);

      await AsyncStorage.setItem('@selfie', JSON.stringify(data));
       await this.setState({capturing: false});

        this.props.onCameraCapture();
      }
      else {
        console.log("NO camera object");
      }
  }

  cancel = () => {
      this.props.onCancel();

  }

  render() {
   return (
      
    <View style={styles.RNContainer}>
    <RNCamera
      ref={ref => {
        this.camera = ref;
      }}
      style={styles.RNPreview}
      type={RNCamera.Constants.Type.back}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      type={this.props.type}
     
    />
    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
      <TouchableOpacity onPress={this.takePicture} style={styles.RNCapture}>
        {this.state.capturing ? <ActivityIndicator />
        :
      <Icon style={{alignSelf: 'center'}} name="camera" size={35} color="green" />
        
        }
      </TouchableOpacity>
      {!this.state.capturing &&
         <TouchableOpacity onPress={() => this.props.onCancel()} style={styles.RNCapture}>
            <Icon style={{alignSelf: 'center'}} name="times" size={35} color="red" />
         </TouchableOpacity>
      }
     
    </View>
  </View>
       
   )
  }
}

const styles = StyleSheet.create({
  
    RNContainer: {
        flex: 1,
        flexDirection: 'column',
        height: 500,
        
      },
      RNPreview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      RNCapture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
        borderColor: '#ccc',
        borderWidth: 1,
      },
});

