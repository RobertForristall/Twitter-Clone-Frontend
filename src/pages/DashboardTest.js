import React from "react";
import { base_address } from "../constants";
import axios from "axios";

export default class DashboardTest extends React.Component {

    constructor(props) {
        super(props)

        this.state = {}
    }

    /*
    componentDidMount() {
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
    }
    */

    render() {
        return(
            <div>
                Test Dashboard
            </div>
        )
    }
}