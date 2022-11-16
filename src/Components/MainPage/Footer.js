import React from 'react'
import { AiOutlineMail } from "react-icons/ai";
import '../../styles/footer.css'
import { useLocation, Link } from 'react-router-dom';

const Footer = () => {
    let location = useLocation();
    
    if(location.pathname.startsWith('/admin')) {
        return (
            <div></div>
        )
    }

  return (
    <footer className="footer">
    <div className="container">
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="footer__about">
                    <div className="footer__logo">
                        <a href="src/Components/MainPage/Footer#"><img src="img/footer-logo.png" alt=""/></a>
                    </div>
                    <p>Sklep z męskimi ubraniami - wpadającymi w każde gusta</p>
                </div>
            </div>
            <div className="col-lg-4 col-md-3 col-sm-6">
                <div className="footer__widget">
                    <h6 style={{textAlign: 'center'}}>Zakupy</h6>
                    <div className='d-flex justify-content-center'>
                        <ul>
                            <Link className='footer__widget__link' to={'/contact'}><li>Kontakt</li></Link>
                            <li><a href="src/Components/MainPage/Footer#">Regulamin sklepu</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 offset-lg-1 col-md-12 col-sm-12">
                <div className="footer__widget">
                    <h6>Newsletter</h6>
                    <div className="footer__newslatter">
                        <p>Zapisz się, aby byc na bieżąco z promocjami oraz nowymi towarami!</p>
                        <form action="src/Components/MainPage/Footer#">
                            <input type="text" placeholder="Twój e-mail"/>
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