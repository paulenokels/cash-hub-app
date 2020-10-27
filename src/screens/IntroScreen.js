import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import R from 'res/R'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';



const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
 
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 65,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

const slides = [
  {
    key: 'wel',
    title: 'Welcome to cash-HUB',
    text: 'The student loan App.',
    image: R.images.logo_2,
    colors: [R.colors.appPrimary, '#fff'],
  },
  {
    key: 'speed',
    title: 'Instant Loan',
    text: 'Get your loan approved within 24 hours if you are eligbile',
    icon: 'rocket',
    colors: ['#056e4e', '#193d25'],
  },
  {
    key: 'cert',
    title: 'Pay Bills and Utilities',
    text: 'Purchase data, airtime, pay for utilities, bills and more',
    icon: 'file-invoice',
    colors: ['#29ABE2', '#4F00BC'],
  },
  {
    key: 'fastpay',
    title: 'Access large sums',
    text: 'Get access to large sums using cash-HUB loan code',
    icon: 'qrcode',
    colors: ['#6e0539', '#3b193d'],
  },
];

export default class IntroScreen extends React.Component {
  static navigationOptions = {
    header: null,

  };
  
  constructor(props) {
    super(props);
    this.state = {
      showIntro: false,
    }
   
  }
  

 

  _onDone = async () =>{
    await AsyncStorage.setItem('@introShown', 'true');
    this.props.navigation.navigate('HomeScreen');
    
  }

  
  _renderItem = ({ item, dimensions }) => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          width: item.width,
          height: item.height, 
        },
      ]}
      colors={item.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
       <Text style={styles.title}>{item.title}</Text>
       { item.image != null ? 
       <Image source={item.image} style={styles.image}/>
       :
       <Icon
        style={{ backgroundColor: 'transparent' }}
        name={item.icon}
        size={200}
        color="white"
      />
       }
      
     
       
        <Text style={styles.text}>{item.text}</Text>
    </LinearGradient>
  );

  render() {
      return <AppIntroSlider data={slides} renderItem={this._renderItem} doneLabel="Continue" showSkipButton={false} onDone={this._onDone} bottomButton />;

    
  }
}