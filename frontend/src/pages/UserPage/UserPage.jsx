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
    const [profile, setProfile] = useState("");


    useEffect(() => {
        getCollection();
        getProfileInfo();

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

    async function getProfileInfo() {
        console.log(user)
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${user.id}/`)
        let pictureData = `http://127.0.0.1:8000${response.data.profile_picture}`
        setProfilePic(pictureData);
        setProfile(response.data);
    }


    return ( 
        <div className='page'>
            <div className='image-description'>
                <h2>{username}</h2>
                <div className='profile-pic'>
                    <img src={profilePic}/>
                </div>
                <div className='profile-desc'>
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