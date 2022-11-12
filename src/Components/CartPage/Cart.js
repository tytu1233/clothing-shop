import React, { useState, useEffect, useContext } from 'react'
import '../../styles/cart.css'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TfiPlus, TfiMinus } from "react-icons/tfi";
import { UserContext } from '../../other/UserContext';
import { useCart } from "react-use-cart";
import ServiceSizes from '../../Services/ServiceSizes';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const Cart = () => {

    const {
        isEmpty,
        emptyCart,
        items,
        cartTotal,
        updateItemQuantity,
        removeItem,
      } = useCart();

      const { user } = useContext(UserContext);
      const [finalPrice, setFinalPrice] = useState(cartTotal)
      const [sizesName, setSizesName] = useState([]) 
      const [ids, setIds] = useState([])
      const [sizes, setSizes] = useState([])
      const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        if(e.target.value === "5%")
            setFinalPrice(cartTotal - (cartTotal*0.05))
        else
            setFinalPrice(cartTotal)
    }

    const addProducts = async () => {
        items.forEach((item) => {
            sizesName.push(item.size)
            setSizesName([...sizesName]);
            ids.push(item.id)
            setIds([...ids])
        })

        const res = await ServiceSizes.checkQuantity(ids, sizesName)
        console.log(res.data)
        setSizes(res.data.map((value)=> {
            value.productsSizes = value.productsSizes.id + value.sizeName
            return value
         }))

        setLoading(true)
    }

    useEffect(() => {
        addProducts()
    }, [])
    
    if (isEmpty) return (
        <div className='container-fluid p-4 full-layout vh-100'>
            <div className='d-flex justify-content-center'>
                <h1>Koszyk jest pusty!</h1>
            </div>
        </div>
      );

      if(!loading) {
        return (<Loader/>)
      }
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
                                    <th><span style={{cursor: "pointer"}} onClick={() => {emptyCart()}}>Wyczyść koszyk</span></th>
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
                                            <h6>Rozmiar: {item.size}</h6>
                                            {sizes.map((size) => {
                                                    return (
                                                        <div>{size.productsSizes === item.id ? (<span>{(item.quantity > size.amount) ? <span style={{color: 'red'}}>Niedostępne</span> : <span style={{color: 'green'}}>Dostępne</span>}</span>) : null}</div>
                                                    )
                                                })}
                                        </div>
                                    </td>
                                    <td className="quantity__item">
                                        <div className="quantity">
                                            <div className="pro-qty-2">
                                                <TfiMinus onClick={() => updateItemQuantity(item.id, item.quantity-1)}/>
                                                <span style={{margin: '5px'}}>{item.quantity}</span>
                                                <TfiPlus onClick={() => updateItemQuantity(item.id, item.quantity+1)}/>
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
                            <input type="text" onChange={handleChange} placeholder="Kod zniżkowy"/>
                        </form>
                    </div>
                    <div className="cart__total">
                        <h6>Podsumowanie koszyka</h6>
                        <ul>
                            <li>Koszt produktów <span>{cartTotal} zł</span></li>
                            <li>Cena końcowa <span>{finalPrice} zł</span></li>
                        </ul>
                        {user.logged === 1 ?
                        <Link 
                        to={{pathname: '/checkout'}}
                        state={{finalPrice: finalPrice}}
                        className="primary-btn">Złóż zamówienie</Link>
                        : 
                        <div className='d-flex justify-content-center'><p style={{color: 'red'}}>Zaloguj się, aby złożyć zamówienie</p></div>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart