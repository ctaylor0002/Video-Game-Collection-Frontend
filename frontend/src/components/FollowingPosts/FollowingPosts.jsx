import React, { useEffect, useState } from 'react';
import LikeButton from '../Buttons/LikeButton/LikeButton';
import DislikeButton from '../Buttons/DislikeButton/DislikeButton';
import axios from 'axios';

const FollowingPosts = (props) => {
    //console.log(props)
    // const [posts, setPosts] = useState([]);
    const [following, setFollowing] = useState([]);
  
    async function test(id) {
        let testResponse = await axios.delete(`http://127.0.0.1:8000/api/posts/delete/2`);
        props.getRecentPosts();
    }

    useEffect(() => {
        // getRecentPosts();
        // getFollowing();
        // getFollowingPosts();
    }, [])

    return ( 
        <div>
            <button onClick={() => props.getRecentPosts()}></button>
            <button onClick={() => test()}>Test</button>
            <h3 className='followers-posts-header'>Followered Users Posts</h3>
                {props.posts &&
                props.posts.map((post) => {
                    return (
                        <div>
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
                                        <LikeButton id={post.id}  /> 
                                       
                                    </div>
                                    <div className="container-post-dislikes-count">
                                        <p key={post.id}>Dislikes: {post.dislikes}</p>
                                        <DislikeButton id={post.id} />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </div>
     );
}
 
export default FollowingPosts;