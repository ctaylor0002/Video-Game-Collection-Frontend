import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const NavBar = () => {

  const [user, token] = useAuth();

  return (
    <nav className="nav-bar-container">
      <div id="nav-website-name">
        <h1 id="website-header">
          Gaming
          {" "} <span>
            <img
              src={Logo}
              alt="Gaming Corner Logo"
              className="navigation-bar-logo-image"
            />
          </span>{" "}
          Corner
        </h1>
      </div>
      <div id="nav-links-container">
        <ul id="nav-links">
          <Link to="/home">
            <li className="nav-link-anchor">Home</li>
          </Link>
          {user ? 
            <Link to={`/${user.username}/`} state= {{userDetails: user}}>
              <li>Profile</li>
            </Link>
            :
            <div>
              {/* Temporary Empty Div */}
            </div>
          
          }
          {/* <Link to="/collection">
            <li>Collection</li>
          </Link> */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
