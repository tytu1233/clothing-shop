import React from "react";
import '../../styles/showproducts.css'
import { useNavigate } from 'react-router'


const ShowProducts = ({idProduct, name, image, price }) => {
  const navigate = useNavigate();
  const changeLocation = (placeToGo) => {
    navigate(placeToGo, { replace: true });
    window.location.reload();
}
  return (
    <div onClick={() => {changeLocation(`/details/${idProduct}`)} } className='products_container'>
      <div className='thumbnail'>
        <img style={{width: '100px', height: '80px'}} alt="product" src={require(`../../img/product/${image}`)} />
      </div>
      <h4 className='product_name'>{name}</h4>
      <span className='product_price'>{price} zł</span>
    </div>
  );
}

export default ShowProducts
