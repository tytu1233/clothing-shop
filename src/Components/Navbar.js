import React from 'react'
import SearchBar from './SearchBar'
import Men from './Men'
import Women from './Women'

const Navbar = () => {
  return (
    <div>
        <SearchBar/>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#111111',}}>
            <div className="container">
                <a className="navbar-brand text-light border-2 border-end pe-4" href="#">NOX CLOTHING</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">MĘŻCZYZNA</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample2">KOBIETA</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <input type='text' data-bs-toggle="collapse" href="#multiCollapseExample3" role="button" aria-expanded="false" aria-controls="multiCollapseExample3"/>
                        </li>
                    </ul>
                    <div className='d-flex justify-content-round'>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active">LOGOWANIE</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active">REJESTRACJA</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active">KOSZYK</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </nav>
        <Men/>
        <Women/>
    </div>
  )
}

export default Navbar