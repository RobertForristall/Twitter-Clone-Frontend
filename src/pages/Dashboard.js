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
        email: state.email,
        msg: "",
        sharedContent: "None",
        likes: 0,
        retweets: 0,
        datePosted: new Date(),
        originalPosterId: state.email,
        fileKey: ""
    })
    const [file_info, setFileInfo] = useState({
        name: "None Selected",
        type: "N/A",
    })

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



    let left_col_items =  left_col_content.map(item => {
        return <button className="dash-left-item" key={item.text}>
            <span>{item.icon}</span>
            <span className="button-font">{item.text}</span>
        </button>
    })

    let tweet_items = tweets.map(tweet => {
        return <div key={tweet.id}>
            <Tweet tweet={tweet}/>
            <br></br>
        </div>
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
                {tweet_items}
            </div>
        </div>
        <div className="dash-right-col">
            <TextField 
                label="Search"
            />
        </div>
    </div>

}


