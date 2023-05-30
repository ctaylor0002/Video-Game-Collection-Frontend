import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import "../HomePage/HomePage.css";
import LikeButton from "../../components/Buttons/LikeButton/LikeButton";
import DislikeButton from "../../components/Buttons/DislikeButton/DislikeButton";
import "react-widgets/styles.css";
import { DropdownList } from "react-widgets";
import { Link } from "react-router-dom";

// Recoil Imports
import { RecoilRoot, useRecoilValueLoadable } from "recoil";
import { profilePicState, fetchUserData } from "../../recoilState.js";
import Post from "../../components/Post/Post";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [usernames, setUsernames] = useState([]);
  // const [searchValue, setSearchValue] = useState("");

  const profilePic = useRecoilValueLoadable(fetchUserData(user.username));

  useEffect(() => {
    fetchNewPosts();
    getUsers();
  }, []);

  async function getUsers() {
    try {
      let usersResponse = await axios.get(
        "http://127.0.0.1:8000/api/auth/users/"
      );
      console.log(usersResponse);
      setUsers(usersResponse.data);

      let usernames = usersResponse.data.map((ourUser) => {
        return ourUser.username;
      });

      setUsernames(usernames);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  const fetchNewPosts = async () => {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/posts/${user.id}/`
      );
      console.log(response.data)
      setPosts(response.data);
      startUp();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  function startUp() {
    // console.log(token)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // console.log(entry);
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => observer.observe(el));
  }

  return (
    <div className="page-body-container">
      <div id="user-information">
        <img
          src={`http://127.0.0.1:8000/images/${user.profile_picture}`}
          className="user-profile-picture"
          />
        <h2 id="user-username">Welcome, {user.display_name}</h2>
      </div>

      {/* This will be moved to search for more information rather than just users */}
      {/* <div className="container-search">
        <DropdownList
          defaultValue={""}
          data={usernames}
          hideEmptyPopup
          className="container-search-bar"
          onChange={(event) => setSearchValue(event)}
        />
        {linkLocation()}
        Add an if statement that if the searchValue equals the user.username Link to the profilepage of the user
      </div> */}
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
