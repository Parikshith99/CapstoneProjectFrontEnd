import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminMovieItem from "./AdminMovieItem";
import PropTypes from "prop-types";
import AdminNavbar from "./AdminNavbar";
function AdminMovie(props) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  let location = useLocation();
  let history = useNavigate();

  const update = async () => {
    let url = `${props.baseUrl}/${props.category}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    if (parsedData.length > 0) {
      setMovies(parsedData);
    } else {
      props.showAlert("No movies to display", "danger");
    }
  };

  const handleAdminSubmit = async () => {
    let url = `${props.baseUrl}/search/${search}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    if (parsedData.length > 0) {
      setMovies(parsedData);
    } else {
      props.showAlert("No Results found", "danger");
    }
  };

  useEffect(() => {
    update();
    // eslint-disable-next-line
  }, [location]);

  const ref = useRef(null);
  const submit = useRef(null);
  const [moviedetail, setMoviedetail] = useState({
    eid: "",
    ename: "",
    eprice: "",
    elanguage: "",
    edescription: "",
    edate: "",
    etime: "",
  });

  const editNote = (currentMovie) => {
    ref.current.click();
    setMoviedetail({
      eid: currentMovie.id,
      ename: currentMovie.name,
      eprice: currentMovie.price,
      elanguage: currentMovie.language,
      edescription: currentMovie.description,
      edate: currentMovie.date,
      etime: currentMovie.time,
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let url = `${props.baseUrl}/admin/editMovies/${moviedetail.eid}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: moviedetail.ename,
        price: moviedetail.eprice,
        language: moviedetail.elanguage,
        description: moviedetail.edescription,
        date: moviedetail.edate,
        time: moviedetail.etime,
      }),
    });
    let parsedData = await response.json();

    if (parsedData) {
      props.showAlert("Updated successfully", "success");
      history("/adminMovie");
    } else {
      props.showAlert("Something went wrong", "danger");
    }
  };

  const onChange = (e) => {
    setMoviedetail({ ...moviedetail, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AdminNavbar
        handleAdminSubmit={handleAdminSubmit}
        search={search}
        setSearch={setSearch}
        setSearchBar={true}
      />

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        demo
      </button>
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
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Movie
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleClick}>
                <div className="mb-3">
                  <input
                    type="hidden"
                    className="form-control"
                    value={moviedetail.eid}
                    id="eid"
                    name="eid"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={moviedetail.ename}
                    id="ename"
                    name="ename"
                    onChange={onChange}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={moviedetail.eprice}
                    id="eprice"
                    name="eprice"
                    onChange={onChange}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="language" className="form-label">
                    language
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="elanguage"
                    value={moviedetail.elanguage}
                    name="elanguage"
                    onChange={onChange}
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={moviedetail.edescription}
                    onChange={onChange}
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="edate"
                    value={moviedetail.edate}
                    name="edate"
                    onChange={onChange}
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etime"
                    value={moviedetail.etime}
                    name="etime"
                    onChange={onChange}
                    aria-describedby="emailHelp"
                  />
                </div>

                <button
                  ref={submit}
                  type="submit"
                  className="btn btn-primary d-none"
                >
                  Submit
                </button>
              </form>
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
                onClick={() => submit.current.click()}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {localStorage.getItem("admin") ? (
        <div>
          {movies.length > 0 ? (
            <div className="container mt-4" style={{ marginBottom: "60px" }}>
              <div className="row">
                {movies.map((element) => {
                  return (
                    <div className="col-md-4" key={element.id}>
                      <AdminMovieItem
                        details={{
                          id: element.id,
                          name: element.name,
                          price: element.price,
                          language: element.language,
                          description: element.description,
                          date: element.date,
                          time: element.time,
                          imageurl: require(`../images/Movie.jpg`),
                          catname: element.catname,
                        }}
                        baseUrl={props.baseUrl}
                        showAlert={props.showAlert}
                        editNote={editNote}
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
        </div>
      ) : (
        <div className="text-center my-5">
          <h1>Login To continue</h1>
        </div>
      )}
    </>
  );
}
AdminMovie.defaultProps = {
  category: "general",
};
AdminMovie.propTypes = {
  category: PropTypes.string,
};
export default AdminMovie;
