
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
import AsyncStorage from '@react-native-community/async-storage';
import AuthService from 'services/AuthService';
import BaseService from 'services/BaseService';
import Loading from 'library/components/Loading'
import Cam from 'library/components/Cam'
  

export default class Selfie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selfie: R.images.selfie,
            loading: false,
            showCam: false,
            errors: {
                
            }
        };
    }

    async componentDidMount() {
        this._checkCameraAndPhotosPermission();
    }

    handleContinue = async () => {
        console.log("handle continue pressed");
        let errors = {};
        this.setState({errors});//clear all errors
        const { selfie } = this.state;
        if (selfie === R.images.selfie) {
            errors.error = 'Please take a picture of yourself';
            this.setState({errors});
            return;
        }

        let newUser = await AsyncStorage.getItem('@new_user');
        newUser = JSON.parse(newUser);
        newUser = {...newUser, photo: selfie};
        this.registerUser(newUser);
    }

    registerUser = async (newUser) => {
        this.setState({loading:true});
        const req = await AuthService.registerUser(newUser);
        //console.log(req);
        const res = req.data;

        //console.log(res);

       

    
        //successful reg
         if (res.success) {
            await AsyncStorage.setItem('@user', JSON.stringify(res.user));
            await AsyncStorage.removeItem('@new_user');
            this.setState({loading:false});
            console.log("Registration successfull");

            this.props.onContinue();

        }
        //reg error
        else {
            let errors = {};
            errors.error = res.msg;
            this.setState({errors, loading: false});
        }


    }

   
    _checkCameraAndPhotosPermission = async () => {
        const cameraStatus = await request(PERMISSIONS.ANDROID.CAMERA);
        const contactsStatus = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        
        // console.log(cameraStatus);
        // console.log(contactsStatus);

       
    };

    // openCamera = () => {
    //     console.log("Open camera tapped")
    //     ImagePicker.launchCamera({quality: 0.5, noData: true,}, (response) => {
    //         // Same code as in above section!
    //          // console.log('Response = ', response);

    //          if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else if (response.customButton) {
    //             console.log('User tapped custom button: ', response.customButton);
    //         } else {
    //             const source = { uri: response.uri, width: response.width, height: response.height, type: response.type, fileSize: response.fileSize, path: response.path };

    //             // You can also display the image using data:
    //            // const source = response.uri;

    //             //console.log(response);

    //             this.setState({
    //                 selfie: source,
    //             });
    //         }
    //       });
      
    // }


    onCameraCapture = async () => {
        let selfie = await AsyncStorage.getItem('@selfie');
        selfie = JSON.parse(selfie);
        await this.setState({selfie, showCam: false});
        
    }

    onCameraCancel = () => {
        this.setState({showCam:false});
    }



    render() {
        const { errors,selfie, loading, showCam } = this.state;

        if (loading) return <Loading text="Registering, please wait..." />

        else if (showCam) {
            return (
            <Cam type="front" onCancel={() => this.onCameraCancel()} onCameraCapture={() => this.onCameraCapture()} />
            )
        } 
        else return(  
            <>
                <ScrollView style={styles.container}>
                <Text style={[R.pallete.formTitle, styles.header]}>TAKE SELFIE</Text>
        {errors.error && <Text style={[R.pallete.errorText, {marginBottom: 10}]}>{errors.error}</Text>}

                <Image style={styles.image} source={selfie} />

                <TouchableOpacity
                            style={styles.openCamera}
                            activeOpacity={.5}
                            onPress={() => this.setState({showCam:true})}
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