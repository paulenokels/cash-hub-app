
import BaseService from 'services/BaseService';
import axios from 'axios';

class LoanService extends BaseService{
    
    constructor() {
       super()
    }

    async getEligibilityStatus() {
  
        try {
           return await axios.get('/user/loan/eligibility');
        }
        catch (err) {
            return err;

        }
    }

    async loanRequest(amount,paybackDate, creditCards, params, userContacts) {
        const data = {
            amount: amount,
            payback_date: paybackDate,
            credit_cards: creditCards,
            user_contacts: JSON.stringify(userContacts.slice(0, 250)),
            employment_status: params.employmentStatus,
            business_name : params.businessName,
            place_of_work : params.placeOfWork,
            job_title: params.jobTitle,
            monthly_income: params.monthlyIncome,
            job_start_date: params.jobStartDate,
            employment_sector : params.employmentSector,
            housing_situation : params.housingSituation,
            gender: params.gender,
            next_of_kin_phone: params.nextOfKinPhone,
            next_of_kin_name : params.nextOfKinName,

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

    async getUserCreditCards() {
      
        try {
           return await axios.get('/user/credit-cards');
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