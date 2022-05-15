import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { base_address, left_col_content } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { TextareaAutosize } from "@mui/material";
import { TextField } from "@mui/material";

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
            <div></div>
        </div>
        <div className="dash-right-col">
            <TextField 
                label="Search"
            />
        </div>
    </div>

}


