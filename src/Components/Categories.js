import React from 'react'
import Slider from './Slider'

const Categories = () => {
  return (
    <div className='container p-3'>
        <div className='d-flex justify-content-center p-3'>
            <h1 className="display-6">Przykładowe kategorie</h1>
        </div>
        <div className='d-flex justify-content-around'>
            <div className='row'>
                <div className='col-md-3 col-sm-6 p-2'>
                    <div className="position-relative">
                        <img src="https://static.mohito.com/media/catalog/product/9/0/9028Q-76X-050-1-551125_5.jpg" className="w-100"/>
                        <div className="position-absolute top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                        Hello Mask
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6 p-2'>
                    <div className="position-relative">
                        <img src="https://static.mohito.com/media/catalog/product/9/0/9028Q-76X-050-1-551125_5.jpg" className="w-100"/>
                        <div className="position-absolute top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                        Hello Mask
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6 p-2'>
                    <div className="position-relative">
                        <img src="https://static.mohito.com/media/catalog/product/9/0/9028Q-76X-050-1-551125_5.jpg" className="w-100"/>
                        <div className="position-absolute top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                        Hello Mask
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-sm-6 p-2'>
                    <a href="https://www.facebook.com">
                    <div className="position-relative">
                        <img src="https://static.mohito.com/media/catalog/product/9/0/9028Q-76X-050-1-551125_5.jpg" className="w-100"/>
                        <div className="position-absolute top-0 left-0 d-flex justify-content-center align-items-center w-100 h-100 text-white fs-5" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
                        Hello Mask
                        </div>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Categories