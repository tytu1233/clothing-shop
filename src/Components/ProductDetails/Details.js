import React, { useEffect, useState, useRef } from 'react';
import '../../styles/details.css'
import Opinions from "./Opinions";
import { useCart } from "react-use-cart";
import { useParams } from 'react-router-dom';
import ProductsService from '../../Services/ProductsService';
import CustomizedToast from '../Toast/CustomizedToast';
import ServiceSizes from '../../Services/ServiceSizes';
import Loader from '../Loader';

const Details = () => {

    const {id} = useParams();
    const { addItem, items } = useCart();
    const [product, setProduct] = useState([]);
    const [sizeFilters, setSizeFilters] = useState('')
    const [sizes, setSizes] = useState([]);
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('')
    const [isLoading, setLoading] = useState(true);

    const getProduct = useRef(() => {});

    getProduct.current = async () => {
        const res = await ProductsService.getById(id);
        setProduct(res.data);
        console.log(res.data)
        setLoading(false);
        const response = await ServiceSizes.getSizesForProduct(id)
        console.log(response.data)
        setSizes(response.data)
    }

    const addToCart = (i) => {
            if(sizeFilters.length === 0) {
                setText('Wybierz rozmiar!')
                setOpen(true);
                const interval = setInterval(() => {
                    setOpen(false);
                }, 2000);
                return () => clearInterval(interval);
            }
            let zmienna = i.id + sizeFilters
            const index = items.findIndex((item) => item.id === zmienna );
            console.log(index)
            if(index === -1) {
                i = {
                    id: i.id + sizeFilters,
                    price: i.price,
                    name: i.name,
                    size: sizeFilters,
                    image: i.image
                } 
                addItem(i)
            }
            if(index !== -1){
                i = {
                    id: items[index].id,
                    price: items[index].price,
                    name: items[index].name,
                    size: sizeFilters,
                    image: items[index].image,
                } 
                addItem(i)
            }
        setText('Dodano do koszyka!')
        setOpen(true);
        const interval = setInterval(() => {
            setOpen(false);
        }, 2000);
        
          return () => clearInterval(interval);
        
    }


    const handleCheckboxes = (e) => {
        setSizeFilters(e.target.value)
        console.log(e.target.value)
        setName(e.target.id)
    }

    useEffect(() => {
        getProduct.current();
    }, [])

    if (isLoading) {
        return <Loader/>;
      }
    return (
        <div>
            <div className="container mt-5 mb-5">
                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-6 border-end">
                            <div className="d-flex flex-column justify-content-center">
                                <div className="ecommerce-gallery" data-mdb-zoom-effect="true" data-mdb-auto-height="true">
                                    <div id="carouselExampleControls" className="carousel carousel-dark slide" data-bs-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                            <img src={require(`../../img/product/${product.image}`)} className="d-block w-100" alt="..."/>
                                            </div>
                                            <div className="carousel-item">
                                            <img src={require("../../img/product/product-2.jpg")} className="d-block w-100" alt="..."/>
                                            </div>
                                            <div className="carousel-item">
                                            <img src={require("../../img/product/product-3.jpg")} className="d-block w-100" alt="..."/>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
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
                                    <div className="shop__sidebar__size">
                                        {sizes.map((size) => {
                                            return(
                                                <label 
                                                style={name === size.sizeName ? {backgroundColor:'black', color: 'white'} : {backgroundColor:'white', color: 'black'}} 
                                                key={size.idSize} htmlFor={size.sizeName}>{size.sizeName}
                                                    <input onClick={handleCheckboxes} type="radio" value={size.sizeName} id={size.sizeName}/>
                                                </label>
                                            )
                                        })}
                                        </div>
                                </div>
                                <div className="buttons d-flex flex-row mt-5 gap-3">
                                    <button className="btn btn-dark" onClick={() => {addToCart(product)}}>Dodaj do koszyka</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomizedToast open={open} text={text}/>
            <Opinions productId={product.id}/>
        </div>
    );
}

export default Details;