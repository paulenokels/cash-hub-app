
import BaseService from 'services/BaseService';
import axios from 'axios';

class BankService extends BaseService{
    
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

    async getUserBanks() {
  
        try {
           return await axios.get('/user/banks');
        }
        catch (err) {
            return err;

        }
    }

    async transfer(accountNumber, bankCode, amount) {
        const data = {
            account_number : accountNumber,
            bank_code: bankCode,
            amount: amount
        };
        try {
           return await axios.post('/user/bank/transfer', data);
        }
        catch (err) {
            return err;

        }
    }

    async addAccount(accountNumber, accountType, bankId) {
        const data = {
            account_number : accountNumber,
            account_type: accountType,
            bank_id: bankId
        };
        try {
           return await axios.post('/user/bank/account', data);
        }
        catch (err) {
            return err;

        }
    }
    async deleteAccount(bankAccountId) {
      
        try {
           return await axios.delete(`/user/bank/account?bank_account_id=${bankAccountId}`);
        }
        catch (err) {
            return err;

        }
    }


   

    
}

export default new BankService();