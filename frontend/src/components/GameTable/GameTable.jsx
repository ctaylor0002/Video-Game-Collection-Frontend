import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GameTable.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import useAuth from '../../hooks/useAuth';

const GameTable = (collection) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [user, token] = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [gameList, setGameList] = useState([]);
    const [gameNames, setGameNames] = useState([]);
 
    useEffect(() => {

    }, [])

    function openModalPopUp() {
        if (openModal === false) {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    }

    // async function getAllGames() {
    //     try {
    //         let videoGamesResponse = await axios.get('http://127.0.0.1:8000/api/video_game/get/', {
    //             headers: {
    //                 Authorization : "Bearer " + token,
    //             },
    //         });
    //         console.log(videoGamesResponse.data);
    //         setGameList(videoGamesResponse.data);
    //     } catch (error) {
    //         console.log(error.response.data);
    //     }
    // }

    async function addGame(data) {
        try {
            console.log(data)
            let newGameResponse = await axios.post('http://127.0.0.1:8000/api/video_game/add/', data, {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            let tempGames = [...gameList, data]
            console.log(tempGames)
            setGameList(tempGames);
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
            // setCollection(tempCollection);
            let tempData = [];
            for (let i = 0; i < tempCollection.data.length; i++) {
                tempData.push(tempCollection.data[i].video_game.video_game_title)
            }
            setGameNames(tempData)

        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function addCollection(data) {
        try {
            console.log(data)
            let tempCollection = await axios.post(`http://127.0.0.1:8000/api/collection/${user.id}`, data,  {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            getCollection();
            openModalPopUp();
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

    function collectionCheck() {
        // console.log(props.collection.data)

        if (collection.collection == null) {
            console.log('Works')
            return (
                <h2 className='collection-title'>No Collection Found</h2>
            );
        } else if(collection.collection != null) {

            const returnData = collection &&
                collection.collection.filter((videoGame) => {
                    if (searchTerm === "" ) {
                        return videoGame;
                    } else if (videoGame.video_game.video_game_title.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return videoGame;
                    }
                }).map((videoGame) => {
                    {console.log(videoGame)}
                    let completion
                    {
                        if (videoGame.completed == 0) {
                            console.log("Not Completed")
                            completion = "Not Completed"
                        } else {
                            console.log('Completed')
                            completion = "Completed"
                    }}
                    {
                        if (collection.owner === true) {
                            // console.log(props.owner)
                            return (
                                <tr >
                                    <td><img src={videoGame.video_game.video_game_image}/></td>
                                    <td>{videoGame.video_game.video_game_title}</td>
                                    <td>{completion}</td>
                                    <td><button value={videoGame.id} >X</button></td> 
                                    {/* onClick={(event) => props.removeGame(event.target.value)}                                       */}
                                </tr>
                            )
                        } else {
                            console.log(videoGame)
                            return (
                                <tr>
                                    <td><img src={videoGame.video_game.video_game_image}/></td>
                                    <td>{videoGame.video_game.video_game_title}</td>
                                    <td>{completion}</td>               
                                </tr>
                            )
                        }
                        
                    }
                   
                })
                return (
                    <div>
                        <h2 className='container-header'>Video Game Collection</h2>
                        <div className='game-table-header'>
                            <input type="text" placeholder="Search Collection" className='game-table-search-bar' onChange={(event) => setSearchTerm(event.target.value)}/>
                        </div>
                        <div className='modal-table'>
                            <table className='table table-dark'>
                                <tbody>
                                    {returnData}
                                </tbody>
                            </table>

                        </div>
                    </div>
                );
            
                    
        }
    }

    return ( 
        collectionCheck()
     );
}
 
export default GameTable;