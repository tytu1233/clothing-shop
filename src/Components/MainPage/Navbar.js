import React, { useState, useEffect } from 'react'
import SearchBar from '../SearchComponents/SearchBar'
import Men from './Men'
import Women from './Women'
import { TfiSearch } from "react-icons/tfi";
import { AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd, AiOutlineLogout } from "react-icons/ai";
import AuthenticationService from '../../Services/AuthenticationService';


const Navbar = () => {

    const [loggedUser, setLoggedUser] = useState([]);
    const [isLogged, setIsLogged] = useState(0);

    const logoutUser = async () => {
        const res = await AuthenticationService.logoutUser(loggedUser);
        if(res.data === "true") {
            setIsLogged([]);
            setIsLogged(0);
        }
    }
    
    const checkAuthorization = async () => {
        const res = await AuthenticationService.checkAuthenticationUser(JSON.parse(localStorage.getItem('token')));
        if(!(res.data.status === "pass")) return;
        console.log(res.data.user_id)
        setLoggedUser({"user_id": res.data.user_id, "token": JSON.parse(localStorage.getItem('token'))})
        setIsLogged(1);
    }
    
    useEffect(() => {
        checkAuthorization();
    }, [])
    


  return (
    <div>
        <SearchBar/>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#111111',}}>
            <div className="container">
                <a className="navbar-brand text-light border-2 border-end pe-4" href="/">NOX CLOTHING</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <a className="nav-link active dropdown-toggle" data-bs-toggle="collapse" href="src/Components/MainPage/Navbar#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">MĘŻCZYZNA</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active dropdown-toggle" data-bs-toggle="collapse" href="src/Components/MainPage/Navbar#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">KOBIETA</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <div className="input-group">
                            <input 
                            data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3"
                            type="text" className="form-control" placeholder="Wyszukaj produkt" aria-label="serach product" aria-describedby="button-addon2"
                            />
                            <button
                            style={{backgroundColor: 'white', bsBtnColor: '#111111'}}
                            data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3"
                            className="btn btn-outline-secondary border-0" type="button" id="button-addon2"><TfiSearch /></button>
                        </div>
                        </li>
                    </ul>
                    <div className='d-flex justify-content-round'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {isLogged === 1 ?
                            <a className="nav-link active" onClick={() => {logoutUser()}}><AiOutlineLogout size={25}/></a>
                            : <a className="nav-link active" href="/signin"><AiOutlineLogin size={25}/></a>}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active"><AiOutlineUserAdd size={25}/></a>
                        </li>
                        <li className="nav-item">
                            <a href='/cart' className="nav-link active"><AiOutlineShoppingCart size={25}/></a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </nav>
        <Men/>
        <Women/>
    </div>
  )
}

export default Navbar