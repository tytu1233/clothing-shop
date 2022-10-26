import React from 'react'
import '../../styles/products.css'
import Footer from '../MainPage/Footer'
import Navbar from '../MainPage/Navbar'
import { TfiShoppingCart } from "react-icons/tfi";

const Products = () => {
  return (
    <div>
        <div class="container p-4">
            <div class="row">
                <div class="col-lg-3">
                    <div class="shop__sidebar">
                        <div class="shop__sidebar__accordion">
                            <div class="accordion" id="accordionExample">
                                <div class="card">
                                    <div>
                                        <p>Brands</p>
                                    </div>
                                        <div class="card-body">
                                            <div class="shop__sidebar__brand">
                                                <ul>
                                                    <li><a href="#">Louis Vuitton</a></li>
                                                    <li><a href="#">Chanel</a></li>
                                                    <li><a href="#">Hermes</a></li>
                                                    <li><a href="#">Gucci</a></li>
                                                </ul>
                                            </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div>
                                        <p>Filter Price</p>
                                    </div>
                                        <div class="card-body">
                                            <div class="shop__sidebar__price">
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
                                <div class="card">
                                    <div>
                                        <p>Size</p>
                                    </div>
                                        <div class="card-body">
                                            <div class="shop__sidebar__size">
                                                <label for="xs">xs
                                                    <input type="radio" id="xs"/>
                                                </label>
                                                <label for="sm">s
                                                    <input type="radio" id="sm"/>
                                                </label>
                                                <label for="md">m
                                                    <input type="radio" id="md"/>
                                                </label>
                                                <label for="xl">xl
                                                    <input type="radio" id="xl"/>
                                                </label>
                                                <label for="2xl">2xl
                                                    <input type="radio" id="2xl"/>
                                                </label>
                                                <label for="xxl">xxl
                                                    <input type="radio" id="xxl"/>
                                                </label>
                                                <label for="3xl">3xl
                                                    <input type="radio" id="3xl"/>
                                                </label>
                                                <label for="4xl">4xl
                                                    <input type="radio" id="4xl"/>
                                                </label>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="shop__product__option">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="shop__product__option__left">
                                    <p>Showing 1–12 of 126 results</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div className='row'>
                                <img src={require('../../img/product/product-1.jpg')}/>
                                    <div class='col-10'>
                                        <h6>Piqué Biker Jacket</h6>
                                        <h5>$67.24</h5>
                                    </div>
                                    <div className='col-2'>
                                        <TfiShoppingCart/>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div className='row'>
                                <img src={require('../../img/product/product-1.jpg')}/>
                                    <div class='col-10'>
                                        <h6>Piqué Biker Jacket</h6>
                                        <h5>$67.24</h5>
                                    </div>
                                    <div className='col-2'>
                                        <TfiShoppingCart/>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div className='row'>
                                <img src={require('../../img/product/product-1.jpg')}/>
                                    <div class='col-10'>
                                        <h6>Piqué Biker Jacket</h6>
                                        <h5>$67.24</h5>
                                    </div>
                                    <div className='col-2'>
                                        <TfiShoppingCart/>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div className='row'>
                                <img src={require('../../img/product/product-1.jpg')}/>
                                    <div class='col-10'>
                                        <h6>Piqué Biker Jacket</h6>
                                        <h5>$67.24</h5>
                                    </div>
                                    <div className='col-2'>
                                        <TfiShoppingCart/>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div className='row'>
                                <img src={require('../../img/product/product-1.jpg')}/>
                                    <div class='col-10'>
                                        <h6>Piqué Biker Jacket</h6>
                                        <h5>$67.24</h5>
                                    </div>
                                    <div className='col-2'>
                                        <TfiShoppingCart/>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product__pagination">
                                <a class="active" href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <span>...</span>
                                <a href="#">21</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Products