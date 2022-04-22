import React from "react";
import { TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import DOB from '../components/DOB.component'
import axios from "axios";
import { base_address } from "../constants";
import { red, green } from "@mui/material/colors";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Check } from "@mui/icons-material";
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton';
import {hasUpper, hasLower, hasNumber, hasSpecial} from '../functions'
import { check_list_text } from "../constants";
import { sha256 } from "js-sha256";
import { Navigate } from "react-router-dom";


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
            err_msg: '',
            verification_code: '',
            inputted_token: '',
            pass: '',
            confirm_pass: '',
            show_pass: false,
            show_confirm: false,
            pass_flags: [false, false, false, false, false],
            signed_up: false
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
        
        axios.get(base_address + '/users/sendVerification/' + this.state.email)
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
        else {
            this.setState({...this.state, err_msg: 'Token does not match, please correct the entered token'})
        }
    }

    onChangePass(e) {

        let temp_flags = [false, false, false, false, false]

        if (hasUpper(e.target.value)) temp_flags[0] = true
        if (hasLower(e.target.value)) temp_flags[1] = true
        if (hasNumber(e.target.value)) temp_flags[2] = true
        if (hasSpecial(e.target.value)) temp_flags[3] = true
        if (e.target.value.length >= 8) temp_flags[4] = true


        this.setState({...this.state, pass: e.target.value, pass_flags: temp_flags})
    }

    onChangeConfirm(e) {
        this.setState({...this.state, confirm_pass: e.target.value})
    }

    onClickShowPass (e) {
        this.setState({...this.state, show_pass: !this.state.show_pass})
    }

    onClickShowConfirm (e) {
        this.setState({...this.state, show_confirm: !this.state.show_confirm})
    }

    onMouseDownPass (e) {
        e.preventDefault()
    }

    confirmPassword (e) {
        if (this.state.pass_flags.every(v => v === true) && this.state.pass === this.state.confirm_pass){

            const new_user = {
                email: this.state.email,
                name: this.state.full_name,
                dob: new Date(this.state.dob_year, this.state.dob_month-1, this.state.dob_day).toISOString().substring(0, 10),
                is_verified: this.state.inputted_token === this.state.verification_code ? true : false,
                pass: sha256.create().update(this.state.pass).hex()
            }

            console.log(new_user.dob)
            console.log(new_user.pass)

            axios.post(base_address + '/users/signup', new_user)
                .then(res => this.setState({...this.state, signed_up: true}))
                .catch(err => this.setState({...this.state, err_msg: err.response.data}))

        }
        else {
            if (this.state.pass !== this.state.confirm_pass) {
                this.setState({...this.state, err_msg: 'Invalid Password: Passwords do not match'})
            }
            else {
                this.setState({...this.state, err_msg: 'Invalid Password: Please make sure password contains all neccesary elements'})
            }
        }
    }

    render() {
        let form

        if (this.state.form_flag === 1) {

            let msg

            if (this.state.err_msg !== '') msg = <h2 className="signup-err-msg-1">{this.state.err_msg}</h2>

            form = <div>
                <h1 className="credentials-header header-font">Signup to The Share Club!</h1>
                {msg}
                <div className="text-field name">
                    <TextField 
                        id="name-field" 
                        label="Full Name" 
                        variant="outlined" 
                        value={this.state.full_name}
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
                        value={this.state.email} 
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

            let msg

            if (this.state.err_msg !== '') msg = <h2 className="signup-err-msg-2">{this.state.err_msg}</h2>

            form = <div>
                <h1 className="credentials-header header-font">Signup to The Share Club!</h1>
                <h2 className="signup-validation-text">Validation email sent! Please open the email and enter the validation code below.</h2>
                {msg}
                <div className="text-field verify">
                    <TextField 
                        id="verify-field" 
                        label="Verification Code" 
                        variant="outlined"
                        value={this.state.inputted_token} 
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

            let nav

            if (this.state.signed_up === true) nav = <Navigate to="/login/true"/>

            let msg

            if (this.state.err_msg !== '') msg = <h2 className="signup-err-msg-3">{this.state.err_msg}</h2>

            let check_list = check_list_text.map((text, i) => {
                if (this.state.pass_flags[i] === true) {
                    return <li className="signup-password-list-item button-font" key={text}>
                        <Check sx={{color: green[500]}}/>
                        <span>
                            {text}
                        </span>
                    </li>
                }
                else {
                    return <li className="signup-password-list-item button-font" key={text}>
                        <Close sx={{color: red[500]}}/>
                        <span>
                            {text}
                        </span>
                    </li>
                }
            })

            form = <div>
                {nav}
                <h1 className="credentials-header header-font">Singup to the Share Club!</h1>
                <h2 className="signup-validation-text">Please enter and confirm your password</h2>
                {msg}
                <ul className="signup-password-list">
                    {check_list}
                </ul>
                <div className="signup-password-field field-1">
                    <TextField 
                        id="pass-field" 
                        label="Password" 
                        variant="outlined"
                        value={this.state.pass}
                        type={this.state.show_pass ? 'text': 'password'} 
                        onChange={this.onChangePass.bind(this)} 
                        fullWidth 
                        InputProps={
                            {
                                style: {fontSize: 30},
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.onClickShowPass.bind(this)}
                                        onMouseDown={this.onMouseDownPass.bind(this)}
                                        edge="end"
                                    >
                                        {this.state.show_pass ? <VisibilityOff fontSize="large"/> : <Visibility fontSize="large"/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        }
                        InputLabelProps={{style: {fontSize: 30}}}
                    />
                </div>
                <div className="signup-password-field field-2">
                    <TextField 
                        error={this.state.pass !== this.state.confirm_pass? true : false}
                        helperText={this.state.pass !== this.state.confirm_pass? 'Passwords Dont Match' : ''}
                        id="confirm-pass-field" 
                        label="Confirm Password" 
                        variant="outlined"
                        value={this.state.confirm_pass}
                        type={this.state.show_confirm ? 'text' : 'password'} 
                        onChange={this.onChangeConfirm.bind(this)} 
                        fullWidth 
                        InputProps={
                            {
                                style: {fontSize: 30},
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.onClickShowConfirm.bind(this)}
                                        onMouseDown={this.onMouseDownPass.bind(this)}
                                        edge="end"
                                    >
                                        {this.state.show_confirm ? <VisibilityOff fontSize="large"/> : <Visibility fontSize="large"/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        }
                        InputLabelProps={{style: {fontSize: 30}}}
                    />
                </div>
                <button className="next-button" onClick={this.confirmPassword.bind(this)}>
                    Finalize Registration
                </button>
            </div>
        }

        return(
            <div>
                {form}
            </div>
        )
    }
}