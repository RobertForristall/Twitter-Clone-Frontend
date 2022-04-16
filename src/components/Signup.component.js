import React from "react";
import { TextField } from "@mui/material";
import DOB from '../components/DOB.component'

export default class Signup extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            form_flag: 1,
            full_name: '',
            email: '',
            dob_month: 0,
            dob_day: 0,
            dob_year: 0
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
        console.log('Clicked')
    }

    render() {
        let form

        if (this.state.form_flag === 1) form = <div>
            <h1 className="credentials-header header-font">Signup to The Share Club!</h1>
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

        return(
            <div>
                {form}
            </div>
        )
    }
}