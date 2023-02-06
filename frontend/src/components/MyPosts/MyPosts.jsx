import React, { useState } from 'react';
import './MyPosts.css'

const MyPosts = (props) => {

    const [postData, setPostData] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        let newPost = {
            post_content : postData,
            likes : 0,
            dislikes : 0,
        }
        setPostData('');
        props.createPost(newPost);
    }

    
    return ( 
        <div className='profile-contatiner-posts'>
                <div className='profile-contatiner-create-post'>
                    <form>
                        <h3>Make a Post</h3>
                        <textarea rows={'5'} columns={'50'} className='post-input-box' type='text' placeholder='What game do you plan to talk about!' onChange={(event) => setPostData(event.target.value)}></textarea>
                        <button type='submit' onClick={handleSubmit}>Post</button>
                    </form>
                    <h3>My Posts</h3>
                    <div>
                        {props.userPosts &&
                            props.userPosts.map((post) => {
                                return (
                                <div  key={post.id}>
                                    <div className="container-post">
                                        <div className="container-post-user">
                                            <h3>{post.user.username}</h3>
                                            <button className='delete-button-tag' value={post.id} onClick={(event) => props.deletePost(event.target.value)}>X</button> 
                                        </div>
                                        <div className="container-post-content">
                                            <p>{post.post_content}</p>
                                        </div>
                                        <div className='container-post-like-dislike'>
                                            <p>Likes: {post.likes}</p>
                                            <p>Dislikes: {post.dislikes}</p>
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