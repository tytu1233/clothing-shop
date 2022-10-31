import React, { useState, useEffect, useContext } from 'react'
import '../../styles/cart.css'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TfiPlus, TfiMinus } from "react-icons/tfi";
import { UserContext } from '../../other/UserContext';
import { useCart } from "react-use-cart";
import OrdersService from '../../Services/OrdersService';

const Cart = () => {

    const {
        isEmpty,
        totalUniqueItems,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
      } = useCart();

      const { user } = useContext(UserContext);
      const [orderId, setOrderId] = useState(0);

      if (isEmpty) return (
        <div className='container p-4'>
            <div className='d-flex justify-content-center'>
                <h1>Koszyk jest pusty!</h1>
            </div>
        </div>
      );

      const createOrder = () => {
        OrdersService.createOrder(user.user_id)
        .then((response) => {
            setOrderId(response.data)
            for(let i = 0; i<items.length; i++) {
                OrdersService.createOrdersProduct(response.data, items[i])
                .then((response) => {
                    console.log(response.data)
                })
            }
        })
      }
      console.log(items)
  return (
    <div>
    <div className="container p-4">
            <div className="row">
                <div className="col-lg-8">
                    <div className="shopping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Produkt</th>
                                    <th>Ilość</th>
                                    <th>Cena</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="product__cart__item">
                                        <div className="product__cart__item__pic">
                                        <img alt="product image" style={{width: '150px', height: '150px'}} src={require('../../img/product/product-1.jpg')}/>
                                        </div>
                                        <div className="product__cart__item__text">
                                            <h5>{item.name}</h5>
                                            <h6>{item.price} zł</h6>
                                        </div>
                                    </td>
                                    <td className="quantity__item">
                                        <div className="quantity">
                                            <div className="pro-qty-2">
                                                <TfiMinus onClick={() => updateItemQuantity(item.id, item.quantity - 1)}/>
                                                <span style={{margin: '5px'}}>{item.quantity}</span>
                                                <TfiPlus onClick={() => updateItemQuantity(item.id, item.quantity + 1)}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="cart__price">{item.itemTotal} zł</td>
                                    <td className="cart__close"><AiOutlineCloseCircle onClick={() => removeItem(item.id)}/></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="continue__btn">
                                <a href="/products">Kontynuuj zakupy</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="cart__discount">
                        <h6>Zniżka</h6>
                        <form action="#">
                            <input type="text" placeholder="Kod zniżkowy"/>
                            <button type="submit">Zatwierdź</button>
                        </form>
                    </div>
                    <div className="cart__total">
                        <h6>Podsumowanie koszyka</h6>
                        <ul>
                            <li>Koszt produktów <span>{cartTotal} zł</span></li>
                            <li>Cena końcowa <span>{cartTotal - (cartTotal*0.05)} zł</span></li>
                        </ul>
                        <a onClick={() => {createOrder()}} className="primary-btn">Złóż zamówienie</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart