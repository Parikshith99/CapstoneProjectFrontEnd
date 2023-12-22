import React from "react";
import MoviesItem from "./MoviesItem";

function ShowCart(props) {
  return (
    <>
      {props.cart.length <= 0 ? (
        <div className="text-center my-5">
          <h1>No Items to display</h1>
        </div>
      ) : (
        <div className="container my-4">
          <div className="row">
            {props.cart.map((element, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <MoviesItem
                    details={{
                      id: element.id,
                      name: element.name,
                      price: element.price,
                      language: element.language,
                      description: element.description,
                      date: element.date,
                      imageurl: require(`../images/Movie.jpg`),
                      catname: element.catname,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ShowCart;
