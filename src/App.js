import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from './Components/CartPage/Cart';
import Main from "./Components/MainPage/Main";
import Details from "./Components/ProductDetails/Details";
import Navbar from './Components/MainPage/Navbar';
import Footer from './Components/MainPage/Footer';
import Products from './Components/ProductsPage/Products';
import SignIn from './Components/Login/SignIn';

const App = () => {

    useEffect(() => {
        document.title = "CLOTHING STORE"
    }, []);

  return (
    <div>
        <Router>
            <div>
            <Navbar/>
                <Routes>
                    <Route path='/' element = {<Main/>}></Route>
                    <Route path='/details' element = {<Details/>}></Route>
                    <Route path='/cart' element = {<Cart/>}></Route>
                    <Route path='/products' element = {<Products/>}></Route>
                    <Route path='/signin' element = {<SignIn/>}></Route>
                </Routes>
            <Footer/>
            </div>
        </Router>

    </div>
  );
}

export default App;
