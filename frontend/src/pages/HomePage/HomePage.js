import React from "react";
import { useEffect, useState, useContext } from "react";

import useAuth from "../../hooks/useAuth";
import AuthContext from "../../context/AuthContext";

import axios from "axios";
import "../HomePage/HomePage.css";
import Post from "../../components/Post/Post";

// Recoil Imports
// import { RecoilRoot, useRecoilValueLoadable } from "recoil";
// import { postDataState, fetchPosts } from "../../recoilState.js";

import useCustomForm from "../../hooks/useCustomForm";
// import { startUp } from '../../animationScript.js'



const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);

  // Data used for logging out the user
  const { logoutUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    logoutUser
  );

  const fetchPosts = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/posts/all/`
      );
      setPosts(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const loginLogout = () => {
    if(user) {
      handleSubmit();
    } else {
      window.location.href = "http://localhost:3000/login"
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="page-body-container">
      <div className="login-logout">
        <button onClick={loginLogout}>{user ? "Logout" : "Login"}</button>
      </div>
      <div id="user-information">{user ? 
        <div className="user-information-logged-in">
          <img
              src={`http://127.0.0.1:8000/images/${user.profile_picture}/`}
              className="user-profile-picture"
            />
            
            <h2 id="user-username">Welcome, {user.display_name}</h2>
        </div> 
        :
        <div>
          {/* Temporary empty div */}
        </div>
      }
        
      </div>

      <div className="container-posts">
        {posts &&
          posts.map((post) => ( 
            <Post post={post} />
            ))}
      </div>
    </div>
  );
};
export default HomePage;
