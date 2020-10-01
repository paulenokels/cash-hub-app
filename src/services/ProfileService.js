
import BaseService from 'services/BaseService';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


class ProfileService extends BaseService{
    
    constructor() {
        super();
    }

    async simpleUpdate(column, value) {
        const data = {
            column : column,
            value : value
        }
  
        try {
           return await axios.post('/user/profile/update', data);
        }
        catch (err) {
            return err;

        }
    }
    async updateUser(key, value) {
        let user = await AsyncStorage.getItem('@user');
        user = JSON.parse(user);
        user[key] = value;
        AsyncStorage.setItem('@user', JSON.stringify(user));
    }

    async removeBankAccount(bankId) {

       
     
        try {
           return await axios.delete(`/user/bank/remove?bank_id=${bankId}`);
        }
        catch (err) {
            return err;

        }
    }

    async addBank(accountNumber, bankId) {

       const data = {
           account_number: accountNumber,
           bank_id: bankId
       }
     
        try {
           return await axios.post(`/user/bank/add`, data);
        }
        catch (err) {
            return err;

        }
    }

    async changeLocation(state,city) {

        const data = {
            state: state,
            city: city
        }
      
         try {
            return await axios.post(`/user/profile/location/change`, data);
         }
         catch (err) {
             return err;
 
         }
     }

     async changeProfilePicture(uri) {

        let formData = new FormData();
      

            formData.append('dp', {
                uri: uri,
                name: 'dp.jpg',
                type: 'image/jpg'
            });
        


        try {
            return await axios.post('/user/profile/picture/change', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        }
        catch (err) {
            return err;

        }
     }
 


   

    
}

export default new ProfileService();