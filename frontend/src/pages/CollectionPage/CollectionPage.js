import React, { useState, useEffect } from 'react';
import './CollectionPage.css'
import GameTable from '../../components/GameTable/GameTable';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const CollectionPage = (props) => {
    const [user, token] = useAuth()
    const [collection, setCollection] = useState([]);
 
    useEffect(() => {
        getCollection();
    }, [])
    async function getCollection() {
        try {
            let tempCollection = await axios.get(`http://127.0.0.1:8000/api/collection/${user.id}`, {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            setCollection(tempCollection);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function removeGame(id) {
        console.log(id)
        let response = await axios.delete(`http://127.0.0.1:8000/api/collection/${id}/update/`, {
            headers: {
                Authorization : "Bearer " + token,
            },
        });
        getCollection();
    }

    return ( 
        <div className='container'>

            <GameTable collection={collection} getCollection={getCollection} removeGame={removeGame}/>

        </div>
     );
}
 
export default CollectionPage;