import axios from 'axios';

const OPINIONS_BASE_REST_API_URL = "http://localhost:8080/opinions"

class OpinionsService {

    getAllForProduct(productId, page) {
        return axios.get(OPINIONS_BASE_REST_API_URL + '/product/' + productId + '?pageNo=' + page);
    }

    addOpinion(userIda, productIda, opinion) {
        console.log(userIda)
        return axios.post(OPINIONS_BASE_REST_API_URL, opinion, {
            params: {
                userId: userIda,
                productId: productIda,
            }
        })
    }

    getHighRated() {
        return axios.get(OPINIONS_BASE_REST_API_URL + '/rating')
    }
}

export default new OpinionsService();