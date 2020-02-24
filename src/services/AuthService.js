
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
           return await axios.post('/admin/login', data);
        }
        catch (err) {
            return err;

        }
    }
}

export default new AuthService();