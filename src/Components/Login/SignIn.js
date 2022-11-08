import React, { useEffect, useState, useContext} from 'react'
import '../../styles/login.css'
import AuthenticationService from '../../Services/AuthenticationService';
import CustomizedToast from '../Toast/CustomizedToast';
import { useNavigate } from "react-router-dom";

const initialState = {
    login: "",
    password: "",
};


const SignIn = () => {

    const [newUser, setNewUser] = useState(initialState);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(''); 
    let navigate = useNavigate();


    useEffect(()=>{},[newUser])

    const handleOnChange = (e) => {

        const { name, value } = e.target;
    
        setNewUser({ ...newUser, [name]: value });

        console.log(newUser)
    }

    const changeLocation = (placeToGo) => {
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }

    const authUser = () => {
        AuthenticationService.authenticateUser(newUser).then((response) => {
            console.log(response.data)
            if(response.data.token === "-1") {
                setError('blad')
            } else {
                localStorage.setItem("token", JSON.stringify(response.data.token));
                setOpen(true);
                setError('')
                const interval = setInterval(() => {
                    setOpen(false);
                    changeLocation("/")
                }, 2000);
                return () => clearInterval(interval);
            }
        })
      }

  return (
    <div>
        <section className="vh-95">
            <div className="container py-5 h-100">
                <div className='d-flex justify-content-center p-3'>
                    <h1 className="display-6">Zaloguj się</h1>
                </div>
                <div className="row d-flex align-items-center justify-content-center h-100">
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    className="img-fluid" alt=""/>
                </div>
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <form>
                    <div className="form-outline mb-4">
                        <input type="text" name="login" id="form1Example13" className="form-control form-control-lg" value={newUser.login} onChange={handleOnChange} />
                        <label className="form-label" htmlFor="form1Example13">Login</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" name="password" value={newUser.password} onChange={handleOnChange} id="form1Example23" className="form-control form-control-lg" />
                        <label className="form-label" htmlFor="form1Example23">Hasło</label>
                    </div>
                    {error.length !== 0 ? (
                        <div className='d-flex justify-content-center mb-4'>
                        <span style={{color: 'red'}}>Niepoprawne dane logowania</span>
                        </div>
                    ) : null}
                    <button type="button" id="liveToastBtn" onClick={() => {authUser()}} className="btn btn-dark btn-lg btn-block">Zaloguj się</button>
                    </form>
                </div>
                </div>
            </div>
            <CustomizedToast open={open} text={"Zalogowano! Nastąpi przekierowanie na stronę główną"}/>
        </section>
    </div>
  )
}

export default SignIn