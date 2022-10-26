import axios from 'axios';

const AUTH_BASE_REST_API_URL = "http://localhost:8080/authentication"

class AuthenticationService {

    getCategoriesByLoginAndEmail(login, email) {
        return axios.get(AUTH_BASE_REST_API_URL + '/data/' + login + '/' + email);
    }

    getCategoriesByLoginAndPassword(login, password) {
        return axios.get(AUTH_BASE_REST_API_URL + '/login/' + login + '/' + password);
    }

    getAllCategories() {
        return axios.get(AUTH_BASE_REST_API_URL);
    }

    getForMainPageCategories() {
        return axios.get(AUTH_BASE_REST_API_URL + '/main/' + 4);
    }

    getUserId(userId) {
        return axios.get(AUTH_BASE_REST_API_URL + '/' + userId);
    }

    authenticateUser(user) {
        return axios.post(AUTH_BASE_REST_API_URL, user);
    }

    checkAuthenticationUser(token) {
        console.log(token)
        return axios.get(AUTH_BASE_REST_API_URL, {
            validateStatus: function () {
                return true;
            },
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          });
    }
    updateUser(userId, user) {
        return axios.put(AUTH_BASE_REST_API_URL + '/' + userId, user);
    }

    deleteUser(userId) {
        return axios.delete(AUTH_BASE_REST_API_URL + '/' + userId);
    }

}

export default new AuthenticationService();