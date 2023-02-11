import React, { useState, useEffect } from 'react';
import './GameTable.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const GameTable = (props) => {

    useEffect(() => {

    }, [])


    return ( 
        <div>
            <h2 className='container-header'>Video Game Collection</h2>
            <table className='table table-dark'>
                <tbody>
                    {props.collection.data &&
                    props.collection.data.map((videoGame) => {
                        {console.log(videoGame)}
                        let completion
                        {
                            if (videoGame.completed == 0) {
                                console.log(videoGame.completed == 0)
                                completion = "Not Completed"
                            } else {
                                completion = "Completed"
                        }}
                        return (
                            <tr >
                                <td><img src={videoGame.video_game.video_game_image}/></td>
                                {/* <td>{videoGame.user.username}</td> */}
                                <td>{videoGame.video_game.video_game_title}</td>
                                <td>{completion}</td>
                                <td><button value={videoGame.id} onClick={(event) => props.removeGame(event.target.value)}>X</button></td>
                                {/* <button className='delete-button-tag' value={post.id} onClick={(event) => props.deletePost(event.target.value)}>X</button>  */}
                                
                            </tr>
                        )
                    })}
                </tbody>
                


            </table>
        </div>
     );
}
 
export default GameTable;