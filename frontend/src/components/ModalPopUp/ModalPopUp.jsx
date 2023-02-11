import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import './ModalPopUp.css'

const ModalPopUp = (props) => {
    
    const [gameName, setGameName] = useState("");
    const [checkValue, setCheckValue] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [user, token] = useAuth();
    
    useEffect(() => {

    }, [])
    
    

    return ( 
        <div className='modal-background'>
            <div className='modal-container'>
                <div className='modal-header'>
                    <input placeholder='Search For Game' onChange={(event) => setSearchTerm(event.target.value)} />
                    <button onClick={() => props.closeModal(false)}>X</button>
                </div>
                <div className='modal-table'>
                    <table className='table table-dark'>
                        <tbody>
                            {console.log(props.collection)}
                            {props.gameList &&
                            props.gameList.filter((videoGame) => {
                                
                                if (props.collection.includes(videoGame.video_game_title)) {
                                    
                                } else {
                                    if(searchTerm === "" ) {
                                        return videoGame;
                                    } else if (videoGame.video_game_title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                        return videoGame;
                                    }
                                }
                            }).map((videoGame) => {
                                return(
                                    <tr>
                                        <td><img src={videoGame.video_game_image}/></td>
                                        <td>{videoGame.video_game_title}</td>
                                    </tr>
                                )
                                
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>


// {props.collection.data &&
//     props.collection.data.filter((videoGame) => {
//         if (searchTerm === "" ) {
//             return videoGame;
//         } else if (videoGame.video_game.video_game_title.toLowerCase().includes(searchTerm.toLowerCase())) {
//             return videoGame;
//         }
//     }).map((videoGame) => {
//         {console.log(videoGame)}
//         let completion
//         {
//             if (videoGame.completed == 0) {
//                 console.log(videoGame.completed == 0)
//                 completion = "Not Completed"
//             } else {
//                 completion = "Completed"
//         }}
//         return (
//             <tr >
//                 <td><img src={videoGame.video_game.video_game_image}/></td>
//                 {/* <td>{videoGame.user.username}</td> */}
//                 <td>{videoGame.video_game.video_game_title}</td>
//                 <td>{completion}</td>
//                 <td><button value={videoGame.id} onClick={(event) => props.removeGame(event.target.value)}>X</button></td>
//                 {/* <button className='delete-button-tag' value={post.id} onClick={(event) => props.deletePost(event.target.value)}>X</button>  */}
                
//             </tr>
     );
}
 
export default ModalPopUp;