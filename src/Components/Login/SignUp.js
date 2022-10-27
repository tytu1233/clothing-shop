import React, { useEffect, useState } from 'react'
import UsersService from '../../Services/UsersService';

const initialState = {
    name: "",
    surname: "",
    email: "",
    login: "",
    password: "",
    address: "",
};


const SignUp = () => {

    const [newUser, setNewUser] = useState(initialState);

    useEffect(() => {}, [newUser]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        setNewUser({ ...newUser, [name]: value });
    
      };

    const registerUser = () => {
        UsersService.createUser(newUser)
        .then((response) => {
            console.log(response.data)
        })
    }


  return (
    <section className="container p-4">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                    <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Stwórz konto</h2>

                    <form>

                        <div className="form-outline mb-4">
                            <input type="text" name="name" id="signUpName" value={newUser.name} onChange={handleOnChange} className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="signUpName">Imię</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" name="surname" id="signUpSurname" value={newUser.surname} onChange={handleOnChange} className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="signUpSurname">Nazwisko</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" name="login" id="signUpLogin" value={newUser.login} onChange={handleOnChange} className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="signUpLogin">Login</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" name="password" id="signUpPassword" value={newUser.password} onChange={handleOnChange} className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="signUpPassword">Hasło</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="email" id="signUpMail" name="email" value={newUser.email} onChange={handleOnChange} className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="signUpMail">E-mail</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="text" id="signUpAddress" name="address" value={newUser.address} onChange={handleOnChange} className="form-control form-control-lg" />
                            <label className="form-label" htmlFor="signUpAddress">Adres</label>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                        <label className="form-check-label" htmlFor="form2Example3g">
                            Zgadzam się na <a href="#!" className="text-body"><u>warunki serwisu</u></a>
                        </label>
                        </div>

                        <div className="d-flex justify-content-center">
                        <button type="button" onClick={() => registerUser()}
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                        </div>

                        <p className="text-center text-muted mt-5 mb-0">Masz już konto? <a href="/signin"
                            className="fw-bold text-body"><u>Zaloguj się!</u></a></p>

                    </form>

                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default SignUp