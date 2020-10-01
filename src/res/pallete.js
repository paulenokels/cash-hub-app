import { color } from 'react-native-reanimated';
import Colors from './colors';
const pallete = {
  heading:  {
    fontSize: 20,
    color: '#000',

  },
  text: {

  },

  errorText: {
    color: 'red',
    fontSize: 12
  },

  formTitle : {
      fontSize: 17,
      marginTop: 19,
      fontFamily: 'Segoe-UI-Bold',
  },

  formSubTitle: {
    fontSize: 17,
    marginTop: 19,
    fontFamily: 'Segoe-UI',
  },

  baseStyle: {
  },
  
  textFieldStyle: {
    baseColor: '#000',
    tintColor: '#000',
    textColor: '#000',
  },
  avatar: {
    width: 180, 
    height: 180,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 100,
},
appButton: {

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
inputModal: {
  backgroundColor: '#fff',
  padding: 20
},
card: {
  marginStart: -5,
  marginEnd: -5,
  borderColor: '#ccc',
  marginTop: 10,
  padding: 15,
  elevation: 4,
},
proceedBtn : {
  backgroundColor: Colors.appPrimary,
  borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20
},
proceedBtnText: {
  color: 'white',
  fontWeight: '800'
},
headerStyle: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  backgroundColor: 'white',
  flexDirection: 'row',
  padding: 20,
  paddingTop: 20,
  paddingBottom: 20,
  marginBottom: 10,

},
headerText: {
  fontSize: 16,
  color: 'black',
  textAlign: 'center',
  marginStart: 10,
},
}

export default pallete;
