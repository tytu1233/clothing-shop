import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from './Components/CartPage/Cart';
import Main from "./Components/MainPage/Main";
import Details from "./Components/ProductDetails/Details";
import Navbar from './Components/MainPage/Navbar';
import Footer from './Components/MainPage/Footer';
import Products from './Components/ProductsPage/Products';
import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Login/SignUp';
import { UserContext } from './other/UserContext';


const App = () => {

    const [user, setUser] = useState([]);
    const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);
    useEffect(() => {
        document.title = "CLOTHING STORE";
    }, []);

  return (
    
    <div>
        <Router>
        <UserContext.Provider value={userProvider}>
            <div>
            <Navbar/>
                <Routes>
                    <Route path='/' element = {<Main/>}></Route>
                    <Route path='/details' element = {<Details/>}></Route>
                    <Route path='/cart' element = {<Cart/>}></Route>
                    <Route path='/products' element = {<Products/>}></Route>
                    <Route path='/signin' element = {<SignIn/>}></Route>
                    <Route path='/signup' element = {<SignUp/>}></Route>
                </Routes>
            <Footer/>
            </div>
        </UserContext.Provider>
        </Router>

    </div>
  );
}

export default App;
