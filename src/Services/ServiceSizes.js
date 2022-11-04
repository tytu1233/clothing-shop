import axios from 'axios';

const SIZES_BASE_REST_API_URL = "http://localhost:8080/sizes"

class SizesService {

    getSizesForProduct(id) {
        return axios.get(SIZES_BASE_REST_API_URL + '/' + id)
    }

    getAllNames() {
        return axios.get(SIZES_BASE_REST_API_URL + '/names')
    }

}

export default new SizesService();