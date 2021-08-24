import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { removeSelectedUser, setUser } from "../../redux/actions/userActions";
import userInfo from "../../images/amar.PNG";

const Navbar = ({ showSidebar }) => {
  const user_name = useSelector((state) => state.allUsers.user.user_name);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeSelectedUser());
  };

  return (
    <>
      <div className={showSidebar ? "sidenav active" : "sidenav"}>
        <ul>
          {!user_name && (
            <>
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/login">Login </Link>
              </li>
              <li>
                <Link to="/register">Register </Link>
              </li>
            </>
          )}

          {user_name && (
            <>
              <li>
                <span className="user-info">
                  <img src={userInfo} alt="user" />
                </span>
              </li>
              <li>
                <Link to="/">Home </Link>
              </li>
              <li>
                <Link to="/category">Category </Link>
              </li>
              <li>
                <Link to="/product">Porduct </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleClick}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
