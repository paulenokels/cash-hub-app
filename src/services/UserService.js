
import BaseService from 'services/BaseService';
import axios from 'axios';

class UserService extends BaseService{
    
    constructor() {
        super();
    }

  

    async getUserLoans() {
      
        try {
           return await axios.get('/user/loans');
        }
        catch (err) {
            return err;

        }
    }
   
   
    
}

export default new UserService();