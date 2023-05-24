import React, { useState, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <nav>
      <div id="logo">
        <img
          src={Logo}
          alt="Gaming Corner Logo"
          className="navigation-bar-logo-image"
        />
      </div>
      <div id="nav-links">
        <h1>Gaming Corner</h1>
        <ul>
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
      <div>
        {/* for flex purposes */}
      </div>
    </nav>
  );
};

export default NavBar;
