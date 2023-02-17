import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GameTable from '../../components/GameTable/GameTable';

const UserPage = (props) => {

    const [collection, setCollection] = useState([]);
    const [user, token] = useAuth();
    const {username} = useParams();
    const [userID, setUserID] = useState();


    useEffect(() => {
        getCollection();
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


    return ( 
        <div>
            <div className='image-description'>
                <div className='profile-pic'>

                </div>
                <div className='profile-desc'>

                </div>
            </div>
            <div className='collection'>
                <GameTable collection={collection} owner={false}/>
            </div>
        </div>
     );
}
 
export default UserPage;