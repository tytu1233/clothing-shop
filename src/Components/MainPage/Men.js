import React from 'react'

const Men = () => {
  return (
    <div className="position-relative" style={{zIndex:'500',}}>
    <div className="position-absolute" style={{width: '100%', height: '25%'}}>
        <div className="collapse multi-collapse" id="multiCollapseExample1">
            <div className='container-fluid g-0'>
                <div className="row g-0" style={{backgroundColor: 'white',}}>
                    <div className="col-lg-8 col-md-12 p-2">
                        <div className='d-flex justify-content-around'>
                            <div>
                                <div className='d-flex justify-content-center'><h5>Odzież</h5></div>
                                <ul className="list-group list-group-light list-group-small">
                                <li className="list-group-item border-0 border-bottom">An item</li>
                                    <li className="list-group-item border-0 border-bottom">A second item</li>
                                    <li className="list-group-item border-0 border-bottom">A third item</li>
                                    <li className="list-group-item border-0 border-bottom">A fourth item</li>
                                    <li className="list-group-item border-0 border-bottom">And a fifth one</li>
                                </ul>
                            </div>
                            <div>
                                <div className='d-flex justify-content-center'><h5>Buty</h5></div>
                                <ul className="list-group list-group-light list-group-small">
                                    <li className="list-group-item border-0 border-bottom">An item</li>
                                    <li className="list-group-item border-0 border-bottom">A second item</li>
                                    <li className="list-group-item border-0 border-bottom">A third item</li>
                                    <li className="list-group-item border-0 border-bottom">A fourth item</li>
                                    <li className="list-group-item border-0 border-bottom">And a fifth one</li>
                                </ul>
                            </div>
                            <div>
                                <div className='d-flex justify-content-center'><h5>Akcesoria</h5></div>
                                <ul className="list-group list-group-light list-group-small">
                                    <li className="list-group-item border-0 border-bottom">An item</li>
                                    <li className="list-group-item border-0 border-bottom">A second item</li>
                                    <li className="list-group-item border-0 border-bottom">A third item</li>
                                    <li className="list-group-item border-0 border-bottom">A fourth item</li>
                                    <li className="list-group-item border-0 border-bottom">And a fifth one</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
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

export default Men