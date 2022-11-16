import React, { useState, useEffect, useContext } from 'react'
import { useCart } from "react-use-cart";
import OrdersService from '../../Services/OrdersService';
import { UserContext } from '../../other/UserContext';
import { useLocation } from "react-router"
import Loader from '../Loader';
import { useFormik } from 'formik';
import { checkoutSchema } from '../schemas/checkout';
import CustomizedToast from '../Toast/CustomizedToast';
import ServiceSizes from '../../Services/ServiceSizes';
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {

    const {
        items,
        totalUniqueItems,
        emptyCart
      } = useCart();

      let navigate = useNavigate();

    const changeLocation = (placeToGo) => {
        navigate(placeToGo, { replace: true });
        window.location.reload();
    }

      const onSubmit = async () => {
        setOpen(true)
        setLoading(true)
        OrdersService.createOrder(user.user_id, values)
        .then((response) => {
            OrdersService.updateFinalPrice(response.data, location.state.finalPrice)
            .then((response) => {
            for(let i = 0; i<items.length; i++) {
                OrdersService.createOrdersProduct(response.data, items[i])
                .then((response) => {
                    console.log(response.data)
                })
            }
        })
        })
        setLoading(false)
        const interval = setInterval(() => {
            setOpen(false);
            emptyCart()
            changeLocation("/")
        }, 2000);
        return () => clearInterval(interval);
  };

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            surname: "",
            city: "",
            zipCode: "",
            street: ""
        },
        validationSchema: checkoutSchema,
        onSubmit
    });

      const { user } = useContext(UserContext);
      const [loading, setLoading] = useState(false)
      const location = useLocation();
      const [open, setOpen] = useState(false)
      const [error, setError] = useState(false)
      const check = async () => {
        for(let i = 0; i<items.length; i++) {
            await ServiceSizes.checkItemQuantity(items[i]).then((res) => {
                console.log("ok")
            })
            .catch((err) => {
                //changeLocation('/cart')
                setError(true)
            })
        }
      }

        useEffect(() => {
            check();
        }, [])

      if(loading) {
        return (<div style={{opacity: '0.4'}}><Loader/></div>)
      }  

      if(error) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">403</h1>
                    <p className="fs-3"> <span className="text-danger">Opps!</span></p>
                    <p className="lead">
                        Została wybrana zbyt duża ilość jednego z towarów, wróć do koszyka, by naprawić swój błąd!
                    </p>
                    <p className="lead">
                        Sprawdź status pod przedmiotem, by zamówić dodany towar - status musi wskazywać <span style={{color: 'green', fontWeight: 'bold'}}>Dostępne</span>
                    </p>
                    <Link to={"/cart"} className="btn btn-dark">Koszyk</Link>
                </div>
            </div>
        )
      }
  return (
    <section className="container p-4">
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-12 col-lg-12 col-xl-6 mb-2">
            <div className="card" style={{borderRadius: "15px"}}>
                <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Podaj dane zamówienia</h2>

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
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark btn-block btn-lg ">Złóż zamówienie</button>
                    </div>
                </form>

                </div>
            </div>
            </div>
            <div className="col-12 col-md-12 col-lg-12 col-xl-6">
                <div className='d-flex justify-content-center border border-1 rounded'>
                    <div className='container p-5'>
                        <div className='row'>
                            <div className='col-12'>
                                <h1 className='text-center'>Podsumowanie zamówienia</h1>
                            </div>
                            <div className='col-12'>
                                <span className='text-center'>Ilość przedmiotów: {totalUniqueItems}</span>
                            </div>
                            <div className='col-12'>
                            <span className='text-center'>Całkowity koszt: {location.state.finalPrice} zł</span>
                            </div>
                            <div className='col-12'>
                                <span>Przedmioty:</span>
                                <div>
                                    {items.map((item) =>  {
                                        return (
                                            <div><span key={item.id}>Nazwa: {item.name}, ilość: {item.quantity}, rozmiar: {item.size}</span></div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    <CustomizedToast open={open} text="Zamówienie zostało złożone pomyślnie!"/>
</section>
  )
}

export default Checkout