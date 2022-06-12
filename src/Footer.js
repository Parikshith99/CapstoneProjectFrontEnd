import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="bg-dark bg-gradient fixed-bottom text-center text-white">
        <div className="text-center p-3 bg-dark">
          © 2020 Copyright: &nbsp;
          <Link className="text-white" to="/">
            MyMoviePlan.com
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
