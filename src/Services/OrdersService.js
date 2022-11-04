import axios from 'axios';

const ORDERS_BASE_REST_API_URL = "http://localhost:8080/orders"
const ORDERSPRODUCT = "http://localhost:8080/ordersproduct"

class OrdersService {

    createOrder(user_id) {
        //console.log(page)
        return axios.post(ORDERS_BASE_REST_API_URL + '/' + user_id);
    }

    createOrdersProduct(orderId, product) {
        console.log(product)
        return axios.post(ORDERSPRODUCT + '/' + orderId, product);
    }

    updateFinalPrice(orderID, order) {
        console.log(order)
        return axios.put(ORDERS_BASE_REST_API_URL + '/' + orderID + '/' + order, {
            headers: {
            'Content-Type': 'application/json',
            }
        });
    }

    getOrdersForUser(userId) {
        return axios.get(ORDERS_BASE_REST_API_URL + '/' + userId);
    }

    getOrderProductsForOrder(userId) {
        return axios.get(ORDERSPRODUCT + '/users/' + userId);
    }
}

export default new OrdersService();