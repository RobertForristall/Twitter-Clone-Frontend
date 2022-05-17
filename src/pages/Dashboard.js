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



    let left_col_items =  left_col_content.map(item => {
        return <button className="dash-left-item" key={item.text}>
            <span>{item.icon}</span>
            <span className="button-font">{item.text}</span>
        </button>
    })

    let tweet_items = tweets.map(tweet => {
        return <div>
            <Tweet tweet={tweet} key={tweet.id}/>
            <br></br>
        </div>
    })

    let tweet_share_items = tweet_share_icons.map(item => {
        return <Tooltip key={item.tooltip} title={<p style={{fontSize: "20px"}}>{item.tooltip}</p>}>
            <span>
                <button className="share-content-icon">
                    {item.icon}
                </button>
            </span>
        </Tooltip>
    })

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

            />
            <br />
            <div>
                {tweet_share_items}
                <span className="share-tweet-btn">
                    <button className="landing-page-button button-font">
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


