
import BaseService from 'services/BaseService';
import axios from 'axios';

class AuthService extends BaseService{
    
    constructor() {
        super();
    }

    async doLogin(email, password) {
        const data = {
            email: email,
            password: password
        }
          
        try {
           return await axios.post('user/login', data);
        }
        catch (err) {
            return err;

        }
    }

    async registerUser(newUserObj) {
        console.log(newUserObj.photo.uri);
        const formData = new FormData();
        formData.append('first_name', newUserObj.first_name);
        formData.append('last_name', newUserObj.last_name);
        formData.append('other_name', newUserObj.other_name);
        formData.append('email', newUserObj.email);
        formData.append('phone', newUserObj.phone);
        formData.append('password', newUserObj.password);
        formData.append('date_of_birth', newUserObj.date_of_birth);
        formData.append('state', newUserObj.state);
        formData.append('city', newUserObj.city);
        formData.append('address', newUserObj.address);
        formData.append('user_type', newUserObj.type_id);
        formData.append('insitution_name', newUserObj.institution_name);
        formData.append('institution_state', newUserObj.institution_state);
        formData.append('bvn', newUserObj.bvn);
        formData.append('bank_accounts', JSON.stringify(newUserObj.bank_accounts));
        
        console.log(newUserObj.photo.uri);

        formData.append('selfie', {
            uri: newUserObj.photo.uri,
            name: 'image',
            type: newUserObj.photo.type,
            width: newUserObj.photo.width,
            height: newUserObj.photo.height,
            size: newUserObj.photo.fileSize,
            
        });

      
          
        try {
           return await axios.post('/user/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
           });
        }
        catch (err) {
            return err;

        }
    }

    async checkEmailAndPhoneNumber(email, phoneNumber) {
        const data = {
            email: email,
            phone: phoneNumber
        }
          
        try {
           return await axios.post('/app/auth/check-email-and-phone', data);
        }
        catch (err) {
            return err;

        }
    }

    

    
}

export default new AuthService();