import React, { useCallback, useEffect, useState } from 'react'
import '../../styles/products.css'
import { TfiShoppingCart } from "react-icons/tfi";
import ProductsService from '../../Services/ProductsService';
import { Pagination } from '@mui/material';
import { useCart } from "react-use-cart";
import CustomizedToast from '../Toast/CustomizedToast';
import { Link } from 'react-router-dom';

const Products = () => {

    const { addItem } = useCart();

    const [products, setProducts] = useState([]);
    const [brandFiltered, setBrandFiltered] = useState([])
    const [priceFiltered, setPriceFiltered] = useState([])
    const [pagination, setPagination] = useState([]);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(2000000000)
    const [error, setError] = useState('')

    const handleChange = (e, p) => {
        setPage(p-1)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const loadProducts = async () => {
        if(max < min) {
            setError("Max nie wieksze od min")
            
        } else 
            setError('')
        console.log("asfsaf")
        if(brandFiltered.length > 0 || priceFiltered.length > 0) setPage(0)
        await ProductsService.getFilteredData(brandFiltered, min, max, page).then((res) => {
            setProducts(res.data.content);
            setPagination(res.data)
            //console.log(res.data)
            //console.log(res.data.content)
        })
        //console.log(list)
    }

    const handleCheckboxes = (e) => {
        if(e.target.name === "brand") {
            //console.log(e.target.name)
            let prev = brandFiltered;
            let itemIndex = prev.indexOf(e.target.value);
    
            if (itemIndex !== -1) {
            prev.splice(itemIndex, 1);
            } else {
            prev.push(e.target.value);
            }
            setBrandFiltered([...brandFiltered]);
        } else if(e.target.name === "min")
            setMin(e.target.value)
        else if(e.target.name === "max")
            setMax(e.target.value)
        //console.log(min)
        //console.log(max)
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
        loadProducts();
    },[brandFiltered, min, max, page])

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
                                            <div className="form-check">
                                                <input className="form-check-input" 
                                                onChange={handleCheckboxes}
                                                value="nike"
                                                name="brand"
                                                type="checkbox" id="flexCheckDefault"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    nike
                                                </label>
                                                </div>
                                                <div className="form-check">
                                                <input className="form-check-input" 
                                                onChange={handleCheckboxes}
                                                value="adik"
                                                name="brand"
                                                type="checkbox"  id="flexCheckChecked" />
                                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                                    adik
                                                </label>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div>
                                        <p>Cena</p>
                                    </div>
                                        <div className="card-body">
                                            <div className="shop__sidebar__price">
                                            <form>
                                                
                                                <div class="row">
                                                    <div class="col">
                                                        <input name="min" min={max} onChange={handleCheckboxes} type="number" class="form-control" placeholder="Min"/>
                                                    </div>
                                                    <div class="col">
                                                        <input name="max" onChange={handleCheckboxes} type="number" class="form-control" placeholder="Max"/>
                                                    </div> 
                                                    {error === "Max nie wieksze od min" ? (<p style={{color: 'red'}}>Cena minimalna musi być większa od maksymalnej</p>) : null}
                                                </div>
                                            </form>
                                            </div>
                                        </div>
                                </div>
                                <div className="card">
                                    <div>
                                        <p>Rozmiar</p>
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
                        return <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                            <Link to={`/details/${product.id}`}>
                                <div className='row'>
                                    <img src={require('../../img/product/product-1.jpg')}/>
                                </div>
                            </Link>
                            <div className='row'>
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