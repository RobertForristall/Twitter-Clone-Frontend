import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { base_address } from '../constants'
import { useNavigate } from 'react-router-dom'
import { sha256 } from 'js-sha256'

export default function Login (props) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [show_pass, setShow] = useState(false)

    let nav = useNavigate()

    return <div>
        <h1 className='credentials-header header-font'>Login to the Share Club</h1>
        <div className='text-field name'>
            <TextField 
                id='email-field'
                label='Email'
                variant='outlined'
                value={email}
                onChange={e => {setEmail(e.target.value)}}
                fullWidth
                inputProps={{style: {fontSize: 30}}}
                InputLabelProps={{style: {fontSize: 30}}}
            />
        </div>
        <div className="text-field email">
            <TextField 
                id="pass-field" 
                label="Password" 
                variant="outlined"
                value={pass}
                type={show_pass ? 'text': 'password'} 
                onChange={e => {setPass(e.target.value)}} 
                fullWidth 
                InputProps={
                    {
                        style: {fontSize: 30},
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={e => {setShow(!show_pass)}}
                                onMouseDown={e => {e.preventDefault()}}
                                edge="end"
                            >
                                {show_pass ? <VisibilityOff fontSize="large"/> : <Visibility fontSize="large"/>}
                            </IconButton>
                        </InputAdornment>
                    }
                }
                InputLabelProps={{style: {fontSize: 30}}}
            />
        </div>
        <button className="next-button" onClick={e => {
            let user = {
                email: email,
                pass: sha256.create().update(pass).hex()
            }

            axios.post(base_address + '/users/login', user)
                .then(res => console.log(res))
                .catch(err => console.log(err.response.data))
        }}>
            Login
        </button>

    </div>
}