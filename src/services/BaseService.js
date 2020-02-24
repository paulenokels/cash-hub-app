
import localStorage from 'local-storage';
import axios from 'axios';



const DEV = true;
const apiKey = "Adc9V3Lx1LQNtmp0kmbCouZrFPZY4QrQ9UtEoP8p7jVzaVutcxVZBOAviFYlXy2l";
class BaseService {

    constructor() {
        this.baseUrl = null;
        if (DEV) {
            this.baseUrl = "http://localhost:8000/api";
        }

        var token = "";
        const user = localStorage.get('user');
        

        if (user !== null){
             token = user.token.accessToken;
           }


        //set axios defaults
        axios.defaults.baseURL = this.baseUrl;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.defaults.headers.common['X-Authorization'] = apiKey;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        

    }

   

}

export default BaseService;