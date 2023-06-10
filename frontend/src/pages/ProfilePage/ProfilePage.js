import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../ProfilePage/ProfilePage.css'

import GameTable from '../../components/GameTable/GameTable';

import Post from '../../components/Post/Post';

const ProfilePage = (props) => {
    const location = useLocation();
    const userObject = location.state?.userDetails;

    const [user, token] = useAuth();
    const [userPosts, setUserPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [buttonState, setButtonState] = useState(1);
    const [collection, setCollection] = useState([]);

    useEffect(() => {
        console.log(location.state.userDetails)
        // console.log(userObject)
        fetchPosts();
        getFollowers();
        getFollowing();
        getCollection();
      }, [])

      
      async function getFollowers() {
          try {
              let followersResponse = await axios.get(`http://127.0.0.1:8000/api/followers/list/${userObject.id}`, {
                  headers: {
                      Authorization : "Bearer " + token,
                    },
                });
                console.log(followersResponse.data);
                setFollowers(followersResponse.data);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        
        async function getFollowing() {
            try {
                let followingResponse = await axios.get(`http://127.0.0.1:8000/api/followers/${userObject.id}`, {
                    headers: {
                        Authorization : "Bearer " + token,
                    },
                });
                console.log(followingResponse)
                setFollowing(followingResponse.data);
                console.log(following)
            } catch (error) {
                console.log(error.response.data);
            }
        }
        
        
        const fetchPosts = async () => {
            try {
                let response = await axios.get(
                    `http://127.0.0.1:8000/api/posts/${userObject.id}/`
                    );
                    // setUserPosts(response.data);
                    getUserPosts(response.data);
                } catch (error) {
                    console.log(error.response.data);
                }
            };
            
            function getUserPosts(allPosts) {
                // console.log(allPosts)
                let tempUserPosts = allPosts.filter(function(post) {
                    return post.user.id === userObject.id
                })
                // console.log(tempUserPosts)
                setUserPosts(tempUserPosts);
                
            }
            
            async function getCollection() {
                try {
                    let tempCollection = await axios.get(`http://127.0.0.1:8000/api/collection/${userObject.id}`, {
                        headers: {
                            Authorization : "Bearer " + token,
                        },
                    });
                    console.log(tempCollection.data)
                    setCollection(tempCollection.data);
                } catch (error) {
                    console.log(error.response.data);
                }
            }

            async function createPost(data) {
            console.log(data)
            console.log(userPosts)
            try {
                let followingResponse = await axios.post('http://127.0.0.1:8000/api/posts/', data, {
                    headers: {
                        Authorization : "Bearer " + token,
                    },
                })
                getUserPosts();
                console.log(followingResponse);
            } catch (error) {
                
            }
        }

        async function deletePost(id) {
            console.log(id)
            let response = await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${id}`);
            getUserPosts();
        }
        

   

    return ( 
        <div className='profile-container'>

            <div id='profile-header'>
                <div className='profile-details-container'>
                    <img src={`http://127.0.0.1:8000/images/${userObject.profile_picture}`} className='profile-picture' />
                    <div className='profile-details'>
                        <h2 className='user-name'>{userObject.username}</h2>
                        <a>Edit Profile</a>
                    </div>
                </div>
                <div className='profile-display'>
                    <div className='display-details' onClick={() => setButtonState(1)}>
                        <a>{userPosts.length}</a>
                        <a>Posts</a>
                    </div>
                    <div className='display-details' onClick={() => setButtonState(2)}>
                        <a>{followers.length}</a>
                        <a>Followers</a>
                    </div>
                    <div className='display-details' onClick={() => setButtonState(3)}>
                        <a>{following.length}</a>
                        <a>Following</a>
                    </div>
                    <div className='display-details' onClick={() => setButtonState(4)}>
                        <a>{collection.length}</a>
                        <a>Collection</a>
                    </div>
                </div>
            </div>

            <div className="container-posts">
                {buttonState === 1 && userPosts.map((post) => ( <Post post={post} />))}
                {buttonState === 2 && followers.map((follower) => {return(
                    <div className='social-table'>
                        <table>
                            <tr>
                                <td>
                                    <img className='container-post-user-image' src={`http://127.0.0.1:8000${follower.main_user.profile_picture}`} />
                                </td>
                                <td>
                                    {follower.main_user.username}
                                    </td>
                            </tr>

                        </table>
                    </div>)})}

                {buttonState === 3 && following.map((followedUser) => {return(
                    <div className='social-table' >
                        <table>
                            <tr>
                                <td>
                                    <img className='container-post-user-image' src={`http://127.0.0.1:8000${followedUser.follower_user.profile_picture}`} />
                                </td>
                                <td>
                                    {followedUser.follower_user.username}
                                </td>
                            </tr>
                        </table>
                        
                        
                    </div>
                )})}
                {buttonState === 4 && <GameTable collection={collection}/>}

            </div> 
       </div>
    );   

}
 
export default ProfilePage;