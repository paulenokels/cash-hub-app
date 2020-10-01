
import BaseService from 'services/BaseService';
import axios from 'axios';

class AppService extends BaseService{
    
    constructor() {
        super();
    }

    async getBanks() {
  
        try {
           return await axios.get('/app/banks');
        }
        catch (err) {
            return err;

        }
    }

   

    
}

export default new AppService();