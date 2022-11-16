import React, { useState, useEffect, useContext, useRef } from 'react'
import SearchBar from '../SearchComponents/SearchBar'
import Men from './Men'
import { TfiSearch } from "react-icons/tfi";
import { AiOutlineShoppingCart, AiOutlineLogin, AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import AuthenticationService from '../../Services/AuthenticationService';
import { UserContext } from '../../other/UserContext';
import CustomizedToast from '../Toast/CustomizedToast';
import '../../styles/navbar.css'
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router'


const Navbar = () => {

    let location = useLocation();
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(0);
    const { user, setUser } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const changeLocation = (placeToGo) => {
        navigate(placeToGo, { replace: false });
        window.location.reload();
    }

    const logoutUser = async () => {
        const res = await AuthenticationService.logoutUser(user);
        if(res.data === "true") {
            setIsLogged(0);
        }
        setOpen(true)
        const interval = setInterval(() => {
            setOpen(false);
        }, 2000);
        window.location.reload(false);
          return () => {clearInterval(interval);}
    }

    const checkAuthorization = useRef(() => {});
    
    checkAuthorization.current = async () => {
        const res = await AuthenticationService.checkAuthenticationUser(JSON.parse(localStorage.getItem('token')));
        if(!(res.data.status === "pass")) return;
        if(location.pathname.startsWith('/admin') && res.data.role !== "Admin") changeLocation('/')
        setUser({"user_id": res.data.user_id, "token": JSON.parse(localStorage.getItem('token')), "logged": 1, "role": res.data.role})
        setIsLogged(1);
        
    }
    
    useEffect(() => {
        checkAuthorization.current();
        //console.log(user)
    }, [isLogged])
    
    if(location.pathname.startsWith('/admin')) {
        return (
            <div></div>
        )
    }

  return (
    <div>
        <SearchBar/>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#111111',}}>
            <div className="container">
                <Link className="navbar-brand text-light border-2 border-end pe-4" to={'/'}>CLOTHING STORE</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <Link style={{textDecoration: 'none'}} className="nav-item" to={'/products'}>
                            <li className='nav-link active'>
                                PRODUKTY
                            </li>
                        </Link>
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
                            data-bs-toggle="collapse" href="#multiCollapseExample3" aria-expanded="false" aria-controls="multiCollapseExample3"
                            className="btn btn-outline-secondary border-0" type="button" id="button-addon2"><TfiSearch /></button>
                        </div>
                        </li>
                    </ul>
                    <div className='d-flex justify-content-round'>
                        
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            { isLogged === 1 ?
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                <a className="nav-link active dropdown-togglea" href="/#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <AiOutlineUser size={25}/>
                                </a>
                                <ul style={{backgroundColor: 'rgb(17, 17, 17)'}} className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                                    <Link to={`/profile/${user.user_id}`} className="dropdown-item" ><li>Profil</li></Link>
                                    <Link to={`/orders/${user.user_id}`} className="dropdown-item"><li>Zamówienia</li></Link>
                                    {user.role === "Admin" ? <Link onClick={() => {changeLocation(`/admin`)}} className="dropdown-item"><li>Panel admina</li></Link> : null}
                                    <li><Link className="dropdown-item" onClick={() => {logoutUser()}}>Wyloguj</Link></li>
                                </ul>
                                </li>
                            </ul>
                            : <Link className="nav-link active" to={'/signin'}><AiOutlineLogin size={25}/></Link> 
                            }
                        </li>
                        <Link className="nav-link active" to={'/signup'}>
                        <li className="nav-item">
                            {isLogged === 1 ? null :<AiOutlineUserAdd size={25}/>}
                        </li>
                        </Link>
                        <Link to={'/cart'} className="nav-link active">
                        <li className="nav-item">
                            <AiOutlineShoppingCart size={25}/>
                        </li>
                        </Link>
                    </ul>
                    </div>
                </div>
            </div>
        </nav>
        <Men/>
        <>
        <CustomizedToast text={"Nastąpi wylogowanie"} open={open}/>
        </>
    </div>
  )
}

export default Navbar