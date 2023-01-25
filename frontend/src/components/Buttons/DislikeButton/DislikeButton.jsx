import React, { useState } from 'react';
import DislikeButtonImg from "../../../assets/Thumbs-Down.png"
import DislikedButtonImg from "../../../assets/Thumbs-Down-Selected.png"
import "./DislikeButton.css"
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const DislikeButton = (props) => {

    const [dislikeValue, setDislikeValue] = useState(0);
    const [dislikeImage, setDislikeImage] = useState(DislikeButtonImg);
    const [user, token] = useAuth();
   
    const dislikeButtonCall = async () => {
        console.log(token)
        if (dislikeValue === 0) {
            setDislikeValue(1);
            setDislikeImage(DislikedButtonImg);
            

            //I can remove the ${props.id} from the url as it does nothing

            let dislikeResponse = await axios.patch(`http://127.0.0.1:8000/api/posts/type/${props.id}?type=dislike&value=1`, {id : (props.id)}, {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });

            // let dislikeResponse = await axios.patch(`http://127.0.0.1:8000/api/posts/type/${props.id}?type=dislike`, {
            //     headers: {
            //         Authorization : "Bearer " + token,
            //     },
            // });
            console.log(dislikeResponse)
            //props.dislikePost(props.id, 1);


        }  else if (dislikeValue == 1) {
            setDislikeValue(0);
            setDislikeImage(DislikeButtonImg);
            let dislikeResponse = await axios.patch(`http://127.0.0.1:8000/api/posts/type/${props.id}?type=dislike&value=-1`, {id : (props.id)}, {
                headers: {
                    Authorization : "Bearer " + token,
                },
            });
            console.log(dislikeResponse)
            //props.dislikePost(props.id, -1);

        }
    }

    // async function dislikeButtonCall() {
    //     console.log(props)
    //     if (dislikeValue === 0) {
    //         setDislikeValue(1);
    //         setDislikeImage(DislikedButtonImg);
    
    //         let dislikeResponse = await axios.patch(`http://127.0.0.1:8000/api/posts/type/${props.id}?type=dislike`, {
    //             headers: {
    //                 Authorization : "Bearer " + token,
    //             },
    //         });
    //         console.log(dislikeResponse)
    //         //props.dislikePost(props.id, 1);


    //     }  else if (dislikeValue == 1) {
    //         setDislikeValue(0);
    //         setDislikeImage(DislikeButtonImg);
    //         //props.dislikePost(props.id, -1);

    //     }
    // }

    return ( 
        <img className='jump-shake'src={dislikeImage}  onClick={dislikeButtonCall}/>
     );
}
 
export default DislikeButton;