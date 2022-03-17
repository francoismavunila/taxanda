import React, { useState } from 'react';
import { Grid, Paper} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Avatar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.css'
import axios from '../../axiosInstance';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const Register = () => {
    const paperStyle ={
        padding : 20,
        height : '70vh',
        margin :"20px auto",
        width :300,
        backgroundColor : 'rgba(00,00,00,0.4)',
        color: '#ffffff',
        flex :1
    }
    const avatarStyle={
        backgroundColor : '#1c0042'
    }
    const [email, setEmail] = useState("")

    const [name, setName] = useState("")

    const [password, setPassword] = useState("")
    
    const [role, setRole] = useState("")

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post('/user/register', {
            name : name,
            email: email,
            password: password,
            role : role
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  return (
    <Grid>
        <Paper elavation={24} style={paperStyle}>
            <Grid align='center'>
                <Avatar  style={avatarStyle}><LockIcon/></Avatar>
                <h2 >Register</h2>
            </Grid>
            <form  noValidate autoComplete="off">
                <TextField id="standard-basic" label="name" placeholder='Enter name' value={name}
                fullWidth required 
                onChange={e => setName(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="email" placeholder='Enter email' value={email} 
                fullWidth required 
                onChange={e => setEmail(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="password" 
                placeholder='Enter password' type='password' value={password} fullWidth required
                onChange={e => setPassword(e.target.value)} className="space" />
                <br/><br/>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                onChange={e=>setRole(e.target.value)}
              >
                <MenuItem value={992}>Admin</MenuItem>
                <MenuItem value={995}>Editor</MenuItem>
                <MenuItem value={998}>User</MenuItem>
              </Select>
            </form>
            <br />
            <Button onClick={handleSubmit} variant="contained" color="primary" className="space">Submit</Button>
        </Paper>
    </Grid>
  )
}

export default Register;