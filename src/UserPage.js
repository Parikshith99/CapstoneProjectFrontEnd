import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function UserPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="container-fluid">
      <nav className="navbar bg-gradient fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MyMoviePlan
          </Link>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link
                className="nav-link navbar-brand"
                aria-current="page"
                to="/home"
              >
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-brand" to="/adminLogin">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        style={{ marginTop: "-27px" }}
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={require(`./images/carousel-1.jpg`)}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={require(`./images/carousel-2.jpg`)}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={require(`./images/carousel-3.jpg`)}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="text-center my-4">
        <button type="button" className="btn btn-success btn-lg">
          <Link className="text-decoration-none text-light" to="/home">
            Get Started
          </Link>
        </button>
      </div>
    </div>
  );
}

export default UserPage;
