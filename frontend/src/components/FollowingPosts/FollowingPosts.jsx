import React, { useState } from 'react';
import LikeButton from '../Buttons/LikeButton/LikeButton';
import DislikeButton from '../Buttons/DislikeButton/DislikeButton';
import axios from 'axios';

const FollowingPosts = (props) => {

    const [following, setFollowing] = useState([]);


    return ( 
        <div>
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
                                        <LikeButton id={post.id} type={'like'} likeOrDislikePost={props.likeOrDislikePost} /> 
                                       
                                    </div>
                                    <div className="container-post-dislikes-count">
                                        <p key={post.id}>Dislikes: {post.dislikes}</p>
                                        <DislikeButton id={post.id} type={'dislike'} likeOrDislikePost={props.likeOrDislikePost} />
                                        
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