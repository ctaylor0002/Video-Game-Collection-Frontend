import React, { useState } from 'react';


const UserTable = (props) => {

    const [buttonCheck, setButtonCheck] = useState(0);


    function displayData() {
        console.log(props)
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
                        
                            // <div>
                            //     <p>{follower.main_user.username}</p><p>{follower.follower_user.username}</p>
                            // </div>
                            )
                        })}
                </div>
            )
        } else {
            return (
            <div>
                <h3>Following</h3>
                {props.following &&
                props.following.map((following) => {
            
                        return (
                            <tr>
                                <td>{following.follower_user.username}</td>
                            </tr>
                    
                        // <div>
                        //     <p>{follower.main_user.username}</p><p>{follower.follower_user.username}</p>
                        // </div>
                        )
                    })}
            </div>
            )
        }
    }

    function setButtonState(value) {
        console.log(value)
        if (value == 0) {
            setButtonCheck(0);
            displayData();
        } else {
            setButtonCheck(1);
            displayData();
        }
    }

    return ( 
        <div className='profile-container-followers-followed'>
                
            <div className='users-table'>
                <div className='users-table-header'>
                    <button classname={buttonCheck == 0 } value={0} onClick={(event) => setButtonState(event.target.value)}>Followers</button>
                    <button value={1} onClick={(event) => setButtonState(event.target.value)}>Following</button>
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
