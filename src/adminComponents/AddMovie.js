import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
function AddMovie(props) {
  const [moviedetails, setMoviedetails] = useState({
    name: "",
    price: "",
    language: "",
    description: "",
    date: "",
    time: "",
    catname: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  let history = useNavigate();
  const onChangesubmitFile = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    const response = await fetch(`${props.baseUrl}/admin/add-movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: moviedetails.name,
        price: moviedetails.price,
        language: moviedetails.language,
        description: moviedetails.description,
        date: moviedetails.date,
        time: moviedetails.time,
        image: null,
        catname: moviedetails.catname,
      }),
    });
    const json = await response.json();
    if (json) {
      props.showAlert("Movie Added successfully", "success");
      history("/adminMovie");
    } else {
      props.showAlert("Something went wrong...", "danger");
    }

    const fd = new FormData();
    fd.append("file", selectedFile);
    await fetch(`${props.baseUrl}/admin/upload`, {
      method: "POST",
      body: fd,
    });
  };

  const onChange = (e) => {
    setMoviedetails({ ...moviedetails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-0">
        <form
          onSubmit={handleAddMovie}
          className="custom-centered shadow p-3 bg-body rounded"
          style={{ marginBottom: "80px" }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
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
              id="price"
              name="price"
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
              id="language"
              name="language"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              description
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              aria-describedby="emailHelp"
              maxLength="1000"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
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
              id="time"
              name="time"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="catname" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="catname"
              name="catname"
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-2">
            <input
              type="file"
              onChange={onChangesubmitFile}
              accept="image/jpeg"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddMovie;
