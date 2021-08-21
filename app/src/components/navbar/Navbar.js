import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ showSidebar }) => {
  return (
    <>
      <div className={showSidebar ? "sidenav active" : "sidenav"}>
        <ul>
          <li>
            <Link to="/">Home </Link>
          </li>
          <li>
            <Link to="/category">Category </Link>
          </li>
          <li>
            <Link to="/product">Porduct </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
