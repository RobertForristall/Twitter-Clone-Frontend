import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as normal_thumb, faShareFromSquare as normal_share, faEdit, faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as liked_thumb, faShareFromSquare as retweeted_share } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import { base_address } from "../constants";
import { Tooltip } from "@mui/material";
import { Buffer } from 'buffer'

export default function Tweet (props) {

    const [liked, setLiked] = useState(props.like_flag)
    const [retweeted, setRetweeted] = useState(props.retweet_flag)
    const [err_flag, setError] = useState(false)

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

    const onClickRetweet = (e) => {

        let new_fileKey = (props.tweet.sharedContent === "Image" || props.tweet.sharedContent === "GIF") ? props.tweet.fileKey : ""

        const req = {
            retweet: {
                tweet_id: props.tweet.tweet_id,
                user_id: props.user_id
            },
            tweet: (({email, ...o}) => ({...o, user_id: props.user_id, retweets: props.tweet.retweets+1, fileKey: new_fileKey}))(props.tweet)
        }

        console.log(req)
    
        axios.post(base_address+'/tweets/retweet/add', req, {
            headers: {
                authorization: "Bearer " + props.token
            }
        })
        .then(res => {
            console.log(res)
            props.tweet.retweets += 1
            setRetweeted(!retweeted)
        })
        .catch(err => {
            console.log(err.response.data.errno)
            if (err.response.data.errno === 1062) {
                setError(true)
            }
        })
     
    }

    const thumb_up = <FontAwesomeIcon icon={(!liked ? normal_thumb : liked_thumb)}/>

    const share_button = <FontAwesomeIcon icon={(!retweeted ? normal_share : retweeted_share)}/>

    let edit_buttons
    if (props.user_id === props.tweet.user_id) {
        edit_buttons = <div style={{display: 'inline-flex'}}>
            <Tooltip title={<p style={{fontSize: "10px"}}>Edit</p>}>
                <button onClick={(e) => props.onClickEdit(e, props.index, props.tweet.tweet_id)}>
                    <FontAwesomeIcon icon={faEdit}/>
                </button>
            </Tooltip>
            <Tooltip title={<p style={{fontSize: "10px"}}>Delete</p>}>
                <button onClick={(e) => props.onClickDelete(e, props.index, props.tweet.tweet_id)}>
                    <FontAwesomeIcon icon={faRectangleXmark}/>
                </button>
            </Tooltip>
        </div>
    }

    let like_msg = liked ? "Liked!" : "Like?"
    let retweet_msg = retweeted ? "Shared!" : "Share?"

    if (err_flag) retweet_msg = "Already Shared!"

    let content_container
    if (props.tweet.sharedContent === 'Image' || props.tweet.sharedContent === 'GIF') {

        const src_string = "data:image/png;base64," + props.tweet.image

        content_container = <div>
            <img src={src_string} style={{maxWidth: '300px', maxHeight: '300px'}}/>
        </div>
    }
    else if (props.tweet.sharedContent === 'Poll'){

        content_container = <div style={{marginLeft: '30px'}}>
            <h1 style={{}}>{props.tweet.question}</h1>
            {props.tweet.choice_arr.map((choice, index) => {
                if (choice !== null){
                    return <div key={index}>
                        <p>{choice}</p>
                        <button onClick={e => {
                            props.onClickPollOption(e, props.index, props.tweet.tweet_id)
                        }} value={index+1}>{index+1}</button>
                    </div>
                }
            })}
        </div>

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
        {content_container}
        {edit_buttons}
        <p className="like-retweet-buttons">
            <Tooltip title={<p style={{fontSize: "10px"}}>{like_msg}</p>}  placement="top">
                <button onClick={onClickLike} className="like-button">
                    {thumb_up}
                </button>
            </Tooltip>
            {props.tweet.likes}
            <Tooltip title={<p style={{fontSize: "10px"}}>{retweet_msg}</p>} placement="top">
                <button onClick={onClickRetweet} className="like-button">
                    {share_button}
                </button>
            </Tooltip>
            {props.tweet.retweets}
            <span style={{marginRight: '20px'}}></span>
        </p>
        
    </div>
}