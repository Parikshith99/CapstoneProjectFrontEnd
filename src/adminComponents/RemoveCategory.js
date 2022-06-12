import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

function RemoveCategory(props) {
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  let history = useNavigate();

  const AllCategory = async () => {
    const response = await fetch(`${props.baseUrl}/admin/getAllCategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (json.length > 0) {
      setCategory(json);
    } else {
      props.showAlert("No category found...", "danger");
    }
  };

  useEffect(() => {
    AllCategory();
    // eslint-disable-next-line
  }, []);

  const handleRemoveCategory = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${props.baseUrl}/admin/remove-category/${selectCategory}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    if (json) {
      props.showAlert("Category removed successfully", "success");
      history("/removeCategory");
    }
  };

  return (
    <>
      <AdminNavbar />
      {category.length > 0 ? (
        <div className="container">
          <form
            onSubmit={handleRemoveCategory}
            className="custom-centered shadow p-3 my-5 bg-body rounded"
          >
            <select
              value={selectCategory}
              onChange={(e) => setSelectCategory(e.target.value)}
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              {category.map((option) => (
                <option key={option.catid} value={option.catname}>
                  {option.catname}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center my-5">
          <h1>No category to display</h1>
        </div>
      )}
    </>
  );
}

export default RemoveCategory;
