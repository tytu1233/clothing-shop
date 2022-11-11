import React from 'react'
import Navbar from "./Navbar";
import Slider from "./Slider";
import Categories from "./Categories";
import Footer from "./Footer";
import HighRated from './HighRated';


const Main = () => {
    return (
        <div>
            <Slider/>
            <Categories/>
            <HighRated/>
        </div>
    )

}

export default Main;