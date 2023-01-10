import React, { useState, useEffect } from 'react';
import useAuth from './../../hooks/useAuth';
import Logo from '../../assets/Logo.png';
import './NavBar.css';
import axios from 'axios';
// import ProfilePic from '../../assets/base_profile_picture.jpg'




const NavBar = () => {

    const [ProfilePic, setProfilePic] = useState("");
    const [ProfileDec, setProfileDesc] = useState("");
    const [user, token] = useAuth();

    useEffect(() => {
        getProfileInfo();
    }, [])

    const getProfileInfo = async (event) => {
        // event.preventDefault();
        console.log(user)
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${user.id}/`)
        let pictureData = `http://127.0.0.1:8000${response.data.profile_picture}`
        setProfilePic(pictureData);
        console.log(response.data.profile_picture)
        //setProfilePic(response.data.profile_pic)

        console.log(ProfilePic)
        console.log(response);
    }


    return ( 
        
        <div className='navigation-bar'>
            <div className='navigation-bar-logo'>
                <img src = {Logo} alt='Gaming Corner Logo' className='navigation-bar-logo-image'/>
            </div>

            <div className='navigation-bar-title'>
                <h1>Gaming Corner</h1>
            </div>

            <div className='navigation-bar-locations'>
                <ul>
                    <li>Home</li>
                    <li>Profile</li>
                    <li>Collection</li>
                </ul>
                <div className='navigation-bar-locations-user'>
                    <img src={ProfilePic} className='navigation-bar-locations-user-profile-picture'/>
                    <h2>Welcome, username</h2>
                
                </div>
                    
            </div>  
            
        </div>
     );
}
 
export default NavBar;