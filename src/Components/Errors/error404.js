import React from "react";

const Error404 = () => {
    return(
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
            <h1 class="display-1 fw-bold">404</h1>
            <p class="fs-3"> <span class="text-danger">Opps!</span> Nie znaleziono storny.</p>
            <p class="lead">
               Strona, której szukasz nie istnieje
              </p>
            <a href="/" class="btn btn-primary">Strona główna</a>
        </div>
    </div>
    )
}

export default Error404;