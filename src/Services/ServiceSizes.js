import axios from 'axios';

const SIZES_BASE_REST_API_URL = "http://localhost:8080/sizes"

class SizesService {

    getSizesForProduct(id) {
        return axios.get(SIZES_BASE_REST_API_URL + '/' + id)
    }

    getAllNames() {
        return axios.get(SIZES_BASE_REST_API_URL + '/names')
    }

    checkQuantity(ids, sizes) {
        let arrayIds = ids.toString()
        let arraySizes = sizes.toString()
        return axios.get(SIZES_BASE_REST_API_URL + '/check', {
            params: {
                ids: arrayIds,
                sizesNames: arraySizes,
            }
        })
    }

    checkItemQuantity(product) {
        return axios.post(SIZES_BASE_REST_API_URL + '/quantity', product)
    }

}

export default new SizesService();