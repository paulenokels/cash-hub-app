import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  PermissionsAndroid, Platform 
} from 'react-native';

import CameraRoll from "@react-native-community/cameraroll";
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5';


/*
 * sample usage
 * <ISCameraRollPicker multipleSelect={false} height={400} onImageSelected={() => this.props.onImageSelected(selectedPhotos)} />
*/
 export default class ISCameraRollPicker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            pageInfo: null,
            loadingMore: false,
            selectedPhotos: [],
            
        }

        this.height = 200//default height
        if (typeof this.props.height !== 'undefined') this.height = this.props.height;

        this.init();
       

    

    }

    init = async() => {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
        this.getCameraRollPhotos(20);
          
        }
      
        else {
            const status = await PermissionsAndroid.request(permission);
            console.log(status)
            if(status === 'granted') {
                this.getCameraRollPhotos(20);
            }

        }
    }
    getCameraRollPhotos = async () => {

        let params = {
            first: 20,
            assetType: 'Photos',
            
          }


         //if we are loading more images
               if (this.state.photos.length > 0) {
                 params.after = this.state.pageInfo.end_cursor;

               }

            const photos = await CameraRoll.getPhotos(params);

               //if we are loading more images
               if (this.state.photos.length > 0) {
               this.setState({photos:  this.state.photos.concat(photos.edges), pageInfo: photos.page_info});

               }

               //loading for the first time
               else {
               this.setState({photos:  photos.edges, pageInfo: photos.page_info});

               }


     
       }

    

    onScroll = async ({layoutMeasurement, contentOffset, contentSize}) => {
        const { loadingMore } = this.state;
        const paddingToBottom = 30;
        const closeToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

        if (loadingMore) return;

        if (closeToBottom) {
            await this.setState({loadingMore: true});
            
            const { pageInfo } = this.state;

            if (pageInfo.has_next_page) {
                //get next 20 result
                let currentPageSize = this.state.currentPageSize + 20;
                this.setState({currentPageSize})
                this.getCameraRollPhotos();

            }

            await this.setState({loadingMore: false})

        }
        //console.log(e.nativeEvent.contentOffset.y);

    }
    
    render() {
        let { photos, selectedPhotos } = this.state;
        const { multipleSelect } = this.props;

        if (photos.length == 0) return null;
       
        return (
            <ScrollView style={{height: this.height}} 
            onScroll={(e) => this.onScroll(e.nativeEvent)}  
            scrollEventThrottle={400} >
            <View style={{flex:1, flexDirection:'row', flexWrap: "wrap",  justifyContent: "space-between"}}>
            {photos.map((photo,key) => {
                console.log(photo);
              return (
                <TouchableOpacity 
                    key={key} 
                    style={styles.imageSampleBox}
                    onPress={() => {
                        //single select
                        if (!multipleSelect) {
                            selectedPhotos = [photo];
                            this.setState({selectedPhotos});
                            
                        }
                        else if (selectedPhotos.includes(photo)) {
                            selectedPhotos.splice(key, 1);
                            this.setState({selectedPhotos});
                        }
                       else if (!selectedPhotos.includes(photo)) {
                            selectedPhotos.push(photo);
                            this.setState({selectedPhotos});
                        }

                        this.props.onImageSelected(selectedPhotos);
                    }}
                    >
                        {selectedPhotos.includes(photo) ? 
                        <Icon name={'check-circle'} size={20} color={'#000'} style={styles.checkIcon} />
                         : null}
                    
                
                  <Image source={{uri: photo.node.image.uri}} style={{height: 100, resizeMode: "contain"}}/>
                </TouchableOpacity>

              
              )
            } )}

      
          </View>
           <View style={styles.loadingContainer}><ActivityIndicator /></View>

          </ScrollView>
        );
    }
 }
 const styles = StyleSheet.create({
     loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
     },
    imageSampleBox: {
 
        padding: 5,
        width: 80,
        height: 100,
        marginBottom: 10,
        justifyContent: "center"
       
       
      },
      checkIcon: {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 10,
          color: '#fff',
          backgroundColor: 'green',
          padding: 3,
          borderRadius: 16,
      }
    
  });