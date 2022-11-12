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

    getProducers() {
        return axios.get(PRODUCTS_BASE_REST_API_URL + '/producers');
    }

    deleteProducts(id) {
        return axios.delete(PRODUCTS_BASE_REST_API_URL + '/' + id)
    }

    updateProducts(product) {
        return axios.put(PRODUCTS_BASE_REST_API_URL + '/' + product.id, product);
    }

    getCategories() {
        return axios.get()
    }

    getRecommended() {
        return axios.get(PRODUCTS_BASE_REST_API_URL + '/recommended')
    }

    getFilteredData(brand, size, categories, min, max, page) {
        let arrayBrands = brand.toString()
        let arraySizes = size.toString()
        let arrayCategories = categories.toString()
        return axios.get(PRODUCTS_BASE_REST_API_URL + '/filter' + '?pageNo=' + page, {
            params: {
                brands: arrayBrands,
                sizes: arraySizes,
                categories: arrayCategories,
                minPrice: min,
                maxPrice: max,
            }
        })
    }
}

export default new ProductsService();