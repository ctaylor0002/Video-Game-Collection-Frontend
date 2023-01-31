import React, { useState } from 'react';


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
                                        </div>
                                        <div className="container-post-content">
                                            <p key={post.id}>{post.post_content}</p>
                                        </div>
                                        <div className='delete-button'>
                                            <a className='delete-button-tag' key={post.id} onClick={(event) => props.deletePost(event.target.key)}>Delete</a>

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