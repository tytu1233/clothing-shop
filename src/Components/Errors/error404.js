import React from "react";

const Error404 = () => {
    return(
    <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3"> <span className="text-danger">Opps!</span> Nie znaleziono storny.</p>
            <p className="lead">
               Strona, której szukasz nie istnieje
              </p>
            <a href="/" className="btn btn-primary">Strona główna</a>
        </div>
    </div>
    )
}

export default Error404;