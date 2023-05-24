import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <nav>
      <div id="nav-website-name">
        <h1>Gaming <span><img
            src={Logo}
            alt="Gaming Corner Logo"
            className="navigation-bar-logo-image"/>
            </span> Corner</h1>
      </div>
      <div id="nav-links-container">
        <ul id="nav-links">
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/collection">
            <li>Collection</li>
          </Link>
        </ul>
      </div>

    </nav>
  );
};

export default NavBar;
