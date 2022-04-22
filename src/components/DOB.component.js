import React from "react";
import { range } from "../functions";
import { Select, MenuItem, InputLabel } from "@mui/material";
import { months, years } from "../constants";

export default class DOB extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }

    render () {

        let day_items

        let month_items = months.map((month, i) => {
            return <MenuItem value={i+1} key={month}>{month}</MenuItem>
        })

        if (this.props.dob_month === 0) {
            day_items = range(1, 32)
        }
        else{
            // ***Fix end to be dynamic***
            day_items = range(1, 32).map(day => {
                return <MenuItem value={day} key={day}>{day}</MenuItem>
            })
        }

        let year_items = years.map(year => {
            return <MenuItem value={year} key={year}>{year}</MenuItem>
        })

        let month_sel = <span>
            <InputLabel id="month-label">Month</InputLabel>
            <Select
                labelId="month-label"
                id="month-select"
                value={this.props.month}
                label="Month"
                onChange={this.props.onChangeMonth}
                fullWidth 
            >
                <MenuItem value={0}>
                    <em>Month</em>
                </MenuItem>
                {month_items}
            </Select>
        </span>

        let day_sel = <span>
            <InputLabel id="day-label">Day</InputLabel>
            <Select
                labelId="day-label"
                id="day-select"
                value={this.props.day}
                label="Day"
                onChange={this.props.onChangeDay}
                fullWidth
            >
                <MenuItem value={0}>
                    <em>Day</em>
                </MenuItem>
                {day_items}
            </Select>
        </span>

        let year_sel = <span>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
                labelId="year-label"
                id="year-select"
                value={this.props.year}
                label="Year"
                onChange={this.props.onChangeYear}
                fullWidth
            >
                <MenuItem value={0}>
                    <em>Year</em>
                </MenuItem>
                {year_items}
            </Select>
        </span>

        return(
            <div className="signup-dob-container">
                {month_sel}
                {day_sel}
                {year_sel}
            </div>
        )
    }
}