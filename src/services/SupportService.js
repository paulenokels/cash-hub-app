
import BaseService from 'services/BaseService';
import axios from 'axios';


class SupportService extends BaseService{
    
    constructor() {
      super();
       
    }
    async sendMessage( message) {
        const data = {
      
            message: message
        }
       
      try {
        return await axios.post('/user/support',data);
         
      }
      catch (err) {
          return err;

      }
  }

  
}

export default new SupportService();