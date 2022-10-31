import axios from 'axios';

const PRODUCTS_BASE_REST_API_URL = "http://localhost:8080/products"

class ProductsService {

    getAll(page) {
        //console.log(page)
        return axios.get(PRODUCTS_BASE_REST_API_URL + '?pageNo=' + page);
    }

    getById(id) {
        return axios.get(PRODUCTS_BASE_REST_API_URL + '/' + id);
    }

    getFilteredData(e) {
        let arrayBrands = e.toString()
        return axios.get(PRODUCTS_BASE_REST_API_URL + '/filter', {
            params: {
                brands: arrayBrands,
            }
        })
    }
}

export default new ProductsService();