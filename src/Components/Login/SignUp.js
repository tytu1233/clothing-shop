import React, { useEffect, useState } from 'react'
import UsersService from '../../Services/UsersService';
import { useForm } from 'react-hook-form';
import '../../styles/signup.css'


const SignUp = () => {

    const [mail, setMail] = useState(0)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
      } = useForm();
    
      const onSubmit = async (data) => {
        const res = await UsersService.getUserEmail(data.email);
        if(res.data==="wolne") {
            UsersService.createUser(data)
            .then((response) => {
                console.log(response.data)
            })
        reset();
        } else 
            setMail(1)
      };


  return (
    <section className="container p-4">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                    <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Stwórz konto</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-outline mb-4">
                            <div className='form-group'>
                            <label className="form-label" htmlFor="signUpName">Imię</label>
                            <input type="text"
                            className={`form-control ${errors.name && "invalid"}`}
                                {...register("name", { required: "Imię jest wymagane" })}
                                onKeyUp={() => {
                                trigger("name");
                                }}
                            />

                            {errors.name && (
                                <div className='d-flex justify-content-center'>
                                    <small className="text-danger">{errors.name.message}</small>
                                </div>
                            )}
                            </div>
                        </div>
                        
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signUpSurname">Nazwisko</label>
                            <input type="text" className={`form-control ${errors.surname && "invalid"}`}
                                {...register("surname", { required: "Nazwisko jest wymagane" })}
                                onKeyUp={() => {
                                trigger("surname");
                                }}
                            />

                            {errors.surname && (
                                <div className='d-flex justify-content-center'>
                                    <small className="text-danger">{errors.surname.message}</small>
                                </div>
                            )}
                            
                        </div>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signUpLogin">Login</label>
                            <input type="text" className={`form-control ${errors.login && "invalid"}`}
                                {...register("login", { required: "Login jest wymagany" })}
                                onKeyUp={() => {
                                trigger("login");
                                }}
                            />

                            {errors.login && (
                                <div className='d-flex justify-content-center'>
                                    <small className="text-danger">{errors.login.message}</small>
                                </div>
                            )}
                            
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="signUpPassword">Hasło</label>
                            <input type="password" className={`form-control ${errors.password && "invalid"}`}
                                {...register("password", { required: "Hasło jest wymagane",
                                pattern: {
                                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                                    message: "Hasło musi zawierać co najmniej 1 cyfrę, dużą literę, małą literę i co najmniej 8 znaków"
                                }
                                })}
                                onKeyUp={() => {
                                trigger("password");
                                }}
                            />

                            {errors.password && (
                                <div className='d-flex justify-content-center'>
                                    <small className="text-danger">{errors.password.message}</small>
                                </div>
                            )}
                            
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="signUpMail">E-mail</label>
                            <input type="email" className={`form-control ${errors.email && "invalid"}`}
                                {...register("email", { required: "Email jest wymagany" ,
                                pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Adres email jest niepoprawny",
                                }
                            })}
                                onKeyUp={() => {
                                    trigger("email");
                                    setMail(0);
                                }}
                            />
                            {
                            <div className='d-flex justify-content-center'>
                                {errors.email && (
                                <div className='d-flex justify-content-center'>
                                    <small className="text-danger">{errors.email.message}</small>
                                </div>
                                )}
                                {mail === 1 ? (
                                    <small className="text-danger">Podany e-mail jest zajęty</small>
                                ) : null}
                            </div>
                            }
                        </div>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signUpAddress">Adres</label>
                            <input type="text" className={`form-control ${errors.address && "invalid"}`}
                                {...register("address", { required: "Adres jest wymagany" })}
                                onKeyUp={() => {
                                trigger("address");
                                }}
                            />

                            {errors.address && (
                                <div className='d-flex justify-content-center'>
                                    <small className="text-danger">{errors.address.message}</small>
                                </div>
                            )}
                            
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" id="form2Example3cg" />
                        <label className="form-check-label" htmlFor="form2Example3g">
                            Zgadzam się na <a href="#!" className="text-body"><u>warunki serwisu</u></a>
                        </label>
                        </div>

                        <div className="d-flex justify-content-center">
                        <button type="submit"
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