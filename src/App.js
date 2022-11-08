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
import { CartProvider } from 'react-use-cart';
import Profile from './Components/MainPage/Profile';
import Error404 from './Components/Errors/error404';
import Orders from './Components/MainPage/Orders';
import Admin from './Components/Admin/Admin';
import Dashboard from './Components/Admin/Dashboard';



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
            <CartProvider>
                <div>
                <Navbar/>
                    <Routes>
                        <Route index path='/*' element = {<Main/>}></Route>
                        <Route path='/details/:id' element = {<Details/>}></Route>
                        <Route path='/cart' element = {<Cart/>}></Route>
                        <Route path='/products' element = {<Products/>}></Route>
                        <Route path='/signin' element = {<SignIn/>}></Route>
                        <Route path='/signup' element = {<SignUp/>}></Route>
                        <Route exact path='/admin/*' element = {<Dashboard/>}></Route>
                        <Route path='/profile/:id' element = {<Profile/>}></Route>
                        <Route path='/orders/:id' element={<Orders/>}></Route>
                        <Route path='/*' element={<Error404/>}></Route>
                    </Routes>
                <Footer/>
                </div>
            </CartProvider>
        </UserContext.Provider>
        </Router>

    </div>
  );
}

export default App;
