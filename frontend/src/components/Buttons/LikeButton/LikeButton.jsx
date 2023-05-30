import React, { useState } from 'react';
import LikeButtonImg from "../../../assets/Thumbs-Up.png"
import LikedButtonImg from "../../../assets/Thumbs-Up-Selected.png"
import "./LikeButton.css"

const LikeButton = (props) => {

    const [likeValue, setLikeValue] = useState(0);
    const [likeImage, setLikeImage] = useState(LikeButtonImg);

   

    function likeButtonCall() {
        console.log(props)
        console.log(likeValue)
        if (likeValue == 0) {
            try {
                setLikeValue(1);
                setLikeImage(LikedButtonImg);
                props.likeOrDislikePost(props.id, 'like', 1);
                
            } catch (error) {
                console.log(error.response.data)
            }

        }  else if (likeValue == 1) {
            try {
                setLikeValue(0);
                setLikeImage(LikeButtonImg);
                props.likeOrDislikePost(props.id, 'like', -1);
                
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    return ( 
        <img className='jump-shake'src={likeImage}  onClick={likeButtonCall}/>
     );
}
 
export default LikeButton;