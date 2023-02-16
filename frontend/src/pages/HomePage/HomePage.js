import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import "../HomePage/HomePage.css"
import LikeButton from "../../components/Buttons/LikeButton/LikeButton";
import DislikeButton from "../../components/Buttons/DislikeButton/DislikeButton";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([]);
  // const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchNewPosts();
    getUsers();
    console.log(posts);
  }, [])

  async function getUsers() {
    try {
      let usersResponse = await axios.get('http://127.0.0.1:8000/api/auth/users/');
      console.log(usersResponse)
      setUsers(usersResponse.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  

  const fetchNewPosts = async () => {
     try {
       let response = await axios.get(`http://127.0.0.1:8000/api/posts/${user.id}/`)
       //console.log(response)
       setPosts(response.data)
     } catch (error) {
      console.log(error.response.data);
     }
   }

   async function likeOrDislikePost(id, type, data) {
    try {
        let followingResponse = await axios.patch(`http://127.0.0.1:8000/api/posts/type/${id}?type=${type}&value=${data}`, { type : data}, {
            headers: {
                Authorization : "Bearer " + token,
            },
        });
        getRecentPosts();
    } catch (error) {
        console.log(error.response.data);
    }
}

async function getRecentPosts() {
  try {
      let postsResponse = await axios.get(`http://127.0.0.1:8000/api/posts/${user.id}/`);

      let tempPostsResponse = postsResponse.data;
      setPosts(tempPostsResponse);
  } catch (error) {
      console.log(error.response.data);
  }
}

   // Add a way to change the color of the username if the post.user.staff is true
  return (
    <div className="container">
      <div>
        <input type='text' placeholder='Search Users...' />
      </div>
      <div className="container-posts">
        {posts &&
          posts.map((post) => (
            <div className="container-post">
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
                  <LikeButton id={post.id} type={'like'} likeOrDislikePost={likeOrDislikePost} />
                </div>
                <div className="container-post-dislikes-count">
                  <p key={post.id}>Dislikes: {post.dislikes}</p>
                  <DislikeButton id={post.id} type={'dislike'} likeOrDislikePost={likeOrDislikePost} />
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {/* <h1>Home Page for {user.username}!</h1>
      {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))} */}
    </div>
  );
};

export default HomePage;
