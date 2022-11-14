import React, { useContext, useState, useEffect, useRef } from 'react';
import Rating from "@mui/material/Rating";
import Button from '@mui/material/Button';
import { UserContext } from '../../other/UserContext';
import OpinionsService from '../../Services/OpinionsService';
import { Pagination } from '@mui/material';

const Opinions = ({productId}) => {

    const { user } = useContext(UserContext);
    const [pagination, setPagination] = useState([]);
    const [opinions, setOpinions] = useState([])
    const [page, setPage] = useState(0);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);


    const handleChange = (e, p) => {
        setPage(p-1)
    }

    const addOpinion = async () => {
        const opinion = { "rating": rating, "comment": comment };
        await OpinionsService.addOpinion(user.user_id, productId, opinion)
        loadOpinions(productId)
    }

    const loadOpinions = useRef(() => {});

    loadOpinions.current = async () => {
        const res = await OpinionsService.getAllForProduct(productId, page);
        setPagination(res.data)
        console.log(res.data.content)
        setOpinions(res.data.content)
    }



    useEffect(() => {
        loadOpinions.current()
    }, [page])

    return (
        <div className='container'>
            {user.logged === 1 ? (
            <div className='container'>
                    <div className='row m-5'>
                        <div className='d-flex justify-content-center'>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, value) => {
                                    setRating(value);
                                }}
                            />
                        </div>
                        <div className="mt-3 mt-3">
                            <label htmlFor="comment">Opinia:</label>
                            <textarea  className="form-control" rows="5" id="comment" onChange={(e) => setComment(e.target.value)} name="text"></textarea>
                        </div>
                        <Button onClick={() => {addOpinion()}}>Dodaj opinię</Button>
                    </div>
            </div>
            ): 
            <div className='container p-5'>
                <div className='d-flex justify-content-center'>
                    <h1 style={{textAlign: 'center'}}>Zaloguj się, aby dodać opinię!</h1>
                </div>
            </div>
            }

            {opinions.length === 0 ? (
                <div className="row  d-flex justify-content-center p-2">
                    <h1 class='text-center'>Brak opinii</h1>
                </div>
            ): (
                <div className="row  d-flex justify-content-center">

                        <div className="col-md-8">

                            <div className="headings d-flex justify-content-between align-items-center mb-3">
                                <h5>Liczba opinii: {pagination.totalElements}</h5>
                            </div>
                            {opinions.map((opinion) => {
                                return (
                                <div className="card p-3 m-3" key={opinion.idOpinion}>
                                    <div className="d-flex justify-content-between align-items-center">

                                        <div className="user d-flex flex-row align-items-center">

                                            <span><small className="font-weight-bold text-primary">{opinion.usersOpinion.name}</small></span>

                                        </div>
                                        <Rating
                                            name="read-only"
                                            value={opinion.rating}
                                            readOnly
                                        />
                                    </div>
                                    <span><small className="font-weight-bold">{opinion.comment}</small></span>
                                </div>
                                )
                             })}
                        </div>
                    <div className='d-flex justify-content-center mb-2'>
                        <Pagination count={pagination.totalPages} onChange={handleChange}></Pagination>
                    </div>
                </div>
                )}
            <div/>
        </div>
    )

}

export default Opinions;