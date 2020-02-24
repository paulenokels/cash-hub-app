import React, { Component} from 'react'
import {
    Text,
    View,
  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import AsyncStorage from '@react-native-community/async-storage';


export default class IconWithBadge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          badgeCount: 0,
        };
     
        
      }
    async componentDidMount() {
      /*
        const user = await AsyncStorage.getItem('@user');
        if (user != null) {
           const userId = JSON.parse(user).id;
         const req = await api.getUnreadNotifications(userId);
         const res = req.data;
         if (res.success) {
           const badgeCount = res.notifications.length;
           if (badgeCount > 0) {
               await AsyncStorage.setItem('@badgeCount', badgeCount.toString());
            this.setState({badgeCount});
           }
            
         }


         var timer = setInterval(()=>{
          AsyncStorage.getItem('@badgeCount').then((badgeCount)=> {
            if (badgeCount === '0') {
                this.setState({badgeCount});
                clearInterval(timer);
               }

          });
           
        },2000); 
        }



       
*/
        
       
       }

       clearBadge = () => {
           console.log('clearing badge');
           const badgeCount = 0;
           this.setState({badgeCount});
       }
    render() {
      const { name, color, size } = this.props;
      return (
        <View style={{ width: 24, height: 24, margin: 5 }} >
          <Ionicons name={name} size={size} color={color} />
          { this.state.badgeCount > 0 && (
            <View style={{
              // If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{this.state.badgeCount}</Text>
            </View>
          )}
        </View>
      );
    }
  }