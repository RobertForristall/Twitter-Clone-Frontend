import React from "react";
import Signup from "../components/Signup.component";
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navigate } from "react-router-dom";
import Login from "../components/Login.component";

export default class Credentials extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            page: props.page,
        }
    }

    onClickX(e) {
        this.setState({...this.state, page: 'landing'})
    }

    render () {

        let comp
        
        // Handle component flag
        if (this.state.page === 'landing') comp = <Navigate to='/'/>
        else if (this.state.page === 'signup') comp = <Signup />
        else if (this.state.page === 'login') comp = <Login />

        return(
            <div className="credentials-bg">
                <div className="credentials-popup">
                    <button className="credentials-x" onClick={this.onClickX.bind(this)}>
                        <FontAwesomeIcon icon={faX} size='3x'/>
                    </button>
                    <div className="credentials-icon">
                        <FontAwesomeIcon icon={faGlobe} size='4x'/>
                    </div>
                    {comp}
                </div>
            </div>
        )
    }
}