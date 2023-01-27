import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import LikeButton from "../../components/Buttons/LikeButton/LikeButton";
import axios from 'axios';
import '../ProfilePage/ProfilePage.css'
import DislikeButton from '../../components/Buttons/DislikeButton/DislikeButton';
import UsersTable from '../../components/UsersTable/UsersTable';


const ProfilePage = (props) => {
   
    const [user, token] = useAuth();
    const [posts, setPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
  
    // Here I think I will show there picture with an option to change it
    // Plus I think I will have a followers tab
    // Plus I think I will have a following tab
   
    useEffect(() => {
        fetchNewPosts();
        fetchFollowers();
      }, [])


      //I should probably make the posts there own component so all of them dont need to be rerendered for one change
    const fetchNewPosts = async () => {
        try {
          let postsResponse = await axios.get(`http://127.0.0.1:8000/api/posts/${user.id}/`);

          let tempPostsResponse = postsResponse.data;
          console.log(tempPostsResponse)

          let followingResponse = await axios.get(`http://127.0.0.1:8000/api/followers/`, {
            headers: {
                Authorization : "Bearer " + token,
            },
        });

          setFollowing(followingResponse.data);

          let tempFollowingResponse = followingResponse.data;
   
          let testPosts = [];

          for(let i = 0; i < tempFollowingResponse.length; i++) {

            let tempFollowingPosts = tempPostsResponse.filter(function(el) {

                return el.user.id === tempFollowingResponse[i].follower_user.id
            });   
            testPosts = testPosts.concat(tempFollowingPosts);
            // console.log(testPosts)
        
        }
  
        setPosts(testPosts);
        
        } catch (error) {
         console.log(error.response.data);
        }
      }

      const fetchFollowers = async () => {
        try {
            let followersResponse = await axios.get('http://127.0.0.1:8000/api/followers/list/', {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            console.log(followersResponse.data);
            setFollowers(followersResponse);
        } catch (error) {
            console.log(error.response.data);
        }
      }


        // const likePost = async () => {
        //     try {
        //         let likePostResponse = await axios.patch()
        //     } catch (error) {
                
        //     }
        // }

        // const dislikePost = async () => {
        //     try {
                
        //     } catch (error) {
                
        //     }
        // }
   
    return ( 
        <div className='profile-container'>
            <div className='followers-posts'>
                <h3 className='followers-posts-header'>Followered Users Posts</h3>
                {posts &&
                posts.map((post) => {
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
                                <div className="container-post-likes-dislikes">
                                    <div className="container-post-likes-count">
                                        <p key={post.id}>Likes: {post.likes}</p>
                                        <LikeButton id={post.id} likePost={props.likePost} />
                                    </div>
                                    <div className="container-post-dislikes-count">
                                        <p key={post.id}>Dislikes: {post.dislikes}</p>
                                        <DislikeButton id={post.id} dislikePost={props.dislikePost}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div className='profile-contatiner-posts'>
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

            <div className='profile-container-followers-followed'>
                <UsersTable />
            </div>

       </div>
    );

       

}
 
export default ProfilePage;