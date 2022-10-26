import axios from 'axios';

const USERS_BASE_REST_API_URL = "http://localhost:8080/users"

class UsersService {

    getCategoriesByLoginAndEmail(login, email) {
        return axios.get(USERS_BASE_REST_API_URL + '/data/' + login + '/' + email);
    }

    getCategoriesByLoginAndPassword(login, password) {
        return axios.get(USERS_BASE_REST_API_URL + '/login/' + login + '/' + password);
    }

    getAllCategories() {
        return axios.get(USERS_BASE_REST_API_URL);
    }

    getForMainPageCategories() {
        return axios.get(USERS_BASE_REST_API_URL + '/main/' + 4);
    }

    getUserId(userId) {
        return axios.get(USERS_BASE_REST_API_URL + '/' + userId);
    }

    createUser(user) {
        return axios.post(USERS_BASE_REST_API_URL, user);
    }

    updateUser(userId, user) {
        return axios.put(USERS_BASE_REST_API_URL + '/' + userId, user);
    }

    deleteUser(userId) {
        return axios.delete(USERS_BASE_REST_API_URL + '/' + userId);
    }

}

export default new UsersService();