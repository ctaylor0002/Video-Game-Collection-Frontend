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
                <Link to={`/${currentpost.user.username}/`}><img className='container-post-user-image' src={`http://127.0.0.1:8000${currentpost.user.profile_picture}/`} /></Link>
                <div className='container-post-user-details'>
                    <Link to={`/${currentpost.user.username}/`}><h3 id='username-tag'className='username' key={post.id}>{currentpost.user.display_name}</h3></Link>
                    <h3 id='user-tag' className='username' key={post.id}>@{currentpost.user.username}</h3>
                </div>
              </div>
              <div className="container-post-content">
                <p className='post-content' key={post.id}>{currentpost.post_content}</p>
              </div>
              <div className="container-post-likes-dislikes">
                <div className="container-post-likes-count">
                  <LikeButton
                    className={"jump-shake"}
                    id={currentpost.id}
                    type={"like"}
                    // likeOrDislikePost={likeOrDislikePost}
                  />
                  <p className="like-or-dislike-count" key={currentpost.id}>{currentpost.likes}</p>
                </div>
                <div className="container-post-dislikes-count">
                  <DislikeButton
                    className={"jump-shake"}
                    id={currentpost.id}
                    type={"dislike"}
                    // likeOrDislikePost={likeOrDislikePost}
                  />
                  <p className="like-or-dislike-count" key={currentpost.id}>{currentpost.dislikes}</p>
                </div>
              </div>
            </div>
     );
}
 
export default Post;