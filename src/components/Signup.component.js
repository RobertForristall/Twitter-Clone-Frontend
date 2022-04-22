import React from "react";
import { TextField } from "@mui/material";
import DOB from '../components/DOB.component'
import axios from "axios";
import { base_address } from "../constants";

export default class Signup extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            form_flag: 1,
            full_name: '',
            email: '',
            dob_month: 0,
            dob_day: 0,
            dob_year: 0,
            err_msg_1: '',
            verification_code: '',
            inputted_token: ''
        }
    }

    onChangeName(e) {
        this.setState({...this.state, full_name: e.target.value})
    }

    onChangeEmail(e) {
        this.setState({...this.state, email: e.target.value})
    }

    onChangeMonth(e) {
        this.setState({...this.state, dob_month: e.target.value})
    }

    onChangeDay(e) {
        this.setState({...this.state, dob_day: e.target.value})
    }

    onChangeYear(e) {
        this.setState({...this.state, dob_year: e.target.value})
    }

    sendVerification(e) {

        // Include DOB check
        //if ()

        // Create Token
        const token = '123456'
        
        axios.get(base_address + '/users/sendVerification/' + this.state.email + '/' + token)
            .then(res => this.setState({...this.state, form_flag: 2, err_msg: '', verification_code: token}))
            //.then(res => this.setState({...this.state, err_msg_1: 'There is already an account associated with that email. Please use a different email or login with that email.'}))
            .catch(err => this.setState({...this.state, err_msg_1: err.response.data, verification_code: ''}))

    }

    onChangeVerification(e) {
        this.setState({...this.state, inputted_token: e.target.value})
    }

    checkVerification(e) {
        if (this.state.verification_code === this.state.inputted_token) {
            this.setState({...this.state, form_flag: 3, err_msg: ''})
        }
    }

    render() {
        let form

        if (this.state.form_flag === 1) {

            let msg

            if (this.state.err_msg_1 !== '') msg = <h2 className="signup-err-msg-1">{this.state.err_msg_1}</h2>

            form = <div>
                <h1 className="credentials-header header-font">Signup to The Share Club!</h1>
                {msg}
                <div className="text-field name">
                    <TextField 
                        id="name-field" 
                        label="Full Name" 
                        variant="outlined" 
                        onChange={this.onChangeName.bind(this)} 
                        fullWidth 
                        inputProps={{style: {fontSize: 30}}}
                        InputLabelProps={{style: {fontSize: 30}}}
                    />
                </div>
                <div className="text-field email">
                    <TextField 
                        id="email-field" 
                        label="Email" 
                        variant="outlined" 
                        onChange={this.onChangeEmail.bind(this)} 
                        fullWidth 
                        inputProps={{style: {fontSize: 30}}}
                        InputLabelProps={{style: {fontSize: 30}}}
                    />
                </div>
                <h2 className="header-font date-header">Date of Birth</h2>
                <p className="date-1 date-text">Please provide your date of birth</p>
                <p className="date-2 date-text">*Note this information will remain private*</p>
                <DOB 
                    onChangeMonth={this.onChangeMonth.bind(this)}
                    onChangeDay={this.onChangeDay.bind(this)}
                    onChangeYear={this.onChangeYear.bind(this)}
                    month = {this.state.dob_month}
                    day = {this.state.dob_day}
                    year = {this.state.dob_year}
                />
                <button className="next-button" onClick={this.sendVerification.bind(this)}>
                    Next
                </button>
            </div>
        }
        else if (this.state.form_flag === 2) {

            form = <div>
                <h1 className="credentials-header header-font">Signup to The Share Club!</h1>
                <h2 className="signup-validation-text">Validation email sent! Please open the email and enter the validation code below.</h2>
                <div className="text-field verify">
                    <TextField 
                        id="verify-field" 
                        label="Verification Code" 
                        variant="outlined" 
                        onChange={this.onChangeVerification.bind(this)} 
                        fullWidth 
                        inputProps={{style: {fontSize: 30}}}
                        InputLabelProps={{style: {fontSize: 30}}}
                    />
                </div>
                <button className="next-button" onClick={this.checkVerification.bind(this)}>
                    Next
                </button>
            </div>
        }
        else if (this.state.form_flag === 3) {

            form = <div>
                <h1 className="credentials-header header-font">Singup to the Share Club!</h1>
                <h2 className="signup-validation-text">Please enter and confirm your password</h2>
            </div>
        }

        return(
            <div>
                {form}
            </div>
        )
    }
}