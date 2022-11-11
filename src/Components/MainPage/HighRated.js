import React, { useEffect, useState } from 'react'
import OpinionsService from '../../Services/OpinionsService';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Rating from "@mui/material/Rating";
import { useNavigate } from 'react-router'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const HighRated = () => {

    const navigate = useNavigate();

    const [rated, setRated] = useState([]);

    const getRated = async () => {
        const response = await OpinionsService.getHighRated();
        console.log(response.data)
        setRated(response.data)
    }

    useEffect(() => {
        getRated();
    }, [])


  return (
    <div className='container p-3'>

        <div className='d-flex justify-content-center p-3'>
            <h1 className="display-6">Najwyżej oceniane produkty</h1>
        </div>
        <Carousel responsive={responsive}>
            {rated.map((rating)=>(
                <div style={{cursor: 'pointer'}} onClick={() => {navigate('/details/'+rating[0].id)}} className='p-2'  key={rating[0].id}>
                    <div className="position-relative">
                        <img src={require("../../img/product/product-5.jpg")} className="w-100"/>
                        <div className="position-absolute top-0 left-0 d-flex justify-content-center align-items-end w-100 h-100 text-white fs-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <Rating 
                            value={rating[1]}
                            precision={0.5}
                            readOnly
                        />
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    </div>
    
  )
}

export default HighRated