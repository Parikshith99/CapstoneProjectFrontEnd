import React from "react";
import MoviesItem from "./MoviesItem";

function Search(props) {
  return (
    <>
      {props.searchData.length <= 0 ? (
        <div className="text-center my-5">
          <h1>No results to display</h1>
        </div>
      ) : (
        <div className="container my-5">
          <div className="row">
            {props.searchData.map((element) => {
              return (
                <div className="col-md-4" key={element.id}>
                  <MoviesItem
                    details={{
                      id: element.id,
                      name: element.name,
                      price: element.price,
                      language: element.language,
                      description: element.description,
                      date: element.date,
                      imageurl: require(`../images/${element.name.toLowerCase()}.jpg`),
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

export default Search;
