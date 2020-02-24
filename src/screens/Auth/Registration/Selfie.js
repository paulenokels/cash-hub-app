
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
  import Button from 'apsl-react-native-button'

  
  import R from 'res/R'

  import ImagePicker from 'react-native-image-picker';

  import {PERMISSIONS, request} from 'react-native-permissions';
  

export default class Selfie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selfie: R.images.selfie,
            
            
            errors: {
                
            }
        };
    }

    async componentDidMount() {
        this._checkCameraAndPhotosPermission();
    }

    handleContinue = () => {
        console.log("handle continue pressed");
        this.props.onContinue();
    }

   
    _checkCameraAndPhotosPermission = async () => {
        const cameraStatus = await request(PERMISSIONS.ANDROID.CAMERA);
        const contactsStatus = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        
        console.log(cameraStatus);
        console.log(contactsStatus);

       
    };

    openCamera = () => {
        console.log("Open camera tapped")
        ImagePicker.launchCamera({}, (response) => {
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

                console.log(source);

                this.setState({
                    selfie: source,
                });
            }
          });
      
    }



    render() {
        const { errors,selfie } = this.state;
        return(
            <>
                <ScrollView style={styles.container}>
                <Text style={[R.pallete.formTitle, styles.header]}>TAKE SELFIE</Text>

                <Image style={styles.image} source={selfie} />

                <TouchableOpacity
                            style={styles.openCamera}
                            activeOpacity={.5}
                            onPress={this.openCamera}
                        >

                            <Text style={styles.textStyle}> Open Camera </Text>

                        </TouchableOpacity>

              </ScrollView>
              <Button onPress={() => this.handleContinue()} style={{borderWidth: 0, backgroundColor: 'green'}} textStyle={{ color: 'white'}}>Continue</Button>

            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignSelf: 'center'
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 180, 
        height: 180,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 100,
    },
    openCamera: {

        marginTop: 20,
        marginBottom: 10,
        padding: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
    },

    textStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 11,
    },
})