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
        // getProfileInfo();

        let tempData = []
        console.log(props.following)
        props.following.map((e) => {
            tempData.push(e.follower_user.id)
            console.log(e.follower_user)
            console.log(tempData)
            
        })
        setFollowedUsers(tempData)

    }, [])
    async function getCollection() {
        try {
            let tempUser = await axios.get(`http://127.0.0.1:8000/api/auth/${username}/`);
            setUserID(tempUser.data[0].id);
            console.log(user)
            const response = await axios.get(`http://127.0.0.1:8000/api/profile/${tempUser.data[0].id}/`)
            let pictureData = `http://127.0.0.1:8000${response.data.profile_picture}`
            setProfilePic(pictureData);
            setProfile(response.data);
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
            follower_user : profile.user.id,
            main_user : user.id,
        }
        console.log(newFollow);
        followUser(newFollow);
        document.getElementById("follow-button").innerHTML = "Following";
    }

    function handleDelete(event) {
        event.preventDefault();

        let data = {
            follower_user : profile.user.id,
            main_user : user.id,
        }

        deleteFollow(data);
        document.getElementById("follow-button").innerHTML = "Follow";
    }

    // async function getProfileInfo() {
        
    // }

    async function deleteFollow(data) {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/followers/delete/?follower_user=${data.follower_user}&main_user=${data.main_user}`, {
                            headers: {
                                Authorization : "Bearer " + token,
                            },
                        })
            console.log(props)
            
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
                        console.log(props)
                        props.setFollowing()
            
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
                        console.log(followedUsers)
                        console.log(followedUsers.includes(userID))
                        if (followedUsers.includes(userID)) {
                            return (
                                <button id="follow-button" value={'unfollow'} onClick={handleDelete}>Following</button>
                            )
                        } else {
                            return (
                                <button id="follow-button" onClick={handleSubmit}>Follow</button>
                            )
                        }
                    })()
                       
                    }

                    <h3>About Me!</h3>
                    <p className='desc'>{profile.profile_description}</p>
                </div>
            </div>
            <div className='collection'>
                <GameTable collection={collection} owner={false}/>
            </div>
        </div>
     );
}
 
export default UserPage;