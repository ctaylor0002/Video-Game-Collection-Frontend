import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import LikeButton from "../../components/Buttons/LikeButton/LikeButton";
import axios from 'axios';
import '../ProfilePage/ProfilePage.css'

const ProfilePage = (props) => {
   
    const [user, token] = useAuth();
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followersPosts, setFollowersPosts] = useState([]);

   
    // Here I think I will show there picture with an option to change it
    // Plus I think I will have a followers tab
    // Plus I think I will have a following tab
   
    useEffect(() => {
        fetchNewPosts();
        fetchFollowers();
        getFollowersPosts();
        console.log(posts);
        console.log(followers);
        console.log(followersPosts);

      }, [])

    const fetchNewPosts = async () => {
        try {
          let response = await axios.get(`http://127.0.0.1:8000/api/posts/${user.id}/`)
          console.log(response.data);
          setPosts(response.data);
          console.log(posts);
        } catch (error) {
         console.log(error.response.data);
        }
      }

    const fetchFollowers = async () => {
        try{
            let response = await axios.get(`http://127.0.0.1:8000/api/followers/`, {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            setFollowers(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const getFollowersPosts = async () => {
        let tempFollowersPosts = posts.filter(post => post.user.id === user.id);
        console.log(tempFollowersPosts);
        setFollowersPosts(tempFollowersPosts);
    }
   
    return ( 
        <div className='profile-container'>
            <div className='followers-posts'>
                {followersPosts &&
                followersPosts.map((post) => {
                    return (
                        <div>
                            {console.log(post)};
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
                                        <LikeButton />
                                    </div>
                                    <div className="container-post-dislikes-count">
                                        <p key={post.id}>Dislikes: {post.dislikes}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div className='profile-contatiner'>
                <div className='profile-contatiner-create-post'>
                    <form>
                        <h3>Make a Post</h3>
                        <input type='text' placeholder='What game do you plan to talk about!'></input>
                        <button type='submit'>Post</button>
                    </form>
                </div>
                <div className='profile-contatiner-modify-profile'>
            
                </div>
            </div>
       </div>
    );

       

}
 
export default ProfilePage;