import React from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
function Adminhome() {
  let history = useNavigate();
  return (
    <div>
      <AdminNavbar setSearchBar={false} />
      {localStorage.getItem("admin") ? (
        <div className="d-grid gap-4 col-6 mx-auto my-5">
          <button
            onClick={() => {
              history("/addMovie");
            }}
            className="btn btn-outline-dark  btn-lg"
            type="button"
          >
            Add Movies
          </button>
          <button
            onClick={() => {
              history("/removeCategory");
            }}
            className="btn btn-outline-dark btn-lg"
            type="button"
          >
            Remove category
          </button>
          <button
            onClick={() => {
              history("/adminMovie");
            }}
            className="btn btn-outline-dark btn-lg"
            type="button"
          >
            Delete Movies
          </button>
          <button
            onClick={() => {
              history("/adminMovie");
            }}
            className="btn btn-outline-dark btn-lg"
            type="button"
          >
            Edit Movies
          </button>
          <button
            onClick={() => {
              history("/adminMovie");
            }}
            className="btn btn-outline-dark btn-lg"
            type="button"
          >
            All Movies
          </button>
        </div>
      ) : (
        <div className="text-center my-5">
          <h1>Login To continue</h1>
        </div>
      )}
    </div>
  );
}

export default Adminhome;
