import React, { useState, useEffect } from 'react';
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

    return ( 
        <div>
        <GameTable collection={collection} getCollection={getCollection}/>


        </div>
     );
}
 
export default CollectionPage;