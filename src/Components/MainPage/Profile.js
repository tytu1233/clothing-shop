import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import UsersService from '../../Services/UsersService';
import { UserContext } from '../../other/UserContext';
import { useNavigate } from "react-router-dom";


const Profile = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [usera, setUsera] = useState([])
    const { user } = useContext(UserContext);
    const loadUser = async () => {
        const res = await UsersService.getUserById(id);
        setUsera(res.data);
        //console.log(res.data)
    }

    const authenticated = () => {
        if(user.length === 0)
            navigate("/")
        else 
            loadUser()

    }


    useEffect(() => {
        authenticated();
    }, [])
return (
    <div class="container mb-3">
        <div class="row">
                <div class="col-12">
                    
                    <div class="my-5">
                        <h3>Mój Profil</h3>
                        <hr/>
                    </div>
                    
                    <form class="file-upload">
                        <div class="row mb-5 gx-5">
                            
                            <div class="col-xxl-8 mb-5 mb-xxl-0">
                                <div class="bg-secondary-soft px-4 py-5 rounded">
                                    <div class="row g-3">
                                        <h4 class="mb-4 mt-0">Dane kontaktowe</h4>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label">Imię *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="First name" value={usera.name}/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label">Nazwisko *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Last name" value={usera.surname}/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label">Miasto *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Phone number" value={usera.address}/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label">Ulica</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Phone number" value={usera.address}/>
                                        </div>
                                       
                                        <div class="col-md-6">
                                            <label for="inputEmail4" class="form-label">Kod pocztowy *</label>
                                            <input type="text" class="form-control" id="inputEmail4" value={usera.address}/>
                                        </div>
                                        
                                    </div> 
                                </div>
                            </div>
                        </div>

                        <div class="row mb-5 gx-5">
                            <div class="col-xxl-6 mb-5 mb-xxl-0">
                                <div class="bg-secondary-soft px-4 py-5 rounded">
                                    <div class="row g-3">
                                        <h4 class="mb-4 mt-0">Social media detail</h4>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label"><i class="fab fa-fw fa-facebook me-2 text-facebook"></i>Facebook *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Facebook" value="http://www.facebook.com"/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label"><i class="fab fa-fw fa-twitter text-twitter me-2"></i>Twitter *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Twitter" value="http://www.twitter.com"/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label"><i class="fab fa-fw fa-linkedin-in text-linkedin me-2"></i>Linkedin *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Linkedin" value="http://www.linkedin.com"/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label"><i class="fab fa-fw fa-instagram text-instagram me-2"></i>Instagram *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Instragram" value="http://www.instragram.com"/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label"><i class="fas fa-fw fa-basketball-ball text-dribbble me-2"></i>Dribble *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Dribble" value="http://www.dribble.com"/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label class="form-label"><i class="fab fa-fw fa-pinterest text-pinterest"></i>Pinterest *</label>
                                            <input type="text" class="form-control" placeholder="" aria-label="Pinterest" value="http://www.pinterest.com"/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div class="col-xxl-6">
                                <div class="bg-secondary-soft px-4 py-5 rounded">
                                    <div class="row g-3">
                                        <h4 class="my-4">Zmień hasło</h4>
                                        
                                        <div class="col-md-6">
                                            <label for="exampleInputPassword1" class="form-label">Stare hasło *</label>
                                            <input type="password" class="form-control" id="exampleInputPassword1"/>
                                        </div>
                                        
                                        <div class="col-md-6">
                                            <label for="exampleInputPassword2" class="form-label">Nowe hasło *</label>
                                            <input type="password" class="form-control" id="exampleInputPassword2"/>
                                        </div>
                                        
                                        <div class="col-md-12">
                                            <label for="exampleInputPassword3" class="form-label">Potwierdź hasło *</label>
                                            <input type="password" class="form-control" id="exampleInputPassword3"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="gap-3 d-md-flex justify-content-md-end text-center">
                            <button type="button" class="btn btn-danger btn-lg">Usuń profil</button>
                            <button type="button" class="btn btn-primary btn-lg">Zaktualizuj profil</button>
                        </div>
                    </form> 
                </div>
            </div>
    </div>
        )
}

export default Profile;