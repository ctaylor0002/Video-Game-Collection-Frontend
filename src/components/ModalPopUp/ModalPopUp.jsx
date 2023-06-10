import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "./ModalPopUp.css";
import AddGameModalPopUp from "../AddGamesModalPopUp/AddGamesModalPopUp";

const ModalPopUp = (props) => {
  const [gameName, setGameName] = useState("");
  const [checkValue, setCheckValue] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, token] = useAuth();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {}, []);

  function openModalPopUp() {
    if (openModal === false) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }

  return (
    <div>
      <div className="modal-background">
        <div className="modal-container"> 
          <div className='modal-header'> 
                    <input placeholder='Search For Game' onChange={(event) => setSearchTerm(event.target.value)} />
                    <button onClick={((event) => openModalPopUp())}>More Games?</button>
                    <button onClick={() => props.closeModal(false)}>X</button>
                </div> 
          <div className='modal-table'>
          <table className='table table-dark'>
                        <tbody>
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
                                    <tr className='game-row' onClick={() => props.addCollection(videoGame)}>
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
      <div className="search-game">
        {openModal && (
          <AddGameModalPopUp
            closeModal={setOpenModal}
            setGameList={props.setGameList}
            getAllGames={props.getAllGames}
            addGame={props.addGame}
          />
        )}
      </div>
    </div>
  );
};

export default ModalPopUp;
