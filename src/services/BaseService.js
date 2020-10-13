
import axios from 'axios';

import constants from 'res/constants';

import AsyncStorage from '@react-native-community/async-storage';

const apiKey = "8WMgsvWT9j8E9cTPCx9uz7yI5AEzSHBRGHIJJaxo8WTWyTq1x10e7VMvt7n24VSA";
class BaseService {

    constructor() {
        this.init();
       
      
    }

    async init() {
        console.log("initializing base service");
        let token = ""; 
        let user = await AsyncStorage.getItem('@user');

        if (user){
             user = JSON.parse(user);
             
             token = user.token.accessToken;
           }


        //set axios defaults
        axios.defaults.baseURL = constants.BASE_URL;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['X-Authorization'] = apiKey;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        

    }

   

}

export default BaseService;