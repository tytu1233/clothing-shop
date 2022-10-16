import React from 'react'

const SearchBar = () => {
  return (
        <div class="position-relative" style={{zIndex:'500',}}>
                <div class="position-absolute top-0" style={{width: '100%', height: '25%'}}>
                    <div className="collapse multi-collapse" id="multiCollapseExample3">
                        <div className='container-fluid g-0'>
                            <div class="row g-0" style={{backgroundColor: 'white',}}>
                                <div className='col-md-12'>
                                    <div className='d-flex justify-content-between'>
                                        <div>NAZWA</div>
                                        <div><input type='text'/></div>
                                        <div><button data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3">ZAMKNIJ</button></div>
                                    </div>
                                </div>
                                <div class="col-lg-8 col-md-12 p-2">
                                    <div className='d-flex justify-content-around'>
                                        <div>
                                            <div className='d-flex justify-content-center'><h5>Odzież</h5></div>
                                            <ul class="list-group list-group-light list-group-small">
                                            <li class="list-group-item border-0 border-bottom">An item</li>
                                                <li class="list-group-item border-0 border-bottom">A second item</li>
                                                <li class="list-group-item border-0 border-bottom">A third item</li>
                                                <li class="list-group-item border-0 border-bottom">A fourth item</li>
                                                <li class="list-group-item border-0 border-bottom">And a fifth one</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className='d-flex justify-content-center'><h5>Buty</h5></div>
                                            <ul class="list-group list-group-light list-group-small">
                                                <li class="list-group-item border-0 border-bottom">An item</li>
                                                <li class="list-group-item border-0 border-bottom">A second item</li>
                                                <li class="list-group-item border-0 border-bottom">A third item</li>
                                                <li class="list-group-item border-0 border-bottom">A fourth item</li>
                                                <li class="list-group-item border-0 border-bottom">And a fifth one</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <div className='d-flex justify-content-center'><h5>Akcesoria</h5></div>
                                            <ul class="list-group list-group-light list-group-small">
                                                <li class="list-group-item border-0 border-bottom">An item</li>
                                                <li class="list-group-item border-0 border-bottom">A second item</li>
                                                <li class="list-group-item border-0 border-bottom">A third item</li>
                                                <li class="list-group-item border-0 border-bottom">A fourth item</li>
                                                <li class="list-group-item border-0 border-bottom">And a fifth one</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-12">
                                    <div className='d-flex justify-content-center'>
                                        <img src='https://www.cropp.com/media/SHARED/stronywizerunkowe/cropp/cms/grafiki_menu/Trends_AW22/popunk.jpg'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default SearchBar