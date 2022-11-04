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

    getFilteredData(brand, size, min, max, page) {
        let arrayBrands = brand.toString()
        let arraySizes = size.toString()
        return axios.get(PRODUCTS_BASE_REST_API_URL + '/filter' + '?pageNo=' + page, {
            params: {
                brands: arrayBrands,
                sizes: arraySizes,
                minPrice: min,
                maxPrice: max,
            }
        })
    }
}

export default new ProductsService();