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
import { profilePicState, fetchProfilePic } from "../../recoilState.js";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const profilePic = useRecoilValueLoadable(fetchProfilePic(user.id));
  console.log(profilePic)

  useEffect(() => {
    fetchNewPosts();
    getUsers();
    console.log(posts);
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
      //console.log(response)
      setPosts(response.data);
      startUp();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  async function likeOrDislikePost(id, type, data) {
    try {
      let followingResponse = await axios.patch(
        `http://127.0.0.1:8000/api/posts/type/${id}?type=${type}&value=${data}`,
        { type: data },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      getRecentPosts();
    } catch (error) {
      console.log(error.response.data);
    }
  }

  async function getRecentPosts() {
    try {
      let postsResponse = await axios.get(
        `http://127.0.0.1:8000/api/posts/${user.id}/`
      );

      let tempPostsResponse = postsResponse.data;
      setPosts(tempPostsResponse);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  function startUp() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
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

  function linkLocation() {
    if (searchValue == user.username) {
      return (
        <Link
          to={`/profile`}
          userValue={searchValue}
          setFollowing={props.setFollowing}
          following={props.following}
          followers={props.followers}
          followingPosts={props.followingPosts}
        >
          <button>Search</button>
        </Link>
      );
    } else {
      return (
        <Link
          to={`/${searchValue}`}
          userValue={searchValue}
          setFollowing={props.setFollowing}
          following={props.following}
        >
          <button>Search</button>
        </Link>
      );
    }
  }

  return (
    <div className="page-body-container">
      <div id="user-information">
        <img
          src={`http://127.0.0.1:8000${profilePic.contents.profile_picture}`}
          className="user-profile-picture"
          />
        <h2 id="user-username">Welcome, {user.username}</h2>
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
            <div className="hidden container-post" key={post.id}>
              {console.log(post)}
              <div className="container-post-user">
                <h3 key={post.id}>{post.user.username}</h3>
              </div>
              <div className="container-post-content">
                <p key={post.id}>{post.post_content}</p>
              </div>
              <div className="container-post-likes-dislikes">
                <div className="container-post-likes-count">
                  <p key={post.id}>Likes: {post.likes}</p>
                  <LikeButton
                    className={"jump-shake"}
                    id={post.id}
                    type={"like"}
                    likeOrDislikePost={likeOrDislikePost}
                  />
                </div>
                <div className="container-post-dislikes-count">
                  <p key={post.id}>Dislikes: {post.dislikes}</p>
                  <DislikeButton
                    className={"jump-shake"}
                    id={post.id}
                    type={"dislike"}
                    likeOrDislikePost={likeOrDislikePost}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
