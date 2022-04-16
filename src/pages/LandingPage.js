import React from "react";
import GoogleLogin from "react-google-login";
import { Navigate } from "react-router-dom";
import lp_image from "../images/LP_Image.jpg"
import or_line from "../images/Or_Line.JPG"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'


export default class LandingPage extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            flag: ''
        }
    }

    onSuccessGoogle(res) {
        console.log(res)
    }

    onFailureGoogle(err) {
        console.log(err)
    }

    onClickEmail(e) {
        this.setState({...this.state, flag: 'email'})
    }

    render() {

        let nav

        if (this.state.flag === 'email') nav = <Navigate to='/signup'/>

        return(
            <div className="white-bg">
                {nav}
                <img src={lp_image} alt='Group of people' className="landing-page-image"/>
                <div className="landing-page-icon">
                    <FontAwesomeIcon icon={faGlobe} size='4x'/>
                </div>
                <h1 className="header-font landing-page-header">
                    Connect with the world and share all that you can!
                </h1>
                <h2 className="header-font landing-page-subhead">
                    Join The Share Club!
                </h2>
                <GoogleLogin 
                    clientId="116648223733-n1nnr6q8lkgt18h46d56i82t3p8bdkjd.apps.googleusercontent.com"
                    buttonText="Signup using Google"
                    onSuccess={this.onSuccessGoogle.bind(this)}
                    onFailure={this.onFailureGoogle.bind(this)}
                    cookiePolicy={'single_host_origin'}
                    className="landing-page-button landing-page-google button-inside"
                />
                <button className="landing-page-button landing-page-apple button-inside">
                    <FontAwesomeIcon icon={faApple} size='2x'/>
                    <p className="button-font">Sign up using Apple</p>
                </button>
                <img src={or_line} alt="or" className="or-line"/>
                <button className="landing-page-button landing-page-email button-inside" onClick={this.onClickEmail.bind(this)}>
                    <p className="button-font">Sign up using Email</p>
                </button>
                <h3 className="header-font landing-page-already">
                    Already have an account?
                </h3>
                <button className="landing-page-button landing-page-login button-inside">
                    <p className="button-font">Login</p>
                </button>
            </div>
        )
    }
}