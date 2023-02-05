import React, { useState, useEffect } from 'react';
import "./UserTable.css"

const UserTable = (props) => {

    const [buttonCheck, setButtonCheck] = useState(0);
    const [displayImg, setDisplayImg] = useState("");
    const [profileDesc, setProfileDesc] = useState("");

    useEffect(() => {
        setDisplayImg(props.profilePic)
        setProfileDesc(props.profile.profile_description)
    },[props.profilePic])

    function displayData() {

        if (buttonCheck === 0) {
            return (
                <div>
                    <h3>Followers</h3>
                    {props.followers &&
                    props.followers.map((follower) => {
                
                            return (
                                <tr>
                                    <td>{follower.main_user.username}</td>
                                </tr>
                        
                            )
                        })}
                </div>
            )
        } else if (buttonCheck === 1) {
            return (
            <div>
                <h3>Following</h3>
                {props.following &&
                props.following.map((following) => {
            
                        return (
                            <tr>
                                <td>{following.follower_user.username}</td>
                            </tr>
                    
                        )
                    })}
            </div>
            )
        } else if(buttonCheck === 2) {
            return (
                <div>
                    <form onSubmit={updateProfile} id="form">
                        <div>
                            <h3>{props.profile.user.username}</h3>
                        </div>
                        <div>
                            <img src={(displayImg)} />
                            <input id='image' type={'file'} accept="image/*" name="profile_picture" onChange={(event) => updateImg(event)}></input>
                        </div>
                        <div>
                            <h3>Profile Description</h3>
                            <textarea rows={"5"} columns={"50"} placeholder={profileDesc} className='profile-description-text-box' name="profile_description" onChange={(event) => setProfileDesc(event.target.value)}/>
                        </div>
                        <button type='submit'>Update</button>
                   
                   
                   
                    </form>
                </div>
            )
        }
    }

    async function updateProfile(event) {
        event.preventDefault();
        let form = document.getElementById('form')
        let profile = new FormData(form);

        // profile.append("file", displayImg);
        // profile.append("string", profileDesc);
        // let profile = {
        //     profile_picture : displayImg,
        //     profile_description : profileDesc
        // };

        console.log(profile)
        props.updateProfile(profile);


    }

    function updateImg(event) {
        //const objectUrl = URL.createObjectURL(img)
        let temp = document.getElementById('image');
        let sendData = temp.src = URL.createObjectURL(event.target.files[0]);
        setDisplayImg(sendData)
    }

    function setButtonState(value) {
        if (value == 0) {
            setButtonCheck(0);
            displayData();
        } else if (value == 1) {
            setButtonCheck(1);
            displayData();
        } else if (value == 2) {
            setButtonCheck(2);
            displayData();
        }
    }

    return ( 
        <div className='profile-container-followers-followed'>
                
            <div className='users-table'>
                <div className='users-table-header'>
                    <button value={0} onClick={(event) => setButtonState(event.target.value)}>Followers</button>
                    <button value={1} onClick={(event) => setButtonState(event.target.value)}>Following</button>
                    <button value={2} onClick={(event) => setButtonState(event.target.value)}>Update Profile</button>
                </div>
                <div>
                    <table>
                        <tbody>
                            {displayData()}
                        </tbody>
                
                    </table>
            

                </div>
            </div>
        </div>

     );
}
 
export default UserTable;
