import React, { useState } from 'react';
import { Grid, Paper} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Avatar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from '../../axiosInstance';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const Register = () => {
    const paperStyle ={
        padding : 20,
        height : 'auto',
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

    const [surname, setSurname] = useState("")
    
    const [national, setNational] = useState("")

    const [fingerPrint, setFringerPrint] = useState("")

    const [phone, setPhone] = useState("")

    const [responder, setResponder] = useState("")

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post('/driver/registration', {
            name : name,
            email: email,
            surname: surname,
            phone : phone,
            national : national,
            responder : responder
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
                <TextField id="standard-basic" label="driver name" placeholder='Enter name' value={name}
                fullWidth required 
                onChange={e => setName(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="driver surname" placeholder='Enter name' value={surname}
                fullWidth required 
                onChange={e => setSurname(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="email" placeholder='Enter email' value={email} 
                fullWidth required 
                onChange={e => setEmail(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="phone" 
                placeholder='Enter phone number' value={phone} fullWidth required
                onChange={e => setPhone(e.target.value)} className="space" />
                <br/><br/>
                <TextField id="standard-basic" label="national id" 
                placeholder='Enter your national id' value={national} fullWidth required
                onChange={e => setNational(e.target.value)} className="space" />
                <br/><br/>
                <TextField id="standard-basic" label="responder" 
                placeholder='Enter your responder' value={responder} fullWidth required
                onChange={e => setResponder(e.target.value)} className="space" />
                <br/><br/>
            </form>
            <br />
            <Button onClick={handleSubmit} variant="contained" color="primary" className="space">Submit</Button>
        </Paper>
    </Grid>
  )
}

export default Register;