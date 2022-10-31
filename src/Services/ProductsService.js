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

    getFilteredData(brand, price, page) {
        let arrayBrands = brand.toString()
        let arrayPrices = price.toString()
        return axios.get(PRODUCTS_BASE_REST_API_URL + '/filter' + '?pageNo=' + page, {
            params: {
                brands: arrayBrands,
                prices: arrayPrices,
            }
        })
    }
}

export default new ProductsService();