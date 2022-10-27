import axios from 'axios';

const CATEGORIES_BASE_REST_API_URL = "http://localhost:8080/categories"

class CategoriesService {

    getAllCategories() {
        return axios.get(CATEGORIES_BASE_REST_API_URL);
    }

    getForMainPageCategories() {
        return axios.get(CATEGORIES_BASE_REST_API_URL + '/main/' + 4);
    }

    getCategoryId(categoryId) {
        return axios.get(CATEGORIES_BASE_REST_API_URL + '/' + categoryId);
    }

    createCategory(category) {
        return axios.post(CATEGORIES_BASE_REST_API_URL, category);
    }

    updateCategory(categoryId, category) {
        return axios.put(CATEGORIES_BASE_REST_API_URL + '/' + categoryId, category);
    }

    deleteCategory(categoryId) {
        return axios.delete(CATEGORIES_BASE_REST_API_URL + '/' + categoryId);
    }

}

export default new CategoriesService();