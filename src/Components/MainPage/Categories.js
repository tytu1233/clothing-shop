import React, { useEffect, useState } from 'react'
import ProductsService from '../../Services/ProductsService';
import OpinionsService from '../../Services/OpinionsService';
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useNavigate } from 'react-router'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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

const Categories = () => {

    const navigate = useNavigate();

    const [recommended, setRecommended] = useState([]);

    const getCategories = async () => {
        const res = await ProductsService.getRecommended();
        setRecommended(res.data);
        console.log(res.data)
        const response = await OpinionsService.getHighRated();
        console.log(response.data)
    }

    useEffect(() => {
        getCategories();
    }, [])


  return (
    <div className='container p-3'>

        <div className='d-flex justify-content-center p-3'>
            <h1 className="display-6">Polecane produkty</h1>
        </div>
        <Carousel responsive={responsive}>
            {recommended.map((recommend)=>(
                <div style={{cursor: 'pointer'}} onClick={() => {navigate('/details/'+recommend.id)}} className='p-2'  key={recommend.id}>
                    <div className="position-relative">
                        <img src={require("../../img/product/product-5.jpg")} className="w-100"/>
                        <div className="position-absolute top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                        {recommend.name}
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    </div>
    
  )
}

export default Categories