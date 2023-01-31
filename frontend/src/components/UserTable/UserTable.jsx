import React, { useState, useEffect } from 'react';


const UserTable = (props) => {

    const [buttonCheck, setButtonCheck] = useState(0);
    const [displayImg, setDisplayImg] = useState(props.profilePic)


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
                    <form>
                        <h3>{props.profile.user.username}</h3>
                        <img src={(displayImg)} />
                        <input id='image' type={'file'} accept="image/*" onChange={(event) => updateImg(event)}></input>
                    </form>
                </div>
            )
        }
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
