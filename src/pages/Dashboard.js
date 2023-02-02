import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { base_address, left_col_content, tweet_share_icons } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faImage, faPoll, faCalendar, faMapLocation } from "@fortawesome/free-solid-svg-icons";
import { TextareaAutosize, Tooltip } from "@mui/material";
import { TextField } from "@mui/material";
import Tweet from "../components/Tweet.component";

export default function Dashboard (props) {

    const [state, setState] = useState(useLocation().state)
    const [tweets, setTweets] = useState([])
    const [new_tweet, setNewTweet] = useState({
        //email: state.email,
        user_id: state.user_id,
        msg: "",
        sharedContent: "None",
        likes: 0,
        retweets: 0,
        datePosted: new Date(),
        originalPoster: state.user_id,
       //fileKey: ""
    })
    const [file_info, setFileInfo] = useState({
        name: "None Selected",
        type: "N/A",
    }) 

    useEffect(() => {
        console.log("Getting Tweets...")
        axios.get(base_address + '/tweets/' + state.user_id, {
            headers: {
                authorization: "Bearer " + state.token
            }
        })
        .then(res => {
            console.log(res.data)
            setTweets(res.data[0].map(tweet => {
                return <div key={tweet.tweet_id}>
                    <Tweet tweet={tweet} token={state.token} user_id={state.user_id}/>
                    <br></br>
                </div>
            }))
            //setTweets(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [state.email, state.token, state.user_id])

    const onClickShare = (e) => {

        const req = {
            tweet: new_tweet,
            file: file_info
        }

        axios.post(base_address + "/tweets/add", req, {
            headers: {
                authorization: "Bearer " + state.token
            }
        })
        .then(res => {
            console.log("Tweet Added!")
            setTweets(tweets.concat(
                <div key={-99}>
                    <Tweet tweet={{...new_tweet, email: state.email}} token={state.token} user_id={state.user_id}/>
                    <br></br>
                </div>
            ))
            setNewTweet({
                //email: state.email,
                user_id: state.user_id,
                msg: "",
                sharedContent: "None",
                likes: 0,
                retweets: 0,
                datePosted: new Date(),
                originalPoster: state.user_id,
            })
        })
        .catch(err => {console.log(err)})
    }

    /*
    Java Backend
    useEffect(() => {
        console.log("Getting tweets...")
        axios.get(base_address + "/tweet/email", {
            params: {
                email: state.email
            },
            headers: {
                authorization: "Bearer " + state.access_token
            }
        })
        .then(res => {
            console.log(res)
            setTweets(res.data)
        })
    }, [state.email, state.access_token])
    
    const onClickShare = (e) => {
        const req = {
            tweet: {...new_tweet, fileKey: file_info.name},
            file: file_info
        }

        axios.post(base_address + "/tweet/add", req, {
            headers: {
                authorization: "Bearer " + state.access_token
            }
        })
        .then(res => {
            console.log("Tweet Added!")
            setTweets(tweets.concat([req.tweet]))
        })
        .catch(err => {console.log(err)})
    }
    */

    let left_col_items =  left_col_content.map(item => {
        return <button className="dash-left-item" key={item.text}>
            <span>{item.icon}</span>
            <span className="button-font">{item.text}</span>
        </button>
    })

    let tweet_share_items = tweet_share_icons.map(item => {
        return <Tooltip key={item.tooltip} title={<p style={{fontSize: "20px"}}>{item.tooltip}</p>}>
            <span>
                <button className="share-content-icon" onClick={e => {
                    if (new_tweet.sharedContent === item.tooltip.substring(6)){
                        setNewTweet({...new_tweet, sharedContent: "None"})
                    }
                    else {
                        setNewTweet({...new_tweet, sharedContent: item.tooltip.substring(6)})
                    }
                }}>
                    {item.icon}
                </button>
            </span>
        </Tooltip>
    })

    let file_upload
    let pic_preview

    if (file_info.name !== "None Selected") pic_preview = <img src={URL.createObjectURL(file_info)} alt="" style={{maxHeight: "300px", maxWidth: "300px"}}/>

    if (new_tweet.sharedContent === "Image" || new_tweet.sharedContent === "GIF"){
        file_upload = <div className="file-upload">
            <p>Chosen file: {file_info.name}</p>
            <p>File type: {file_info.type}</p>
            <br></br>
            <p>Please upload an {new_tweet.sharedContent} file below:</p>
            <input type="file" onChange={e => {setFileInfo(e.target.files[0])}} accept=".jpg, .png"/>
            <div>{pic_preview}</div>
        </div>
    }

    return <div className="dashboard">
        <div className="dashboard-icon">
            <FontAwesomeIcon icon={faGlobe} size='4x'/>
        </div>
        <div className="dash-left-col">
            {left_col_items}
        </div>
        <div className="dash-middle-col">
            <TextareaAutosize 
                aria-label="New Tweet Field"
                minRows={10}
                style={{width: "100%"}}
                onChange={e => {setNewTweet({...new_tweet, msg: e.target.value})}}

            />
            <br />
            {file_upload}
            <div>
                {tweet_share_items}
                <span className="share-tweet-btn">
                    <button className="landing-page-button button-font" onClick={onClickShare}>
                        Share
                    </button>
                </span>
            </div>
            <div style={{marginBottom: "90px"}}></div>
            <div>
                {
                tweets
                }
            </div>
        </div>
        <div className="dash-right-col">
            <TextField 
                label="Search"
            />
        </div>
    </div>

}


