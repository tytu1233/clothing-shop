import React, { useEffect, useState } from 'react'
import '../../styles/products.css'
import ProductsService from '../../Services/ProductsService';
import { Pagination } from '@mui/material';
import CustomizedToast from '../Toast/CustomizedToast';
import { Link } from 'react-router-dom';
import ServiceSizes from '../../Services/ServiceSizes';
import CategoriesService from '../../Services/CategoriesService';
import Loader from '../Loader';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {


    const [names, setNames] = useState([]);
    const [products, setProducts] = useState([]);
    const [producers, setProducers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brandFiltered, setBrandFiltered] = useState([])
    const [categoriesFiltered, setCategoriesFiltered] = useState([])
    const [sizeFiltered, setSizeFiltered] = useState([])
    const [pagination, setPagination] = useState([]);
    const [page, setPage] = useState(0);
    const [open, setOpen] = useState(false);
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(2000000000)
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(true);

    const handleChange = (e, p) => {
        setPage(p-1)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const loadNames = async () => {
        const res = await ServiceSizes.getAllNames();
        setNames(res.data)
        //console.log(res.data)
        setLoading(false)
    }

    const loadProducers = async () => {
        const res = await ProductsService.getProducers();
        setProducers(res.data)
        //console.log(res.data)
    }

    const loadCategories = async () => {
        const res = await CategoriesService.getAllCategories();
        setCategories(res.data.content)
    }

    const loadProducts = async () => {
        //console.log(brandFiltered)
        if(max < min) {
            setError("Max nie wieksze od min")
            
        } else 
            setError('')
        //console.log(sizeFiltered)
        if(brandFiltered.length > 0 || sizeFiltered.length > 0) setPage(0)
        await ProductsService.getFilteredData(brandFiltered, sizeFiltered, categoriesFiltered, min, max, page).then((res) => {
            setProducts(res.data.content);
            setPagination(res.data)
            //console.log(res.data)
            //console.log(res.data.content)
        })
        //console.log(list)
    }

    const handleCheckboxes = (e) => {
        if(e.target.name === "brand") {
            
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
        else if(e.target.name === "size") {
            console.log(e.target.value)
            let prev = sizeFiltered;
            let itemIndex = prev.indexOf(e.target.value);
    
            if (itemIndex !== -1) {
            prev.splice(itemIndex, 1);
            } else {
            prev.push(e.target.value);
            }
            setSizeFiltered([...sizeFiltered]);
        }else if(e.target.name === "categories") {
            console.log(e.target.value)
            let prev = categoriesFiltered;
            let itemIndex = prev.indexOf(e.target.value);
    
            if (itemIndex !== -1) {
            prev.splice(itemIndex, 1);
            } else {
            prev.push(e.target.value);
            }
            setCategoriesFiltered([...categoriesFiltered]);
        }
        //console.log(categoriesFiltered)
        //console.log(max)
    }

    useEffect(() => {
        loadProducts();
        loadNames();
        loadProducers();
        loadCategories();
    },[brandFiltered, sizeFiltered, min, max, page, categoriesFiltered])

    if (isLoading) {
        return <Loader/>;
      }
  return (
        <div className="container p-4">
            <div className="row">
                <div className="col-lg-3">
                    <div className="shop__sidebar">
                        <div className="shop__sidebar__accordion">
                            <div className="accordion" id="accordionExample">
                            <div className="card">
                                    <div>
                                        <p>Kategorie</p>
                                    </div>
                                        <div className="card-body">
                                            <div className="shop__sidebar__brand">
                                            {categories.map((category) => {
                                                return (
                                                    <div className="form-check" key={category.idCategory}>
                                                        <input className="form-check-input" 
                                                            onChange={handleCheckboxes}
                                                            value={category.categoryName}
                                                            name="categories"
                                                            type="checkbox" id="flexCheckDefault"/>
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {category.categoryName}
                                                        </label>
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div>
                                        <p>Producenci</p>
                                    </div>
                                        <div className="card-body">
                                            <div className="shop__sidebar__brand">
                                            {producers.map((producer) => {
                                                return (
                                                    <div className="form-check" key={producer.brand}>
                                                        <input className="form-check-input" 
                                                            onChange={handleCheckboxes}
                                                            value={producer.brand}
                                                            name="brand"
                                                            type="checkbox" id="flexCheckDefault"/>
                                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {producer.brand}
                                                        </label>
                                                    </div>
                                                    )
                                                })}
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
                                                
                                                <div className="row">
                                                    <div className="col">
                                                        <input name="min" min={max} onChange={handleCheckboxes} type="number" className="form-control" placeholder="Min"/>
                                                    </div>
                                                    <div className="col">
                                                        <input name="max" onChange={handleCheckboxes} type="number" className="form-control" placeholder="Max"/>
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
                                                {names.map((name) => {
                                                    return (
                                                        <label
                                                        style={{
                                                            backgroundColor: sizeFiltered.includes(name.sizeName) ? 'black' : 'white',
                                                            color: sizeFiltered.includes(name.sizeName) ? 'white' : 'black',
                                                          }}
                                                        key={name.idSize} htmlFor={name.sizeName}>{name.sizeName}
                                                            <input onChange={handleCheckboxes} value={name.sizeName} name="size" type="checkbox" id={name.sizeName}/>
                                                        </label>
                                                    )
                                                })}
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
                        <AnimatePresence>
                    {products.map((product) => {
                        return <motion.div animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} layout className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                            <Link to={`/details/${product.id}`}>
                                <div className='row'>
                                    <img src={require('../../img/product/product-1.jpg')}/>
                                </div>
                            </Link>
                            <div className='row'>
                                    <div className='col-8'>
                                        <h5>{product.name}</h5>
                                        <h6>{product.brand}</h6>
                                        
                                    </div>
                                    <div className='col-4'>
                                        <h6 className='text-end'>{product.price} zł</h6>
                                    </div>
                            </div>
                        </motion.div>
                        })}
                        </AnimatePresence>
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