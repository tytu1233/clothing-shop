import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Cart from './Components/CartPage/Cart';
import Main from "./Components/MainPage/Main";
import Details from "./Components/ProductDetails/Details";
import Navbar from './Components/MainPage/Navbar';
import Footer from './Components/MainPage/Footer';
import Products from './Components/ProductsPage/Products';
import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Login/SignUp';
import { UserContext } from './other/UserContext';
import { CartProvider } from 'react-use-cart';
import Profile from './Components/MainPage/Profile';
import Error404 from './Components/Errors/error404';
import Orders from './Components/MainPage/Orders';
import Dashboard from './Components/Admin/Dashboard';
import Checkout from './Components/CartPage/Checkout';
import Contact from './Components/MainPage/Contact';
import 'devextreme/dist/css/dx.light.css';
import Statute from './Components/Statute';



const App = () => {

    const [user, setUser] = useState([]);
    const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);
    useEffect(() => {
        document.title = "CLOTHING STORE";
    }, []);

  return (
    <UserContext.Provider value={userProvider}>
    <CartProvider>
        <HashRouter>
                <Navbar/>
                    <Routes>
                        <Route exact path='/' element = {<Main/>}></Route>
                        <Route path='/details/:id' element = {<Details/>}></Route>
                        <Route path='/cart' element = {<Cart/>}></Route>
                        <Route path='/contact' element = {<Contact/>}></Route>
                        <Route path='/products' element = {<Products/>}></Route>
                        <Route path='/signin' element = {<SignIn/>}></Route>
                        <Route path='/signup' element = {<SignUp/>}></Route>
                        <Route path='/checkout' element = {<Checkout/>}></Route>
                        <Route path='/admin/*' element = {<Dashboard/>}></Route>
                        <Route path='/profile/:id' element = {<Profile/>}></Route>
                        <Route path='/orders/:id' element={<Orders/>}></Route>
                        <Route path='/statute' element={<Statute/>}></Route>
                        <Route path='/*' element={<Error404/>}></Route>
                    </Routes>
                <Footer/>
        </HashRouter>
    </CartProvider>
    </UserContext.Provider>
  );
}

export default App;
