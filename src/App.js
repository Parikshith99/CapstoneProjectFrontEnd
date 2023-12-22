import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

import { useState, useEffect } from "react";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import SingleMovie from "./components/SingleMovie";
import ShowCart from "./components/ShowCart";
import UserPage from "./UserPage";
import Adminhome from "./adminComponents/Adminhome";
import AdminLogin from "./adminComponents/AdminLogin";
import AdminMovie from "./adminComponents/AdminMovie";
import AddMovie from "./adminComponents/AddMovie";
import RemoveCategory from "./adminComponents/RemoveCategory";
import Footer from "./Footer";
function App() {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [alert, setAlert] = useState(null);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState("");
  let baseUrl = "http://localhost:8081";
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const handleCart = async () => {
    let url = `${baseUrl}/user/getCart`;
    let data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    let parsedData = await data.json();
    if (parsedData.length > 0) {
      setCart(parsedData);
    }else{
      setCart([]);
    }
  };

  const getCartCount = async () => {
    const cartCount = await fetch(`${baseUrl}/user/getCartCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json2 = await cartCount.json();

    setCount(json2);
  };

  const getUser = async () => {
    const response = await fetch(`${baseUrl}/user/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    setUser(json.data);
  };

  const handleOnSubmit = async () => {
    let url = `${baseUrl}/search/${search}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    if (parsedData.length > 0) {
      setSearchData(parsedData);
    } else {
      showAlert("No Results found", "danger");
    }
  };

  const AllCategory = async () => {
    const response = await fetch(`${baseUrl}/admin/getAllCategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    setCategory(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleCart();
      getCartCount();
      getUser();
    }
    AllCategory();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar
          baseUrl={baseUrl}
          search={search}
          setSearch={setSearch}
          searchData={searchData}
          setSearchData={setSearchData}
          count={count}
          setCount={setCount}
          handleCart={handleCart}
          handleOnSubmit={handleOnSubmit}
          category={category}
          setCategory={setCategory}
          user={user}
          setUser={setUser}
        />
        <Alert alert={alert} />

        <Routes>
          <Route exact path="/" element={<UserPage />} />
          <Route
            exact
            path="/adminLogin"
            element={<AdminLogin baseUrl={baseUrl} showAlert={showAlert} />}
          />
          <Route exact path="/adminHome" element={<Adminhome />} />
          <Route
            exact
            path="/adminMovie"
            element={<AdminMovie baseUrl={baseUrl} showAlert={showAlert} />}
          />
          <Route
            exact
            path="/addMovie"
            element={<AddMovie baseUrl={baseUrl} showAlert={showAlert} />}
          />

          <Route
            exact
            path="/removeCategory"
            element={<RemoveCategory baseUrl={baseUrl} showAlert={showAlert} />}
          />
          <Route
            exact
            path="/home"
            key="home"
            element={
              <Home
                baseUrl={baseUrl}
                searchData={searchData}
                setSearchData={setSearchData}
                getCartCount={getCartCount}
                showAlert={showAlert}
                getUser={getUser}
              />
            }
          />

          <Route
            exact
            path="/singlemovie/:id"
            element={
              <SingleMovie
                baseUrl={baseUrl}
                showAlert={showAlert}
                count={count}
                getCartCount={getCartCount}
                setCount={setCount}
              />
            }
          />

          <Route
            exact
            path="/your_cart"
            element={<ShowCart cart={cart} setCart={setCart} />}
          />

          <Route
            exact
            path="/search"
            element={
              <Search
                searchData={searchData}
                setSearchData={setSearchData}
                handleOnSubmit={handleOnSubmit}
              />
            }
          />

          {category.map((option) => (
            <Route
              key={option.catname}
              exact
              path={`/${option.catname}`}
              element={
                <Home
                  baseUrl={baseUrl}
                  key={option.catname}
                  category={option.catname}
                  searchData={searchData}
                  setSearchData={setSearchData}
                  getCartCount={getCartCount}
                  showAlert={showAlert}
                  getUser={getUser}
                />
              }
            />
          ))}

          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} baseUrl={baseUrl} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} baseUrl={baseUrl} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
