import React from "react";
import { useNavigate } from "react-router-dom";

function AdminMovieItem(props) {
  let { name, language, imageurl, catname } = props.details;
  let history = useNavigate();

  const handleDeleteMovie = async () => {
    const response = await fetch(
      `${props.baseUrl}/admin/deleteMovie/${name}/${language}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json) {
      props.showAlert("Deleted successfully", "success");
      history("/adminMovie");
    } else {
      props.showAlert("Something went wrong", "danger");
    }
  };

  return (
    <div
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
        <button
          type="button"
          onClick={() => {
            props.editNote(props.details);
          }}
          className="btn btn-outline-warning"
          style={{ marginLeft: "20px" }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            handleDeleteMovie();
          }}
          type="button"
          className="btn btn-outline-danger mx-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminMovieItem;
