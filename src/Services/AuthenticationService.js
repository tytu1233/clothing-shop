import axios from 'axios';

const AUTH_BASE_REST_API_URL = "http://localhost:8080/authentication"

class AuthenticationService {

    authenticateUser(user) {
        return axios.post(AUTH_BASE_REST_API_URL, user);
    }

    checkAuthenticationUser(token) {
        //console.log(token)
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

    logoutUser(user) {
        return axios.post(AUTH_BASE_REST_API_URL + '/logout', user);
    }

}

export default new AuthenticationService();