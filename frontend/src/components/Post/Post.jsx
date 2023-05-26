import React, { useState, useEffect } from 'react';

import LikeButton from '../Buttons/LikeButton/LikeButton';
import DislikeButton from '../Buttons/DislikeButton/DislikeButton';

import { Link } from "react-router-dom";

import './Post.css'

const Post = (post) => {
    let currentpost = post.post;

    return ( 
        <div className="hidden container-post" key={currentpost.id}>


              <div className="container-post-user">
                <img className='container-post-user-image' src={`http://127.0.0.1:8000${currentpost.user.profile_picture}/`} />
                <div className='container-post-user-details'>
                    <Link to={`/profile/${currentpost.user.username}/`}><a id='username-tag'className='username' key={post.id}>{currentpost.user.display_name}</a></Link>
                    <h3 id='user-tag' className='username' key={post.id}>@{currentpost.user.username}</h3>
                </div>
              </div>
              <div className="container-post-content">
                <p key={post.id}>{currentpost.post_content}</p>
              </div>
              <div className="container-post-likes-dislikes">
                <div className="container-post-likes-count">
                  <p key={currentpost.id}>Likes: {currentpost.likes}</p>
                  <LikeButton
                    className={"jump-shake"}
                    id={currentpost.id}
                    type={"like"}
                    // likeOrDislikePost={likeOrDislikePost}
                  />
                </div>
                <div className="container-post-dislikes-count">
                  <p key={currentpost.id}>Dislikes: {currentpost.dislikes}</p>
                  <DislikeButton
                    className={"jump-shake"}
                    id={currentpost.id}
                    type={"dislike"}
                    // likeOrDislikePost={likeOrDislikePost}
                  />
                </div>
              </div>
            </div>
     );
}
 
export default Post;