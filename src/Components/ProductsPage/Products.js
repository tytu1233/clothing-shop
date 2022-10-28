import React, { useEffect, useState } from 'react'
import '../../styles/products.css'
import { TfiShoppingCart } from "react-icons/tfi";
import ProductsService from '../../Services/ProductsService';
import { Pagination } from '@mui/material';
import { useCart } from "react-use-cart";
import CustomizedToast from '../Toast/CustomizedToast';

const Products = () => {

    const { addItem } = useCart();

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);

    const handleChange = (e, p) => {
        console.log(e,p)
        setPage(p-1)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const addToCart = (i) => {
        const interval = setInterval(() => {
            setOpen(false);
        }, 2000);
          return () => clearInterval(interval);
    }

    const loadProducts = async () => {
        const res = await ProductsService.getAll(page)
        setProducts(res.data.content);
        setPagination(res.data)
        console.log(res.data)
    }


    useEffect(() => {
        loadProducts();
        console.log("effect" + page)
    }, [page])




  return (
        <div className="container p-4">
            <div className="row">
                <div className="col-lg-3">
                    <div className="shop__sidebar">
                        <div className="shop__sidebar__accordion">
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div>
                                        <p>Brands</p>
                                    </div>
                                        <div className="card-body">
                                            <div className="shop__sidebar__brand">
                                                <ul>
                                                    <li><a href="#">Louis Vuitton</a></li>
                                                    <li><a href="#">Chanel</a></li>
                                                    <li><a href="#">Hermes</a></li>
                                                    <li><a href="#">Gucci</a></li>
                                                </ul>
                                            </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div>
                                        <p>Filter Price</p>
                                    </div>
                                        <div className="card-body">
                                            
                                            <div className="shop__sidebar__price">
                                                <ul>
                                                    <li><a href="#">$0.00 - $50.00</a></li>
                                                    <li><a href="#">$50.00 - $100.00</a></li>
                                                    <li><a href="#">$100.00 - $150.00</a></li>
                                                    <li><a href="#">$150.00 - $200.00</a></li>
                                                    <li><a href="#">$200.00 - $250.00</a></li>
                                                    <li><a href="#">250.00+</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                </div>
                                <div className="card">
                                    <div>
                                        <p>Size</p>
                                    </div>
                                        <div className="card-body">
                                            <div className="shop__sidebar__size">
                                                <label htmlFor="xs">xs
                                                    <input type="radio" id="xs"/>
                                                </label>
                                                <label htmlFor="sm">s
                                                    <input type="radio" id="sm"/>
                                                </label>
                                                <label htmlFor="md">m
                                                    <input type="radio" id="md"/>
                                                </label>
                                                <label htmlFor="xl">xl
                                                    <input type="radio" id="xl"/>
                                                </label>
                                                <label htmlFor="2xl">2xl
                                                    <input type="radio" id="2xl"/>
                                                </label>
                                                <label htmlFor="xxl">xxl
                                                    <input type="radio" id="xxl"/>
                                                </label>
                                                <label htmlFor="3xl">3xl
                                                    <input type="radio" id="3xl"/>
                                                </label>
                                                <label htmlFor="4xl">4xl
                                                    <input type="radio" id="4xl"/>
                                                </label>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="shop__product__option">
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="shop__product__option__left">
                                    {products.length > 0 ?<p>Znaleziono {pagination.pageable.offset+1}-{pagination.pageable.offset+pagination.numberOfElements} z {pagination.totalElements}</p> : <p>Nie znaleziono elementów</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    {products.map((product) => {
                        return <div className="col-lg-4 col-md-6 col-sm-6" key={product.id_product}>
                            <div className='row'>
                                    <img src={require('../../img/product/product-1.jpg')}/>
                                    <div className='col-10'>
                                        <h6>{product.name}</h6>
                                        <h5>{product.price} zł</h5>
                                    </div>
                                    <div className='col-2'>
                                        <TfiShoppingCart onClick={() => addToCart(product)}/>
                                    </div>
                            </div>
                        </div>
                        })}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Pagination count={pagination.totalPages} onChange={handleChange}></Pagination>
                    </div>
                </div>
            </div>
            <CustomizedToast open={open} text={"Dodano do koszyka!"}/>
        </div>
  )
}

export default Products