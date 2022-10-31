import React, { useContext, useEffect } from 'react';
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import { UserContext } from '../../other/UserContext';

const Opinions = () => {

    const { user } = useContext(UserContext);

    return (
        <div className='container'>
            {user.logged === 1 ? (
            <div className='container'>
                    <div className='row m-5'>
                        <div className='d-flex justify-content-center'>
                            <Rating
                                name="simple-controlled"
                            />
                        </div>
                        <div className="mt-3 mt-3">
                            <label htmlFor="comment">Opinia:</label>
                            <textarea  className="form-control" rows="5" id="comment" name="text"></textarea>
                        </div>
                        <Button>Dodaj opinię</Button>
                    </div>
            </div>
            ): 
            <div className='container p-5'>
                <div className='d-flex justify-content-center'>
                    <h1>Zaloguj się, aby dodać opinię!</h1>
                </div>
            </div>
            }
                <div className="row  d-flex justify-content-center">

                        <div className="col-md-8">

                            <div className="headings d-flex justify-content-between align-items-center mb-3">
                                <h5>Liczba opinii</h5>
                            </div>

                            <div className="card p-3 m-3">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div className="user d-flex flex-row align-items-center">

                                        <span><small className="font-weight-bold text-primary">bardzo dobra</small></span>

                                    </div>
                                    <Rating
                                        name="read-only"
                                        readOnly
                                    />
                                </div>
                                <span><small className="font-weight-bold">gitowa</small></span>
                            </div>
                        </div>
                </div>
            <div/>
        </div>
            )

}

export default Opinions;