
import BaseService from 'services/BaseService';
import axios from 'axios';

class LoanService extends BaseService{
    
    constructor() {
        super();
    }

    async getEligibilityStatus() {
  
        try {
           return await axios.get('/user/loan/eligibility');
        }
        catch (err) {
            return err;

        }
    }

    async loanRequest(amount,paybackDate) {
        const data = {
            amount: amount,
            payback_date: paybackDate,
        }
        try {
           return await axios.post('/user/loan/request', data);
        }
        catch (err) {
            return err;

        }
    }

    async getUserLoans() {
      
        try {
           return await axios.get('/user/loans');
        }
        catch (err) {
            return err;

        }
    }
   
    async payback(loanId) {
        const data = {
            loan_id : loanId
        };
      
        try {
           return await axios.post('/user/loan/payback', data);
        }
        catch (err) {
            return err;

        }
    }

    async validateCode(code) {
        const data = {
            code : code
        }
      
        try {
           return await axios.post('/user/loan/code/validate', data);
        }
        catch (err) {
            return err;

        }
    }

    async acceptLoanViaCode(code) {
        const data = {
            code : code
        }
      
        try {
           return await axios.post('/user/loan/code/accept', data);
        }
        catch (err) {
            return err;

        }
    }

    
}

export default new LoanService();