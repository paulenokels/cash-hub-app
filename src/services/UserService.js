
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

    async getUserSummary() {
        //this is the first call to be made to the back end after registration, so we need to reinitialize 
        //axios and axios defaults
       await (new BaseService()).init();
        try {
           return await axios.get('/user/summary');
        }
        catch (err) {
            return err;

        }
    }
   
   
    
}

export default new UserService();