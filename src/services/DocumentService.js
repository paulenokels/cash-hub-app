
import BaseService from 'services/BaseService';
import axios from 'axios';

class DocumentService extends BaseService{
    
    constructor() {
        super();
    }

    async getUserDocuments() {
  
        try {
           return await axios.get('/user/documents');
        }
        catch (err) {
            return err;

        }
    }
    async getDocuments() {
  
        try {
           return await axios.get('/app/documents');
        }
        catch (err) {
            return err;

        }
    }

    async uploadDocument(docTypeId, docunmentNumber, file) {
        const formData = new FormData();
        formData.append('document_id', docTypeId);
        formData.append('document_number', docunmentNumber);

        formData.append('file', {
            uri: file.uri,
            name: 'file.jpg',
            type: 'image/jpeg'
        });

        console.log(file.uri);
  
        try {
           return await axios.post('/user/document', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
           });
        }
        catch (err) {
            return err;

        }
    }

   

    
}

export default new DocumentService();