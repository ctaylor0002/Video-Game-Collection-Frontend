import React, { useState } from 'react';

import './ProfileHoverable.css'

const ProfileHoverable = (post) => {
    console.log(post)
    return ( 

        <div className='modal-background-test'>
            <div className='modal-top-bar'>
                <img className='profile-image' src={`http://127.0.0.1:8000${post.post.user.profile_picture} `}/>
                <h4 className='user-data'>{post.post.user.display_name}</h4>
                <h4 className='user-data'>@{post.post.user.username}</h4>
            </div>
            <div className='modal-bottom'>
                <p className='user-description'>{post.post.user.profile_description}</p>
            </div>
        </div>
     );
}
 
export default ProfileHoverable;