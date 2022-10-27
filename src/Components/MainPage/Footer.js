import React from 'react'
import { AiOutlineMail } from "react-icons/ai";
import '../../styles/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer__about">
                    <div className="footer__logo">
                        <a href="src/Components/MainPage/Footer#"><img src="img/footer-logo.png" alt=""/></a>
                    </div>
                    <p>Sklep z męskimi ubraniami - wpadającymi w każde gusta</p>
                    <a href="src/Components/MainPage/Footer#"><img src="img/payment.png" alt=""/></a>
                </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                <div className="footer__widget">
                    <h6>Shopping</h6>
                    <ul>
                        <li><a href="src/Components/MainPage/Footer#">Clothing Store</a></li>
                        <li><a href="src/Components/MainPage/Footer#">Trending Shoes</a></li>
                        <li><a href="src/Components/MainPage/Footer#">Accessories</a></li>
                        <li><a href="src/Components/MainPage/Footer#">Sale</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6">
                <div className="footer__widget">
                    <h6>Shopping</h6>
                    <ul>
                        <li><a href="src/Components/MainPage/Footer#">Contact Us</a></li>
                        <li><a href="src/Components/MainPage/Footer#">Payment Methods</a></li>
                        <li><a href="src/Components/MainPage/Footer#">Delivary</a></li>
                        <li><a href="src/Components/MainPage/Footer#">Return & Exchanges</a></li>
                    </ul>
                </div>
            </div>
            <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                <div className="footer__widget">
                    <h6>Newsletter</h6>
                    <div className="footer__newslatter">
                        <p>Zapisz się, aby byc na bieżąco z promocjami oraz nowymi towarami!</p>
                        <form action="src/Components/MainPage/Footer#">
                            <input type="text" placeholder="Your email"/>
                            <button type="submit"><AiOutlineMail/></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12 text-center">
                <div className="footer__copyright__text">
                    <p>Copyright © CLOTHING SHOP
                    </p>
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer