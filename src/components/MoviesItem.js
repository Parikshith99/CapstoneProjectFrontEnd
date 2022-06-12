import React from "react";
import { useNavigate } from "react-router-dom";

function MoviesItem(props) {
  let { id, name, language, imageurl, catname } = props.details;
  let history = useNavigate();
  return (
    <div
      onClick={() => history(`/singlemovie/${id}`)}
      className="card zoom my-3"
      style={{ width: "20rem", cursor: "pointer" }}
    >
      <img src={imageurl} className="card-img-top " alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name.toUpperCase()}</h5>
        <p className="card-text">
          {language.charAt(0).toUpperCase() + language.slice(1)}
        </p>
      </div>
      <div className="card-footer">
        Genre: {catname.charAt(0).toUpperCase() + catname.slice(1)}
      </div>
    </div>
  );
}

export default MoviesItem;
