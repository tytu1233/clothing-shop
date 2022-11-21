import React, { useEffect, useState } from 'react'
import UsersService from '../../Services/UsersService';
import '../../styles/signup.css'
import { useFormik } from 'formik';
import { registerSchema } from '../schemas/register';
import CustomizedToast from '../Toast/CustomizedToast';
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
    const [open, setOpen] = useState(false);
    let navigate = useNavigate();

    const changeLocation = (placeToGo) => {
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }
    const onSubmit = async () => {
            UsersService.createUser(values)
            .then((response) => {
                console.log(response.data)
                setOpen(true);
                const interval = setInterval(() => {
                    setOpen(false);
                    changeLocation("/signin")
                }, 2000);
                return () => clearInterval(interval);
            })
      };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            surname: "",
            login: "",
            password: "",
            email: "",
            city: "",
            zipCode: "",
            street: "",
            terms: false
        },
        validationSchema: registerSchema,
        onSubmit
    });

  return (
    <section className="container p-4">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                    <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Stwórz konto</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-outline mb-4">
                            <div className='form-group'>
                            <label className="form-label" htmlFor="signUpName">Imię</label>
                            <input type="text"
                            className={`form-control ${errors.name && touched.name ? "invalid" : ""}`}
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="name"
                            placeholder='Podaj swoje imię'
                            />
                            {errors.name && touched.name &&
                                    <small className="text-danger">{errors.name}</small>
                            }
                            </div>
                        </div>
                        
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signUpSurname">Nazwisko</label>
                        <input type="text"
                            className={`form-control ${errors.surname && touched.surname ? "invalid" : ""}`}
                            value={values.surname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="surname"
                            placeholder='Podaj swoje nazwisko'
                            />
                            {errors.surname && touched.surname &&
                                    <small className="text-danger">{errors.surname}</small>
                            }
                        </div>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signUpLogin">Login</label>
                        <input type="text"
                            className={`form-control ${errors.login && touched.login ? "invalid" : ""}`}
                            value={values.login}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="login"
                            id="login"
                            placeholder='Podaj login'
                            />
                            {errors.login && touched.login &&
                                    <small name="login" className="text-danger">{errors.login}</small>
                            }
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="signUpPassword">Hasło</label>
                            <input type="password"
                            className={`form-control ${errors.password && touched.password ? "invalid" : ""}`}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="password"
                            placeholder='Podaj hasło'
                            />
                            {errors.password && touched.password &&
                                    <small className="text-danger">{errors.password}</small>
                            }
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="signUpMail">E-mail</label>
                            <input type="email"
                            className={`form-control ${errors.email && touched.email ? "invalid" : ""}`}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="email"
                            name="email"
                            placeholder='Podaj e-mail'
                            />
                            {errors.email && touched.email &&
                                    <small name="email" className="text-danger">{errors.email}</small>
                            }
                        </div>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signUpCity">Miasto</label>
                        <input type="text"
                            className={`form-control ${errors.city && touched.city ? "invalid" : ""}`}
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="city"
                            placeholder='Podaj miasto'
                            />
                            {errors.city && touched.city &&
                                    <small className="text-danger">{errors.city}</small>
                            }
                        </div>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signUpStreet">Ulica</label>
                        <input type="text"
                            className={`form-control ${errors.street && touched.street ? "invalid" : ""}`}
                            value={values.street}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="street"
                            placeholder='Podaj ulicę'
                            />
                            {errors.street && touched.street &&
                                    <small className="text-danger">{errors.street}</small>
                            }
                        </div>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="signUpZipCode">Kod pocztowy</label>
                        <input type="text"
                            className={`form-control ${errors.zipCode && touched.zipCode ? "invalid" : ""}`}
                            value={values.zipCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="zipCode"
                            placeholder='Podaj kod pocztowy'
                            />
                            {errors.zipCode && touched.zipCode &&
                                    <small className="text-danger">{errors.zipCode}</small>
                            }
                        </div>
                        <div className="form-outline mb-4">
                            <div className='d-flex justify-content-center'>
                                <input className="form-check-input me-2" onChange={handleChange} value={values.terms} onBlur={handleBlur} type="checkbox" id="terms" />
                                <label className="form-check-label" htmlFor="form2Example3g">
                                    Zapoznałem się z <Link to={'/statute'} className="text-body"><u>regulaminem serwisu</u></Link>
                                </label>
                            </div>
                            <div className='d-flex justify-content-center'>
                                {errors.terms && touched.terms &&
                                        <small className="text-danger">{errors.terms}</small>
                                }
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                        <button type="submit"
                            className="btn btn-dark btn-block btn-lg ">Zarejestruj</button>
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
        <CustomizedToast open={open} text={"Pomyślnie zarejestrowano!"}/>
    </section>
  )
}

export default SignUp