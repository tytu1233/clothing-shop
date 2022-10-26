import React from 'react';
import '../../styles/details.css'
import Opinions from "./Opinions";
import Footer from "../MainPage/Footer";
import Navbar from "../MainPage/Navbar";


const Details = () => {

    return (
        <div>
            <div className="container mt-5 mb-5">
                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-6 border-end">
                            <div className="d-flex flex-column justify-content-center">
                                <div className="main_image"><img src="https://i.imgur.com/TAzli1U.jpg"
                                                                 id="main_product_image" width="350"/></div>
                                <div className="thumbnail_images">
                                    <ul id="thumbnail">
                                        <li><img onClick="changeImage(this)" src="https://i.imgur.com/TAzli1U.jpg"
                                                 width="70"/></li>
                                        <li><img onClick="changeImage(this)" src="https://i.imgur.com/w6kEctd.jpg"
                                                 width="70"/></li>
                                        <li><img onClick="changeImage(this)" src="https://i.imgur.com/L7hFD8X.jpg"
                                                 width="70"/></li>
                                        <li><img onClick="changeImage(this)" src="https://i.imgur.com/6ZufmNS.jpg"
                                                 width="70"/></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-3 right-side">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3>IIlana</h3>
                                </div>
                                <div className="mt-2 pr-3 content"><p>Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p></div>
                                <h3>$430.99</h3>
                                <div className="ratings d-flex flex-row align-items-center">
                                    <div className="d-flex flex-row"><i className='bx bxs-star'></i> <i
                                        className='bx bxs-star'></i> <i className='bx bxs-star'></i> <i
                                        className='bx bxs-star'></i> <i className='bx bx-star'></i></div>
                                    <span>441 reviews</span></div>
                                <div className="mt-5"><span className="fw-bold">Color</span>
                                    <div className="colors">
                                        <ul id="marker">
                                            <li id="marker-1"></li>
                                            <li id="marker-2"></li>
                                            <li id="marker-3"></li>
                                            <li id="marker-4"></li>
                                            <li id="marker-5"></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="buttons d-flex flex-row mt-5 gap-3">
                                    <button className="btn btn-dark">Add to Basket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Opinions/>
        </div>
    );
}

export default Details;