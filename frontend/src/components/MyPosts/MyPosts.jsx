import React, { useState } from 'react';
import './MyPosts.css'

const MyPosts = (props) => {
    console.log(props)

    
    return ( 
        <div className='profile-contatiner-posts'>
                <div className='profile-contatiner-create-post'>
                    <form>
                        <h3>Make a Post</h3>
                        <input type='text' placeholder='What game do you plan to talk about!'></input>
                        <button type='submit'>Post</button>
                    </form>
                    <h3>My Posts</h3>
                    <div>
                        {props.userPosts &&
                            props.userPosts.map((post) => {
                                return (
                                <div>
                                    {console.log(post)}
                                    <div className="container-post">
                                        {console.log(post)}
                                        <div className="container-post-user">
                                            <h3 key={post.id}>{post.user.username}</h3>
                                            <button className='delete-button-tag' value={post.id} onClick={(event) => props.deletePost(event.target.value)}>X</button> 
                                        </div>
                                        <div className="container-post-content">
                                            <p key={post.id}>{post.post_content}</p>
                                        </div>
                                        <div className='container-post-like-dislike'>
                                            <p key={post.id}>Likes: {post.likes}</p>
                                            <p key={post.id}>Dislikes: {post.dislikes}</p>
                                        </div>
                                    </div>
                                </div>
                                )
                                })}
                        
                    </div>
                        
                </div>
            </div>
     );
}
 
export default MyPosts;