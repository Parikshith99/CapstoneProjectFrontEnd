import React, { useEffect } from "react";
import MoviesItem from "./MoviesItem";
import PropTypes from "prop-types";

const Home = (props) => {
  const update = async () => {
    let url = `${props.baseUrl}/${props.category}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    if (parsedData.length > 0) {
      props.setSearchData(parsedData);
    } else {
      props.showAlert("No movies to display", "danger");
    }
  };
  useEffect(() => {
    update();

    if (localStorage.getItem("token")) {
      props.getCartCount();
      props.getUser();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {props.searchData.length > 0 ? (
        <div className="container mt-4" style={{ marginBottom: "60px" }}>
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
      ) : (
        <div className="text-center my-5">
          <h1>No movies to display</h1>
        </div>
      )}
    </>
  );
};
Home.defaultProps = {
  category: "general",
};
Home.propTypes = {
  category: PropTypes.string,
};

export default Home;
