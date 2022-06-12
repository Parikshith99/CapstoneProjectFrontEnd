import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
function AdminLogin(props) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  let history = useNavigate();

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${props.baseUrl}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json) {
      localStorage.setItem("admin", true);
      props.showAlert("Logged in successfully", "success");
      history("/adminHome");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <AdminNavbar />
      <form
        onSubmit={handleAdminSubmit}
        className="custom-centered shadow p-3 mb-5 bg-body rounded my-5"
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="username"
            id="username"
            aria-describedby="emailHelp"
            value={credentials.username}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
