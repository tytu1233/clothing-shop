import axios from 'axios';

const ORDERS_BASE_REST_API_URL = "http://localhost:8080/orders"
const ORDERSPRODUCT = "http://localhost:8080/ordersproduct"

class OrdersService {

    createOrder(user_id) {
        //console.log(page)
        return axios.post(ORDERS_BASE_REST_API_URL + '/' + user_id);
    }

    createOrdersProduct(orderId, product) {
        return axios.post(ORDERSPRODUCT + '/' + orderId, product);
    }

}

export default new OrdersService();