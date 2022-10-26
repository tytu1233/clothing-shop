import axios from 'axios';

const CATEGORIES_BASE_REST_API_URL = "http://localhost:8080/categories"

class CategoriesService {

    getCategoriesByLoginAndEmail(login, email) {
        return axios.get(CATEGORIES_BASE_REST_API_URL + '/data/' + login + '/' + email);
    }

    getCategoriesByLoginAndPassword(login, password) {
        return axios.get(CATEGORIES_BASE_REST_API_URL + '/login/' + login + '/' + password);
    }

    getAllCategories() {
        return axios.get(CATEGORIES_BASE_REST_API_URL);
    }

    getForMainPageCategories() {
        return axios.get(CATEGORIES_BASE_REST_API_URL + '/main/' + 4);
    }

    getUserId(userId) {
        return axios.get(CATEGORIES_BASE_REST_API_URL + '/' + userId);
    }

    createUser(user) {
        return axios.post(CATEGORIES_BASE_REST_API_URL, user);
    }

    updateUser(userId, user) {
        return axios.put(CATEGORIES_BASE_REST_API_URL + '/' + userId, user);
    }

    deleteUser(userId) {
        return axios.delete(CATEGORIES_BASE_REST_API_URL + '/' + userId);
    }

}

export default new CategoriesService();