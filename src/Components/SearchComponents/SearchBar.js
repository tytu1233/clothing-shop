import React from 'react'
import { TfiClose } from "react-icons/tfi";
import { SearchText } from './SearchText';

const SearchBar = () => {
  return (
        <div className="position-relative" style={{zIndex:'500',}}>
                <div className="position-absolute top-0" style={{width: '100%', height: '25%'}}>
                    <div className="collapse multi-collapse" id="multiCollapseExample3">
                        <div className='container-fluid g-0'>
                            <div className="row g-0" style={{backgroundColor: 'white',}}>
                                <div className='col-md-12'>
                                    <div className='d-flex justify-content-between p-3'>
                                        <div>NOX-CLOTHING</div>
                                        <div><TfiClose data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3"/></div>
                                    </div>
                                </div>
                            <div style={{height: '1200px',}} className='d-flex justify-content-center p-4'>
                                <SearchText/>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default SearchBar