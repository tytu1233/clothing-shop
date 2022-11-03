import React from "react";
import '../../styles/showproducts.css'

const ShowProducts = ({ name, image, price }) => {

  return (
    <div className='products_container'>
      <div className='thumbnail'>
        <img src={image} />
      </div>
      <h4 className='product_name'>{name}</h4>
      <span className='product_price'>{price || "N/A"}</span>
    </div>
  );
}

export default ShowProducts
