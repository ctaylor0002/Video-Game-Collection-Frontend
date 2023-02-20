import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GameTable from '../../components/GameTable/GameTable';
import './UserPage.css'

const UserPage = (props) => {

    const [collection, setCollection] = useState([]);
    const [user, token] = useAuth();
    const {username} = useParams();
    const [userID, setUserID] = useState();
    const [profilePic, setProfilePic] = useState("");
    const [profile, setProfile] = useState("")
    const [followedUsers, setFollowedUsers] = useState([]);


    useEffect(() => {
        getCollection();
        getProfileInfo();

        let tempData = []
        props.following.map((e) => {
            tempData.push(e.follower_user_id)
            console.log(e.follower_user_id)
            console.log(tempData)
            
        })
        setFollowedUsers(tempData)

    }, [])
    async function getCollection() {
        try {
            let tempUser = await axios.get(`http://127.0.0.1:8000/api/auth/${username}/`);
            setUserID(tempUser.data[0].id);
            console.log(tempUser.data)
            let tempCollection = await axios.get(`http://127.0.0.1:8000/api/collection/${tempUser.data[0].id}`, {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            console.log(tempCollection)
            setCollection(tempCollection);
        } catch (error) {
            console.log(error.response.data);
        }
    }


    function handleSubmit(event) {
        event.preventDefault();

        let newFollow = {
            follower_user : user.id,
            main_user : profile.user.id,
        }
        console.log(newFollow)
        followUser(newFollow)
    }

    function handleDelete(event) {
        event.preventDefault();

        let data = {
            follower_user : user.id,
            main_user : profile.user.id,
        }

        deleteFollow(data)
    }

    async function getProfileInfo() {
        console.log(user)
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${user.id}/`)
        let pictureData = `http://127.0.0.1:8000${response.data.profile_picture}`
        setProfilePic(pictureData);
        setProfile(response.data);
    }

    async function deleteFollow(data) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/followers/delete/?follower_user=${data.follower_user}&main_user=${data.main_user}`, {
                            headers: {
                                Authorization : "Bearer " + token,
                            },
                        })
            // props.setFollowing()
            
        } catch (error) {
            console.log(error.response.data)
        }
    }

    async function followUser(data) {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/followers/`, data, {
                            headers: {
                                Authorization : "Bearer " + token,
                            },
                        })
            // props.setFollowing()
            
        } catch (error) {
            console.log(error.response.data)
        }
    }

    // async function createPost(data) {
    //     console.log(data)
    //     console.log(userPosts)
    //     try {
    //         let followingResponse = await axios.post('http://127.0.0.1:8000/api/posts/', data, {
    //             headers: {
    //                 Authorization : "Bearer " + token,
    //             },
    //         })
    //         getUserPosts();
    //         console.log(followingResponse);
    //     } catch (error) {
            
    //     }
    // }


    return ( 
        <div className='page'>
            <div className='image-description'>
                <h2>{username}</h2>
                <div className='profile-pic'>
                    <img src={profilePic}/>
                </div>
                <div className='profile-desc'>
                    { (() => {
                        console.log(followedUsers.includes(userID))
                        if (followedUsers.includes(userID)) {
                            return (
                                <button value={'unfollow'} onClick={handleDelete}>Following</button>
                            )
                        } else {
                            return (
                                <button onClick={handleSubmit}>Follow</button>
                            )
                        }
                    })()
                       
                    }

                    {/* {
                    if (props.following.includes(username) === true) {
                        return (
                            <button>Follow</button>
                        )
                        
                    } else {
                        
                    }} */}
                    
                    <h3>About Me!</h3>
                    <p>{profile.profile_description}</p>
                </div>
            </div>
            <div className='collection'>
                <GameTable collection={collection} owner={false}/>
            </div>
        </div>
     );
}
 
export default UserPage;