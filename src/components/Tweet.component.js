import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as normal_thumb, faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as liked_thumb } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { base_address } from "../constants";

export default function Tweet (props) {

    const [liked, setLiked] = useState(false)
    const [flag, setFlag] = useState(false)

    const onClickLike = (e) => {

        const req = {
            tweet_id: props.tweet.tweet_id,
            user_id: props.user_id
        }
    
        axios.put(base_address+'/tweets/like/add', req, {
            headers: {
                authorization: "Bearer " + props.token
            }
        })
        .then(res => {
            console.log(res)
            setLiked(!liked)
        })
        .catch(err => {console.log(err)})
    }

    let thumb_up

    if (!liked) {
        thumb_up = <FontAwesomeIcon icon={normal_thumb}/>
    }
    else {
        thumb_up = <FontAwesomeIcon icon={liked_thumb}/>
    }

    return <div className="tweet-container">
        <span>
            <button className="round-button" style={{display: 'inline-block'}}>
                <img 
                    src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg" 
                    alt=""
                    style={{width: "50px", height: "50px", borderRadius: "50%"}}    
                />
            </button>
            <h2 style={{display: 'inline-block'}}>{props.tweet.email}</h2>
        </span>
        <p className="tweet-msg tweet-font">{props.tweet.msg}</p>
        <p className="like-retweet-buttons">
            <button onClick={onClickLike} className="like-button">
                {thumb_up}
            </button>
            {props.tweet.likes}
            <button className="like-button">
                <FontAwesomeIcon icon={faShareFromSquare}/>
            </button>
            {props.tweet.retweets}
            <span style={{marginRight: '20px'}}></span>
        </p>
        
    </div>
}