import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SingleMovie(props) {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  let history = useNavigate();
  const getMovie = async () => {
    let url = `${props.baseUrl}/singlemovie/${id}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setMovie(parsedData);
  };
  const addToCart = async () => {
    if (!localStorage.getItem("token")) {
      history("/login");
    } else {
      let url = `${props.baseUrl}/user/addToCart/${id}`;
      let data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      let parsedData = await data.json();
      console.log(parsedData);
      if (parsedData) {
        props.setCount(props.count + 1);
        props.showAlert("Added to cart successfully", "success");
      } else {
        props.showAlert(
          "Something went wrong..could not be added to the cart",
          "danger"
        );
      }
    }
    // setMovie(parsedData);
  };
  useEffect(() => {
    getMovie();

    if (localStorage.getItem("token")) {
      props.getCartCount();
    }
    // eslint-disable-next-line
  }, []);
  const capitalizeFirstLetter = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  };
  return (
    <>
      <div className="container">
        <div
          className="card"
          style={{
            maxWidth: "100rem",
            marginTop: "2rem",
            marginBottom: "100px",
          }}
        >
          <div className="row g-0">
            <div className="col-md-7">
              <img
                src={
                  movie.name
                    ? require(`../images/${movie.name.toLowerCase()}.jpg`)
                    : require(`../images/default.jpg`)
                }
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-5">
              <div className="card-body">
                <h3 className="card-title">
                  {movie.name && capitalizeFirstLetter(movie.name)}
                </h3>
                <h6 className="card-text">
                  {movie.description &&
                    capitalizeFirstLetter(movie.description)}
                </h6>
                <p className="card-text">
                  {movie.language && capitalizeFirstLetter(movie.language)}
                </p>
                <p className="card-text">&#8377; {movie.price}</p>
                <p className="card-text text-muted">Date: {movie.date}</p>
                <p className="card-text">
                  <small className="text-muted">Time: {movie.time}</small>
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    !localStorage.getItem("token")
                      ? history("/login")
                      : props.showAlert("Loading...", "warning");
                  }}
                  className="btn btn-outline-success mx-2"
                  data-bs-toggle="modal"
                  data-bs-target={
                    localStorage.getItem("token") ? "#staticBackdrop" : ""
                  }
                >
                  Buy Ticket
                </button>
                <button
                  type="button"
                  onClick={addToCart}
                  className="btn btn-outline-warning"
                >
                  Add to cart
                </button>
              </div>
              <div className="card-footer">
                Genre: {movie.catname && capitalizeFirstLetter(movie.catname)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Processing Payment...
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Click OK to confirm payment</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-success" id="exampleModalLabel">
                Payment Successfull
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h5>{movie.name && capitalizeFirstLetter(movie.name)}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {movie.name && capitalizeFirstLetter(movie.language)}
              </h6>
              <p className="card-text">
                {movie.description && capitalizeFirstLetter(movie.description)}
              </p>

              <h6 className="card-subtitle mb-2">
                &#x20b9; {movie.price && movie.price}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Date: {movie.date && movie.date}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Time: {movie.time && capitalizeFirstLetter(movie.time)}
              </h6>

              <h6>{movie.catname && capitalizeFirstLetter(movie.catname)}</h6>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Continue shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleMovie;
