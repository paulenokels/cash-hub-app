import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';


import AsyncStorage from '@react-native-community/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from 'library/components/Loading'
import ISCameraRollPicker from 'library/components/ISCameraRollPicker';

import ISMaterialPicker from 'library/components/ISMaterialPicker';
import { TextField } from 'react-native-material-textfield';


import R from 'res/R'
import DocumentService from 'services/DocumentService';


class UploadDocScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingText: 'Please wait...',
            documentNumber: '',
            documentTypes: null,
            documentId:null,
            document: null,
            errors: {},
            uploaded: false,
        };



    }

    componentDidMount() {
        console.log("getting documents");
        this.getDocuments();

        if (R.constants.DEV) {
            this.setState({documentNumber: '1293284849', documentId: 8});
        }
    }
    getDocuments = async () => {
        const req = await DocumentService.getDocuments();
        const res = req.data;
        //console.log(res);
        if (res.success) {
            console.log("success");
            const documentTypes = res.documents.map((document) => {
                document.name = document.document_name;
                return document;
            })
            // console.log(documentTypes)
            this.setState({ loading: false, documentTypes });

        }
        else {
            console.log("error");
        }
    }

    uploadDocument = async () => {
        const formValid = await this.validateForm();
       
        if (formValid) {
            const { documentNumber, documentId, document } = this.state;
            //console.log(document[0].node.image.uri);
            this.setState({loadingText: 'Uploading document please wait', loading: true});
          
            const req = await DocumentService.uploadDocument(documentId, documentNumber, document[0].node.image);
            const res = req.data;

            this.setState({loading: false});
            console.log(res);

            if (res.success) {

                this.setState({errors:{}, documentNumber: null, documentId: null, document:null, uploaded: true});

            }
            else if (!res.success) {
                const errors = { 
                    uploadError : res.msg
                }

                this.setState({errors});
            }

          
        }
    }

    validateForm = async () => {
        let formValid = true;
        let errors = {};
        this.setState({errors, uploaded: false});

        const { documentNumber, documentId, document } = this.state;

        if (!documentNumber) {
            formValid = false;
            errors.documentNumberError = "Please input number on document, this could be ID card number, school reg number, NIN, TIN, VIN, Passport number, etc.";
        }
        if (!documentId) {
            formValid = false;
            errors.documentTypeError = "Please select type of document from the dropdown.";
        }
        if (!document) {
            formValid = false;
            errors.documentFileError = "Please select your document from gallery below.";
        }
        


        this.setState({errors});

        return formValid;

    }



    render() {
        const { errors, loading, loadingText, documentTypes, uploaded } = this.state;

        return (
            <View style={styles.container}>

                {loading ? <Loading text={loadingText} /> :

                    <ScrollView style={{padding: 10}}>

                        { uploaded && 
                        <View style={styles.successModal}>
                            <Text style={styles.successText}> Your document has been uploaded successfully and is pending verification</Text>
                        </View> }

                        {errors.uploadError && <Text style={[R.pallete.errorText, {textAlign: "center", margin: 10}]}>{errors.uploadError}</Text>}


                        <ISMaterialPicker
                            items={documentTypes}
                            label="Select Type of Document"
                            errorText={errors.documentTypeError}
                            onValueChange={async (docType, index) => {
                                console.log(index);
                                if (index === 0) return this.setState({ documentId: null });
                                console.log(documentTypes[index - 1]);
                                await this.setState({ documentId : documentTypes[index - 1].id })

                            }}
                        />
                        <TextField
                            label='Number on Document'
                            error={errors.documentNumberError}
                            keyboardType="default"
                            ref={this.docNumRef}
                            onChangeText={(documentNumber) => {
                                this.setState({ documentNumber });
                            }}

                            {...R.pallete.textFieldStyle}
                        />
                        {errors.documentFileError && <Text style={[R.pallete.errorText, {textAlign: "center", margin: 10}]}>{errors.documentFileError}</Text>}

                        <ISCameraRollPicker height={400} multipleSelect={false} onImageSelected={(document) => this.setState({document})} />




                    </ScrollView>
                }

                {!loading && 
                <TouchableOpacity
                    style={R.pallete.proceedBtn}
                    activeOpacity={.5}
                    onPress={this.uploadDocument}
                >

                    <Text style={R.pallete.proceedBtnText}> Upload </Text>

                </TouchableOpacity>
    }

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },


    selectButtonStyle: {

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
    image: {
        flex: 1,
        height: 400,
        width: 400,
        resizeMode: 'cover',
        marginTop: 8,

    },
    successModal: {
        padding: 15,
        backgroundColor: 'green'
    },
    successText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    }



})






export default UploadDocScreen;




