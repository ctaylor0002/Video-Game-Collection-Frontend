import React, { useState } from 'react';
import DislikeButtonImg from "../../../assets/Thumbs-Down.png"
import DislikedButtonImg from "../../../assets/Thumbs-Down-Selected.png"
import "./DislikeButton.css"

const DislikeButton = (props) => {

    const [dislikeValue, setDislikeValue] = useState(0);
    const [dislikeImage, setDislikeImage] = useState(DislikeButtonImg);


    function dislikeButtonCall() {
        console.log(dislikeValue)
        if (dislikeValue == 0) {
            try {
                setDislikeValue(1);
                setDislikeImage(DislikedButtonImg);
                props.likeOrDislikePost(props.id, 'dislike', 1);
                
            } catch (error) {
                console.log(error.response.data)
            }

        }  else if (dislikeValue == 1) {
            try {
                setDislikeValue(0);
                setDislikeImage(DislikeButtonImg);
                props.likeOrDislikePost(props.id, 'dislike', -1);
                
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    return ( 
        <img className='jump-shake'src={dislikeImage}  onClick={dislikeButtonCall}/>
     );
}
 
export default DislikeButton;