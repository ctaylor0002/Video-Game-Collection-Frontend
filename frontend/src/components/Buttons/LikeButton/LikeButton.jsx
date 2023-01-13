import React, { useState } from 'react';
import LikeButtonImg from "../../../assets/Thumbs-Up.png"
import LikedButtonImg from "../../../assets/Thumbs-Up-Selected.png"
import "./LikeButton.css"

const LikeButton = (props) => {

    const [likeValue, setLikeValue] = useState(0);
    const [likeImage, setLikeImage] = useState(LikeButtonImg);

   

    function likeButtonCall() {
        console.log(props)
        if (likeValue === 0) {
            setLikeValue(1);
            setLikeImage(LikedButtonImg);
            props.likeSong(props.id, 1);
            // props.getAllSongs();

        }  else if (likeValue == 1) {
            setLikeValue(0);
            setLikeImage(LikeButtonImg);
            props.likeSong(props.id, -1);
            // props.getAllSongs();
        }
    }

    return ( 
        <img className='jump-shake'src={likeImage}  onClick={likeButtonCall}/>
     );
}
 
export default LikeButton;