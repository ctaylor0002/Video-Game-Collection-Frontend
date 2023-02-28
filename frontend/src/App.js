// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import UserPage from "./pages/UserPage/UserPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

import axios from "axios";
import React, { useState, useEffect } from 'react';
import useAuth from "./hooks/useAuth";




function App() {

  const [user, token] = useAuth();
  const [followingPosts, setFollowingPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  // Here I think I will show there picture with an option to change it
  // Plus I think I will have a followers tab
  // Plus I think I will have a following tab

    //I should probably make the posts there own component so all of them dont need to be rerendered for one change
  const fetchNewPosts = async () => {
      try {
        let postsResponse = await axios.get(`http://127.0.0.1:8000/api/posts/${user.id}/`);

        let tempPostsResponse = postsResponse.data;
        console.log(tempPostsResponse)

        let followingResponse = await axios.get(`http://127.0.0.1:8000/api/followers/`, {
          headers: {
              Authorization : "Bearer " + token,
          },
      });

        setFollowing(followingResponse.data);

        let tempFollowingResponse = followingResponse.data;
 
        let testPosts = [];

        for(let i = 0; i < tempFollowingResponse.length; i++) {

          let tempFollowingPosts = tempPostsResponse.filter(function(el) {

              return el.user.id === tempFollowingResponse[i].follower_user.id
          });   
          testPosts = testPosts.concat(tempFollowingPosts);
          // console.log(testPosts)
      
      }

      setFollowingPosts(testPosts);

      // Getting My Posts
      let tempMyPosts = tempPostsResponse.filter(function(el) {
          
          return el.user.id === user.id
      });
      setMyPosts(tempMyPosts);
      console.log(myPosts)

      } catch (error) {
       console.log(error.response.data);
      }
    }

    const fetchFollowers = async () => {
      try {
          let followersResponse = await axios.get('http://127.0.0.1:8000/api/followers/list/', {
              headers: {
                  Authorization : "Bearer " + token,
              },
          });
          console.log(followersResponse.data);
          setFollowers(followersResponse);
      } catch (error) {
          console.log(error.response.data);
      }
    }

    

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage setFollowing={fetchNewPosts} following={following}/>} />
        <Route path='/profile' element={<ProfilePage followers={followers} following={following} followingPosts={followingPosts} myPosts={myPosts}/>} />
        <Route path='/collection' element={<CollectionPage />} />
        <Route path="/:username" element={<UserPage following={following} setFollowing={setFollowing} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
