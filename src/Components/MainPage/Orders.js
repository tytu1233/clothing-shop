import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import OrdersService from '../../Services/OrdersService'
import AuthenticationService from '../../Services/AuthenticationService';
import { UserContext } from '../../other/UserContext';
import { useNavigate } from "react-router-dom";


const Orders = () => {

    const {id} = useParams();
    const [ordersa, setOrders] = useState([]);
    const [productsa, setProducts] = useState([]);
    const navigate = useNavigate();
    
    const loadOrders = async () => {
        const res = await OrdersService.getOrdersForUser(id);
        setOrders(res.data)
        //console.log(res.data)
        const res2 = await OrdersService.getOrderProductsForOrder(id)
        setProducts(res2.data)
        console.log(res2.data)
    }


    const checkAuthorization = async () => {
        const res = await AuthenticationService.checkAuthenticationUser(JSON.parse(localStorage.getItem('token')));
        if(!(res.data.status === "pass")) {
            navigate("/");
            return;
        }        
        loadOrders()
    }


    useEffect(() => {
        checkAuthorization()
    }, [])

    return (
        <div className='container p-5'>
                    <div className="my-5">
                        <h3>Twoje zamówienia</h3>
                        <hr/>
                    </div>
            
                
                {ordersa.map((order) => {
                    return(
                        <div className="accordion m-2" id={`accordion${order.idOrders}`}>
                        <div className="accordion-item" key={order.idOrders}>
                            <h2 className="accordion-header" id={`headingOne${order.idOrders}`}>
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${order.idOrders}`}  aria-expanded="true" aria-controls={`collapseOne${order.idOrders}`} >
                                ID: {order.idOrders}, cena końcowa: {order.final_price}
                            </button>
                            </h2>
                            <div id={`collapseOne${order.idOrders}`} className="accordion-collapse collapse" aria-labelledby={`headingOne${order.idOrders}`} data-bs-parent={`accordion${order.idOrders}`}>
                            <div className="accordion-body">
                                    <div>
                                        <div className='row p-2'>
                                            <div className='col-3'>Zdjęcie</div>
                                            <div className='col-3'>Nazwa</div>
                                            <div className='col-2'>Cena</div>
                                            <div className='col-1'>Ilość</div>
                                            <div className='col-1'>Rozmiar</div>
                                            <div className='col-2'>Cena za zestaw</div>
                                        </div>
                                        <hr/>
                                    </div>
                                {productsa.map((product) => {
                                        return (
                                            <div key={product.id_orders_product}>
                                                {order.idOrders === product.orders.idOrders ? 
                                                    <div className='row p-2'>
                                                        <div className='col-3'>
                                                            <div className='row'>
                                                                <img src={require("../../img/product/product-1.jpg")}/>
                                                            </div>
                                                        </div>
                                                        <div className='col-3'>{product.products.name}</div>
                                                        <div className='col-2'>{product.products.price} zł</div>
                                                        <div className='col-1'>{product.quantity}</div>
                                                        <div className='col-1'>{product.size}</div>
                                                        <div className='col-2'>{product.products.price*product.quantity}</div>
                                                    </div>
                                                : null}
                                            </div>
                                        )   
                                    })
                                }
                            </div>
                            </div>
                        </div>
                        </div>
                    )}
                )}
                </div>
        
    )
}

export default Orders;