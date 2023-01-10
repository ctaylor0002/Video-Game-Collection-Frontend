import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";
import "../HomePage/HomePage.css"

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [posts, setPosts] = useState([])
  // const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchNewPosts();
    console.log(posts);
  }, [])


  // useEffect(() => {
  //   const fetchCars = async () => {
  //     try {
  //       let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       });
  //       setCars(response.data);
  //     } catch (error) {
  //       console.log(error.response.data);
  //     }
  //   };
  //   fetchCars();
  // }, [token]);


  // useEffect(() => {
    

  // })

  const fetchNewPosts = async () => {
     try {
       let response = await axios.get(`http://127.0.0.1:8000/api/posts/${user.id}/`)
       //console.log(response)
       setPosts(response.data)
     } catch (error) {
      console.log(error.response.data);
     }
   }


   // Add a way to change the color of the username if the post.user.staff is true
  return (
    <div className="container">
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
              </div>
              <div className="container-post-dislikes-count">
                <p key={post.id}>Dislikes: {post.dislikes}</p>
              </div>
            </div>
          </div>
        ))
      }
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
