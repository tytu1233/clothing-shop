import React, { useEffect, useState, useContext } from 'react';
import '../../styles/details.css'
import Opinions from "./Opinions";
import { useCart } from "react-use-cart";
import { useParams } from 'react-router-dom';
import ProductsService from '../../Services/ProductsService';
import CustomizedToast from '../Toast/CustomizedToast';
import { UserContext } from '../../other/UserContext';

const Details = () => {

    const {id} = useParams();
    const { addItem } = useCart();
    const [product, setProduct] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const { user } = useContext(UserContext);

    const getProduct = async () => {
        const res = await ProductsService.getById(id);
        setProduct(res.data);
        console.log(res.data)
        setLoading(false);
    }

    const addToCart = (i) => {
        addItem(i)
        setOpen(true);
        const interval = setInterval(() => {
            setOpen(false);
        }, 2000);
          return () => clearInterval(interval);
    }


    useEffect(() => {
        getProduct();
    }, [])

    if (isLoading) {
        return <div className="App">Loading...</div>;
      }
    return (
        <div>
            <div className="container mt-5 mb-5">
                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-6 border-end">
                            <div className="d-flex flex-column justify-content-center">
                                <div class="ecommerce-gallery" data-mdb-zoom-effect="true" data-mdb-auto-height="true">
                                    <div id="carouselExampleControls" class="carousel carousel-dark slide" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                            <img src={require("../../img/product/product-1.jpg")} class="d-block w-100" alt="..."/>
                                            </div>
                                            <div class="carousel-item">
                                            <img src={require("../../img/product/product-2.jpg")} class="d-block w-100" alt="..."/>
                                            </div>
                                            <div class="carousel-item">
                                            <img src={require("../../img/product/product-3.jpg")} class="d-block w-100" alt="..."/>
                                            </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-3 right-side">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3>{product.name}</h3>
                                </div>
                                <div className="mt-2 pr-3 content"><p>{product.description}</p></div>
                                <h3>{product.price} zł</h3>
                                <div className="ratings d-flex flex-row align-items-center">
                                    <div className="d-flex flex-row"><i className='bx bxs-star'></i> <i
                                        className='bx bxs-star'></i> <i className='bx bxs-star'></i> <i
                                        className='bx bxs-star'></i> <i className='bx bx-star'></i></div>
                                    <span>441 ocen</span></div>
                                <div className="buttons d-flex flex-row mt-5 gap-3">
                                    <button className="btn btn-dark" onClick={() => {addToCart(product)}}>Dodaj do koszyka</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomizedToast open={open} text={"Dodano do koszyka!"}/>
            <Opinions productId={product.id}/>
        </div>
    );
}

export default Details;