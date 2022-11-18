import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import UsersService from '../../Services/UsersService';
import AuthenticationService from '../../Services/AuthenticationService';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { profileSchema } from '../schemas/profile';
import Loader from '../Loader';
import CustomizedToast from '../Toast/CustomizedToast';


const initialStatePassword = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
};


const Profile = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(false)
    const [newPassword, setNewPassword] = useState(initialStatePassword);
    const [error, setError] = useState(false)
    const [errorOld, setErrorOld] = useState(false)
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')

    const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        setNewPassword({ ...newPassword, [name]: value });
    
        if (name === "confirmPassword") {
          if(newPassword.password === value) {
            setError(prev => prev = false)
            console.log("false")
          } else {
          setError(true)
          }
        }
      };


      const changeLocation = (placeToGo) => {
        navigate(placeToGo, { replace: false });
        window.location.reload();
    }

    const onSubmit = async () => {
        console.log(values)
        UsersService.updateUserProfile(values)
        .then((response) => {
            console.log(response.data)
            setOpen(true)
            setText("Pomyślnie zaktualizowano dane!")
            console.log(response.data)
            const interval = setInterval(() => {
                setOpen(false);
            }, 2000);
            return () => {clearInterval(interval);}
        })
    };

    const deleteUser = async () => {
        await UsersService.deleteUser(id)
            .then((response) => {
                console.log(response)
                localStorage.removeItem("token");
                changeLocation("/")
            })
    }


    const changePassword = async () => {
       await UsersService.passwordMatches({login: user.login, password: newPassword.oldPassword})
        .then(async (res) => {
            if(res.data === "ok") {
                setErrorOld(prev=> prev = false)
                await UsersService.changePassword(id, newPassword.password)
                .then((response) => {
                    setOpen(true)
                    setText("Pomyślnie zmieniono hasło!")
                    console.log(response.data)
                    const interval = setInterval(() => {
                        setOpen(false);
                    }, 2000);
                    return () => {clearInterval(interval);}
                })
            } 
        }).catch((err) => {
            console.log(err)
            setErrorOld(true)
        })
    }

    const checkAuthorization = useRef(() => {});

    checkAuthorization.current = async () => {
        setLoading(true)
        const res = await AuthenticationService.checkAuthenticationUser(JSON.parse(localStorage.getItem('token')));
        if(!(res.data.status === "pass")) {
            navigate("/");
            //console.log("asd")
            setLoading(false)
            return;
        }        
        const response = await UsersService.getUserById(id);
        setUser(response.data);
        setLoading(false)
        //console.log(response.data)
    }



    const { values, errors, handleBlur, touched, handleChange, handleSubmit } = useFormik({
        initialValues: {
            id_user: id,
            name: user.name,
            surname: user.surname,
            city: user.city,
            zipCode: user.zipCode,
            street: user.street,
        },
        enableReinitialize: true,
        validationSchema: profileSchema,
        onSubmit
    });


    useEffect(() => {
        checkAuthorization.current()
    }, [])

    if(loading) {
        return (<Loader/>)
    }

return (
    <div className="container mb-3">
        <div className="row">
                <div className="col-12">
                    
                    <div className="my-5">
                        <h3>Mój Profil</h3>
                        <hr/>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-5 gx-5">
                                        <div className="gap-3 d-md-flex justify-content-md-end text-center">
                                            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-danger">Usuń konto</button>
                                        </div>
                            <div className="col-xxl-12 mb-5 mb-xxl-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Dane kontaktowe</h4>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">Imię *</label>
                                            <input type="text"
                                                className={`form-control ${errors.name && touched.name ? "invalid" : ""}`}
                                                value={values.name || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                id="name"
                                                name="name"
                                            
                                                />
                                        {errors.name && touched.name &&
                                                <small className="text-danger">{errors.name}</small>
                                        }
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">Nazwisko *</label>
                                            <input type="text"
                                                className={`form-control ${errors.surname && touched.surname ? "invalid" : ""}`}
                                                value={values.surname || ''}
                                                id="surname"
                                                name="surname"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                        {errors.surname && touched.surname &&
                                                <small className="text-danger">{errors.surname}</small>
                                        }   
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">Miasto *</label>
                                            <input type="text"
                                                className={`form-control ${errors.city && touched.city ? "invalid" : ""}`}
                                                value={values.city || ''}
                                                name="city"
                                                id="city"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                />
                                        {errors.city && touched.city &&
                                                <small className="text-danger">{errors.city}</small>
                                        }  
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label className="form-label">Ulica</label>
                                            <input type="text"
                                                className={`form-control ${errors.street && touched.street ? "invalid" : ""}`}
                                                value={values.street || ''}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name="zipCode"
                                                />
                                        {errors.street && touched.street &&
                                                <small className="text-danger">{errors.street}</small>
                                        }  
                                        </div>
                                       
                                        <div className="col-md-6">
                                            <label htmlFor="zipCode" className="form-label">Kod pocztowy *</label>
                                            <input type="text"
                                            className={`form-control ${errors.zipCode && touched.zipCode ? "invalid" : ""}`}
                                            value={values.zipCode || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            id="zipCode"
                                            name="zipCode"/>
                                        {errors.zipCode && touched.zipCode &&
                                                <small className="text-danger">{errors.zipCode}</small>
                                        } 
                                        </div>
                                        <div className="gap-3 d-md-flex justify-content-md-start text-center">
                                            <button type="submit" className="btn btn-dark">Zaktualizuj dane</button>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        </form> 
                    <form>
                        <div className="row mb-5 gx-5">
                            <div className="col-xxl-12 mb-5 mb-xxl-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="my-4">Zmień hasło</h4>
                                        
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputPassword1" className="form-label">Stare hasło *</label>
                                            <input required type="password" value={newPassword.oldPassword} onChange={handleOnChange} className="form-control" name="oldPassword" id="oldPassword"/>
                                        </div>
                                        
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputPassword2" className="form-label">Nowe hasło *</label>
                                            <input required type="password" value={newPassword.password} onChange={handleOnChange} className="form-control" name="password" id="password"/>
                                        </div>
                                        
                                        <div className="col-md-12">
                                            <label htmlFor="exampleInputPassword3" className="form-label">Potwierdź hasło *</label>
                                            <input required type="password" value={newPassword.confirmPassword} onChange={handleOnChange} className="form-control" name="confirmPassword" id="confirmPassword"/>
                                            {error === true ? (<span style={{color: 'red'}}>Hasła muszą być takie same</span>) : (null)}
                                            {errorOld === true ? (<span style={{color: 'red'}}>Hasło do konta jest niepoprawne</span>) : (null)}
                                        </div>
                                        <div className="gap-3 d-md-flex justify-content-md-start text-center">
                                            <button type="button" onClick={() => changePassword()} className="btn btn-dark">Ustaw nowe hasło</button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                
                        </div>
                    </form>
                </div>
            </div>
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Usunięcie konta</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Czy na pewno chcesz usunąć konto? Nie będziesz w stanie go odzyskać</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => {deleteUser(id)}}>Potwierdź</button>
                    </div>
                    </div>
                </div>
                </div>
            <CustomizedToast open={open} text={text}/>
    </div>
        )
}

export default Profile;