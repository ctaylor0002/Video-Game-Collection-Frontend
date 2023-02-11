import React, { useState, useEffect } from 'react';
import './CollectionPage.css'
import GameTable from '../../components/GameTable/GameTable';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import ModalPopUp from '../../components/ModalPopUp/ModalPopUp';

const CollectionPage = (props) => {
    const [user, token] = useAuth();
    const [collection, setCollection] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [gameList, setGameList] = useState([]);
    const [gameNames, setGameNames] = useState([]);
 
    useEffect(() => {
        getCollection();
        getAllGames();
    }, [])

    function openModalPopUp() {
        if (openModal === false) {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    }

    async function getAllGames() {
        try {
            let videoGamesResponse = await axios.get('http://127.0.0.1:8000/api/video_game/get/', {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            console.log(videoGamesResponse.data);
            setGameList(videoGamesResponse.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function getCollection() {
        try {
            let tempCollection = await axios.get(`http://127.0.0.1:8000/api/collection/${user.id}`, {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            setCollection(tempCollection);
            let tempData = [];
            for (let i = 0; i < tempCollection.data.length; i++) {
                tempData.push(tempCollection.data[i].video_game.video_game_title)
            }
            setGameNames(tempData)

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
            <button onClick={() => openModalPopUp()}>Add Video Games</button>
            <GameTable collection={collection} getCollection={getCollection} removeGame={removeGame}/>
            {openModal && <ModalPopUp closeModal={setOpenModal} getAllGames={getAllGames} gameList={gameList} collection={gameNames} />}
        </div>
     );
}
 
export default CollectionPage;