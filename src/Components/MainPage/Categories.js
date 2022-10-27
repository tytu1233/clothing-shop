import React, { useEffect, useState } from 'react'
import CategoriesService from '../../Services/CategoriesService'

const Categories = () => {

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const res = await CategoriesService.getForMainPageCategories();
        setCategories(res.data);
        console.log(res.data)
    }

    useEffect(() => {
        getCategories();
    }, [])


  return (
    <div className='container p-3'>

        <div className='d-flex justify-content-center p-3'>
            <h1 className="display-6">Przykładowe kategorie</h1>
        </div>
        <div className='d-flex justify-content-around'>
            <div className='row'>
            {categories.map((cat)=>(
                <div className='col-md-3 col-sm-6 p-2' key={cat.id_category}>
                    <div className="position-relative">
                        <img src={require("../../img/product/product-5.jpg")} className="w-100"/>
                        <div className="position-absolute top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                        {cat.category_name}
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
    
  )
}

export default Categories