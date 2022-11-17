import axios from 'axios';

const CONTACT_BASE_REST_API_URL = "http://localhost:8080/"

class MailService {

    contactUs(values) {
        console.log(values)
        return axios.post(CONTACT_BASE_REST_API_URL + 'contact/', values);
    }

    newsletter(email) {
        console.log(email)
        return axios.get(CONTACT_BASE_REST_API_URL + 'sendNewsletter/' + email);
    }
}

export default new MailService();