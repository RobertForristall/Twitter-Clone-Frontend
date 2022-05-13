import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { base_address } from "../constants";

export default function Dashboard (props) {

    const [state, setState] = useState(useLocation().state)

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
            setState(state => ({...state, tweets: res.data}))
        })
    }, [state.access_token, state.email])

    return <div>

    </div>

}
