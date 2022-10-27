import axios from 'axios';

const AUTH_BASE_REST_API_URL = "http://localhost:8080/products"

class ProductsService {

    getAll(page) {
        console.log(page)
        return axios.get(AUTH_BASE_REST_API_URL + '?pageNo=' + page);
    }
}

export default new ProductsService();