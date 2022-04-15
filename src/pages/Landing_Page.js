import React from "react";
import lp_image from "../images/LP_Image.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'


export default class Landing_Page extends React.Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render() {
        return(
            <div className="white-bg">
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
                <button className="landing-page-button landing-page-google button-inside">
                    <FontAwesomeIcon icon={faGoogle} size='2x'/>
                    <p className="button-font">Sign up using Google</p>
                </button>
                <button className="landing-page-button landing-page-apple button-inside">
                    <FontAwesomeIcon icon={faApple} size='2x'/>
                    <p className="button-font">Sign up using Apple</p>
                </button>
                <div className="or-line"/>
                <div className="or-text">or</div>
                <button className="landing-page-button landing-page-email button-inside">
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