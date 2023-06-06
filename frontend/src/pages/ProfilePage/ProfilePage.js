import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import '../ProfilePage/ProfilePage.css'

import GameTable from '../../components/GameTable/GameTable';

import Post from '../../components/Post/Post';

import PostLogo from '../../assets/Post Logo.png';
import CollectionLogo from '../../assets/Collection Logo.png'

// Recoil Imports
// import { RecoilRoot, useRecoilValueLoadable } from "recoil";
// import { profilePicState, fetchUserData } from "../../recoilState.js";


const ProfilePage = (props) => {
   
    const [user, token] = useAuth();
    const [posts, setPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [buttonState, setButtonState] = useState(1);
    const [collection, setCollection] = useState([]);
    // const [profilePic, setProfilePic] = useState("");
    const [profile, setProfile] = useState("");
   
    useEffect(() => {

        // getRecentPosts();
        // startUp();
        // getUserPosts();

        fetchPosts();
        getFollowers();
        getFollowing();
        getCollection();


        // getProfileInfo();


        // getFollowingPosts();
        // fetchNewPosts();
        // fetchFollowers();
        
      }, [])
        // async function getCollection() {
        //     try {
        //         let tempCollection = await axios.get(`http://127.0.0.1:8000/api/collection/${user.id}`, {
        //             headers: {
        //                 Authorization : "Bearer " + token,
        //             },
        //         });
        //         setCollection(tempCollection);
        //         let tempData = [];
        //         for (let i = 0; i < tempCollection.data.length; i++) {
        //             tempData.push(tempCollection.data[i].video_game.video_game_title)
        //         }
        //         setGameNames(tempData)

        //     } catch (error) {
        //         console.log(error.response.data);
        //     }
        // }

        // async function getRecentPosts() {
        //     try {
        //         let postsResponse = await axios.get(`http://127.0.0.1:8000/api/posts/${user.id}/`);


        //         let followingResponse = await axios.get(`http://127.0.0.1:8000/api/followers/`, {
        //             headers: {
        //                 Authorization : "Bearer " + token,
        //             },
        //         });
        //         let tempPostsResponse = postsResponse.data;
        //         let testPosts = [];



        //         for(let i = 0; i < followingResponse.data.length; i++) {

        //             let tempFollowingPosts = tempPostsResponse.filter(function(el) {
        //                 console.log(followingResponse.data[i].follower_user.id)
        //                 console.log(el.user.id)
        //                 return el.user.id === followingResponse.data[i].follower_user.id
        //             });   
        //             testPosts = testPosts.concat(tempFollowingPosts);
                    

                   
        //         }
        //         console.log(testPosts)
        //         testPosts = testPosts.filter(function(el) {
        //             console.log(el.user.id)
        //             console.log(user.id)
        //             return el.user.id != user.id
        //         });
        //         setPosts(testPosts)
        //     } catch (error) {
        //         console.log(error.response.data);
        //     }
        // }

        // async function deletePost(id) {
        //     console.log(id)
        //     let response = await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${id}`);
        //     getUserPosts();
        // }

        async function getFollowers() {
            try {
                let followersResponse = await axios.get('http://127.0.0.1:8000/api/followers/list/', {
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
                let followingResponse = await axios.get(`http://127.0.0.1:8000/api/followers/`, {
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
                    `http://127.0.0.1:8000/api/posts/${user.id}/`
                    );
                    setPosts(response.data);
                    getUserPosts(response.data);
                } catch (error) {
                    console.log(error.response.data);
                }
            };
            
        function getUserPosts(allPosts) {
            // console.log(allPosts)
            let tempUserPosts = allPosts.filter(function(post) {
                return post.user.id === user.id
            })
            // console.log(tempUserPosts)
            setUserPosts(tempUserPosts);
                
        }

            // async function getFollowingPosts() {
        //     let tempPosts = [];
        //     console.log(following)
        //     for(let i = 0; i < following.length; i++) {

        //         let posts = posts.filter(function(el) {
        //             console.log(el)
        //         return el.user.id === following[i].follower_user.id
        //         });   

        //     tempPosts = tempPosts.concat(following);
        //     console.log(tempPosts)
        //     }
        
        //     setPosts(tempPosts);
        //     console.log(posts)
        // }

        // async function likeOrDislikePost(id, type, data) {
        //     try {
        //         let followingResponse = await axios.patch(`http://127.0.0.1:8000/api/posts/type/${id}?type=${type}&value=${data}`, { type : data}, {
        //             headers: {
        //                 Authorization : "Bearer " + token,
        //             },
        //         });
        //         getRecentPosts();
        //     } catch (error) {
        //         console.log(error.response.data);
        //     }
        // }

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

        // async function getProfileInfo() {
        //     console.log(user)
        //     const response = await axios.get(`http://127.0.0.1:8000/api/profile/${user.id}/`)
        //     let pictureData = `http://127.0.0.1:8000${response.data.profile_picture}`
        //     setProfilePic(pictureData);
        //     setProfile(response.data);
        // }

        // async function updateProfile(data) {
        //     console.log(data)
            
        //    const response = await axios.patch(`http://127.0.0.1:8000/api/profile/update/${user.id}/`, data, {
        //             headers: {
        //                 Authorization : "Bearer " + token,
        //                 'Content-Type' : "multipart/form-data",
        //             },
        //     });
        //     setProfilePic(response.data.profile_picture);
        //     console.log(response);
        // }
    
    // const profileData = useRecoilValueLoadable(fetchUserData(user.username));
    // console.log(profileData.contents)

    // function getProfileData() {
    //     let returnData 
    //     if (buttonState == 0) {
    //         returnData = userPosts.map((post) => ( <Post post={post} />))
    //         console.log(returnData)
    //     } else if (buttonState == 1) {
    //         returnData = <GameTable />
    //         console.log(returnData)
    //     }
    //     console.log(returnData)
    //     return(returnData)

    // }


    async function getCollection() {
        try {
            let tempCollection = await axios.get(`http://127.0.0.1:8000/api/collection/${user.id}`, {
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

   

    return ( 
        <div className='profile-container'>
            <header id='profile'>
                <div>
                    <img src={`http://127.0.0.1:8000/images/${user.profile_picture}`} className='profile-picture' />
                </div>
                <div className='profile-details-container'>
                    <h2 className='user-name'>{user.username}</h2>
                    <a>Edit Profile</a>
                </div>
            </header>
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
                {/* <div className='profile-contatiner-modify-profile'>
            
                </div> */}
       </div>
    );

       

}
 
export default ProfilePage;