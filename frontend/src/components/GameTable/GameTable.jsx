import React, { useState, useEffect } from 'react';
import './GameTable.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const GameTable = (props) => {

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

    }, [])

    function collectionCheck() {
        console.log(props.collection.data)

        if (props.collection.data == []) {
            return (
                <h2 className='collection-title'>No Collection Found</h2>
            )
        } else {

            const returnData = props.collection.data &&
                props.collection.data.filter((videoGame) => {
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
                        if (props.owner === true) {
                            console.log(props.owner)
                            return (
                                <tr >
                                    <td><img src={videoGame.video_game.video_game_image}/></td>
                                    <td>{videoGame.video_game.video_game_title}</td>
                                    <td>{completion}</td>
                                    <td><button value={videoGame.id} onClick={(event) => props.removeGame(event.target.value)}>X</button></td>                                       
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
            return returnData;
                    
        }
    }

    return ( 
        <div>
            <div className='game-table-header'>
                <h2 className='container-header'>Video Game Collection</h2>
                <input type="text" placeholder="Search Collection" className='game-table-search-bar' onChange={(event) => setSearchTerm(event.target.value)}/>
            </div>
            <table className='table table-dark'>
                <tbody>
                    {collectionCheck()}
                </tbody>
                


            </table>
        </div>
     );
}
 
export default GameTable;