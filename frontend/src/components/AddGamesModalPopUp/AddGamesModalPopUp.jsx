import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import './AddGamesModalPopUp.css'
import KEY from '../../RawgAPI.js'

const AddGameModalPopUp = (props) => {

    const [searchTerm, setSearchTerm] = useState("");

    async function searchRawgAPI() {
        try {
            let searchGames = await axios.get(`https://api.rawg.io/api/games?search=${searchTerm}&key=${KEY}`)
            searchGames = searchGames.data.results
            console.log(searchGames);
            console.log(searchGames.length)
            let tempData = {};
            for (let i = 0; i < searchGames.length; i++) {
 
                tempData["video_game_title"] = searchGames[i].name
                tempData["video_game_image"] = searchGames[i].background_image
                tempData["rawg_video_game_id"] = searchGames[i].id
                console.log(tempData);
                props.addGame(tempData);
            }

            props.closeModal(false)

        } catch (error) {
            
        }
    }
   
    return ( 
        <div className='modal-background-two'>
            <div className='modal-container-two'>
                <div className='modal-header'>
                    <input placeholder='What Game?' onChange={(event) => setSearchTerm(event.target.value)} />
                    <button onClick={(event) => searchRawgAPI()}>Search</button>
                    <button onClick={() => props.closeModal(false)}>X</button>
                </div>
            </div>
        </div>
     );
}
 
export default AddGameModalPopUp;