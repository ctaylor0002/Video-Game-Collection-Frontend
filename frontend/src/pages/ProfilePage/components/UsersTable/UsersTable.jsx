import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../../../hooks/useAuth';




const UsersTable = (props) => {

    const [user, token] = useAuth();
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);


    useEffect(() => {
        fetchFollowers();
        fetchFollowing();
    }, [])

    const fetchFollowers = async () => {
        try {
            let followersResponse = await axios.get('http://127.0.0.1:8000/api/followers/list/', {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            // console.log(followersResponse.data);
            setFollowers(followersResponse.data);
        } catch (error) {
            console.log(error.response.data);
        }
      }

    const fetchFollowing = async () => {
        try {
            let followingResponse = await axios.get('http://127.0.0.1:8000/api/followers/', {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            // console.log(followingResponse.data);
            setFollowing(followingResponse.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }


    return ( 
        <div className='users-table'>
            <div className='users-table-header'>
                <button>Followers</button>
                <button>Following</button>
            </div>
            <div>
                <table>
                    <tbody>
                    {followers &&
                    followers.map((follower) => {
                
                        return (
                            <tr>
                                <td>{follower.follower_user.username}</td>
                            </tr>
                        
                        // <div>
                        //     <p>{follower.main_user.username}</p><p>{follower.follower_user.username}</p>
                        // </div>
                        )
                        })}
                    </tbody>
                
                </table>
            

            </div>
        </div>
     );
}
 
export default UsersTable;