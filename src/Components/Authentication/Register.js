import React, { useState,useRef,useEffect } from 'react';
import { Grid, Paper} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css';
import '../message.css';
import axios from '../../axiosInstance';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import makeStyles from '@mui/styles/makeStyles';
import '../forms.css'
import useStyles from '../textFields';


const Register = () => {
  const classes = useStyles();
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

    const [password, setPassword] = useState("")
    
    const [role, setRole] = useState("admin")

    const [errMsg, setErrMsg] = useState('')

    const [succMsg, setSuccMsg] = useState('')

    const userRef = useRef();
    const errRef = useRef();
    const succRef = useRef();


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
            if(response.data){
              setSuccMsg('successful');
              succRef.current.focus();
            }else{
              setErrMsg('please check your username and password');
              errRef.current.focus();
            }
          })
          .catch(function (err) {
            console.log(err);
            if(!err?.response){
              setErrMsg('No Server Response');
            }else if(err.response?.status==400){
              setErrMsg('Missing field');
            }else if(err.response?.status==401){
              setErrMsg('UnAuthorized');
            }else{
              setErrMsg('Failed Login')
            }
            errRef.current.focus();
          });
    }

    useEffect(()=>{
      userRef.current.focus();
    },[])
    
    useEffect(()=>{
      setErrMsg('');
      setSuccMsg('');
    },[email, password,name,role])

    
  return (
    <Grid>
        <Paper elavation={24} style={paperStyle}>
           <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
           <p ref={succRef} className={succMsg? "succmsg" : "offscreen"} aria-live="assertive">{succMsg}</p>
            <Grid align='center'>
                <Avatar  style={avatarStyle}><LockIcon/></Avatar>
                <h2 >Register</h2>
            </Grid>
            <form  noValidate>
                <TextField className={classes.root}  id="filled-basic" variant="filled"  label="name" placeholder='Enter name' value={name}
                fullWidth required 
                onChange={e => setName(e.target.value)}  inputRef={userRef} /><br></br><br></br>
                <TextField className={classes.root}  id="filled-basic" variant="filled" label="email" placeholder='Enter email' value={email} 
                fullWidth required 
                onChange={e => setEmail(e.target.value)}  /><br></br><br></br>
                <TextField className={classes.root}  id="filled-basic" variant="filled" label="password" 
                placeholder='Enter password' type='password' value={password} fullWidth required
                onChange={e => setPassword(e.target.value)}  />
                <br></br><br></br>
                <InputLabel   id="demo-simple-select-label">Role</InputLabel>
                <Select className={classes.root} 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role} 
                label="Role" 
                onChange={e=>setRole(e.target.value)}
              >
                <MenuItem value={992}>Admin</MenuItem>
                <MenuItem value={995}>Editor</MenuItem>
                <MenuItem value={998}>User</MenuItem>
              </Select>
              <br></br><br></br>
              
            </form>
            <br />
            <Button onClick={handleSubmit} variant="contained" color="primary" className="space">Submit</Button>
        </Paper>
    </Grid>
  )
}

export default Register;