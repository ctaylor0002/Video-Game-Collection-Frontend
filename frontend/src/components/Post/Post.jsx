import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';

import LikeButton from '../Buttons/LikeButton/LikeButton';
import DislikeButton from '../Buttons/DislikeButton/DislikeButton';
import ProfileHoverable from '../ProfileHoverable/ProfileHoverable';

import { Link } from "react-router-dom";

import './Post.css'

import axios from 'axios';



function getPostTime(postTime) {
    const postDate = new Date(postTime)
    const endDate = new Date()

    const diff = (endDate.getTime() - 14400000) - postDate.getTime(); // -14400000 is to subtract 4 hours to account for time zones

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days != 0) {
        return (days + 'd');
    }
    if (hours != 0) {
        return (hours + 'h')
    }
    if (minutes != 0) {
        return (minutes + 'm')
    }
    if (seconds != 0) {
        return (seconds + 's')
    }

}



const Post = (post) => {
  let currentpost = post.post;

  const [user, token] = useAuth();
  const [likeCount, setLikeCount] = useState(currentpost.likes);
  const [dislikeCount, setDislikeCount] = useState(currentpost.dislikes);

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

      if (type == 'like') {
        setLikeCount(likeCount + data);
      } else {
        setDislikeCount(dislikeCount + data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

    const [hoverableProfile, setHoverableProfile] = useState(false);

    const handleMouseOver = () => {
        setHoverableProfile(true);
        console.log('Hovering')
    }

    const handleMouseOut = () => {
        setHoverableProfile(false);
        console.log('Not Hovering')
    }



    return ( 
        <div className="hidden container-post" key={currentpost.id}>


              <div className="container-post-user">
                <div className='hover-container' > 
                    <Link to={`/${currentpost.user.username}/`}><img className='container-post-user-image' src={`http://127.0.0.1:8000${currentpost.user.profile_picture}/`} /></Link>
                </div>
                <div className='container-post-user-details'>
                    <div className='hover-container' onMouseOver={handleMouseOver} onMouseLeave={handleMouseOut}>
                        <Link to={`/${currentpost.user.username}/`}><h3 id='username-tag'className='username' key={post.id}>{currentpost.user.display_name}</h3></Link>
                        {hoverableProfile && (
                            <ProfileHoverable post={currentpost}/>
                        )}
                    </div>
                    
                    <h3 id='user-tag' className='username' key={post.id}>@{currentpost.user.username}</h3>
                    <p>{getPostTime(currentpost.created_at)}</p>
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
                    likeOrDislikePost={likeOrDislikePost}
                  />
                  <p className="like-or-dislike-count" key={currentpost.id}>{likeCount}</p>
                </div>
                <div className="container-post-dislikes-count">
                  <DislikeButton
                    className={"jump-shake"}
                    id={currentpost.id}
                    type={"dislike"}
                    likeOrDislikePost={likeOrDislikePost}
                  />
                  <p className="like-or-dislike-count" key={currentpost.id}>{dislikeCount}</p>
                </div>
              </div>
            </div>
     );
}
 
export default Post;