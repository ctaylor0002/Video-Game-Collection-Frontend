import React, { useState } from 'react';
import DislikeButtonImg from "../../../assets/Thumbs-Down.png"
import DislikedButtonImg from "../../../assets/Thumbs-Down-Selected.png"
import "./DislikeButton.css"

const DislikeButton = (props) => {

    const [dislikeValue, setDislikeValue] = useState(0);
    const [dislikeImage, setDislikeImage] = useState(DislikeButtonImg);

   

    function dislikeButtonCall() {
        console.log(props)
        if (dislikeValue === 0) {
            setDislikeValue(1);
            setDislikeImage(DislikedButtonImg);
            props.dislikePost(props.id, 1);


        }  else if (dislikeValue == 1) {
            setDislikeValue(0);
            setDislikeImage(DislikeButtonImg);
            props.dislikePost(props.id, -1);

        }
    }

    return ( 
        <img className='jump-shake'src={dislikeImage}  onClick={dislikeButtonCall}/>
     );
}
 
export default DislikeButton;