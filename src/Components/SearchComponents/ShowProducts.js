import React from "react";
import '../../styles/showproducts.css'

const ShowProducts = ({ name, image, price }) => {
  console.log(name, image, price)
  return (
    <div className='products_container'>
      <div className='thumbnail'>
        <img src={require('../../img/slider2.jpg')} />
      </div>
      <h4 className='product_name'>{name}fdsfsdfsdfds</h4>
      <span className='product_price'>{price} zł</span>
    </div>
  );
}

export default ShowProducts
