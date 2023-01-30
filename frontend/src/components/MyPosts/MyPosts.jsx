import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const MyPosts = (myPosts) => {

    const [currentPosts, setCurrentPosts] = useState([myPosts])
    const [user, token] = useAuth();

    useEffect(() => {
        console.log(currentPosts)
    }, [currentPosts])

    // const getMyPosts = async () => {
    //     try {
    //         let postsResponse = await axios.get(`http://127.0.0.1:8000/api/posts/${user.id}/`);

    //         let tempPostsResponse = postsResponse.data;

    //         let tempMyPosts = tempPostsResponse.filter(function(el) {
            
    //             return el.user.id === user.id
    //         });
    //         setCurrentPosts(tempMyPosts);
    //         console.log(myPosts)
    //     } catch (error) {
            
    //     }
    // }

    // const deletePost = async (postId) => {
    //     try {
    //         let deletedPostResponse = await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${postId}`, {
    //             headers: {
    //                 Authorization : "Bearer " + token,
    //             },
    //         });
    //         console.log(deletedPostResponse.data)
    //     } catch (error) {
    //         console.log(error.response.data);
    //     }
    //   }
    return ( 
        <div className='profile-contatiner-posts'>
                {/* <div className='profile-contatiner-create-post'>
                    <form>
                        <h3>Make a Post</h3>
                        <input type='text' placeholder='What game do you plan to talk about!'></input>
                        <button type='submit'>Post</button>
                    </form>
                    <h3>My Posts</h3>
                    <div>
                        {currentPosts &&
                            currentPosts.map((post) => {
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
                                            <a className='delete-button-tag' key={post.id} onClick={(event) => deletePost(event.target.key)}>Delete</a>

                                        </div>
                                    </div>
                                </div>
                                )
                                })}
                        
                    </div>
                        
                </div> */}
            </div>
     );
}
 
export default MyPosts;