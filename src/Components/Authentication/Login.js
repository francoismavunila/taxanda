import React, { useState, useRef, useEffect } from 'react';
import { Grid, Paper, useForkRef} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css'
import axios from '../../axiosInstance';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import useStyles from '../textFields';

const Login = () => {
  const classes = useStyles();
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
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('')

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post('/user/login', {
            email: email,
            password: password
          },
          {
            headers:{'Content-Type':'application/json'},
            withCredentials: true
          }
          )
          .then(function (response) {
            console.log(response);
            if(response.data){
              const accessToken = response?.data?.accessToken;
              const roles = response?.data?.role;
              setAuth({email, password, roles, accessToken});
              setEmail('');
              setPassword('');
              navigate(from,{replace: true});
            }else{
              alert('please check your username and password')
            }
          })
          .catch(function (err) {
            console.log(err);
            if(!err?.response){
              setErrMsg('No Server Response');
            }else if(err.response?.status==400){
              setErrMsg('Missing Username or Password');
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
},[email, password])

  return (
    <Grid >
        <Paper elavation={24} style={paperStyle}>
          <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Grid align='center'>
                <Avatar  style={avatarStyle}><LockIcon/></Avatar>
                <h2 >Sign In</h2>
            </Grid>
            <form  noValidate >
                <TextField id="filled-basic" variant="filled"  label="email" placeholder='Enter email' value={email} 
                  color="" fullWidth required 
                onChange={e => setEmail(e.target.value)} className={classes.root} inputRef={userRef} />
                <br></br><br></br>
                <TextField  id="filled-basic" className={classes.root}  variant="filled" label="password"
                placeholder='Enter password' type='password' value={password} fullWidth required
                onChange={e => setPassword(e.target.value)} />
            </form><br></br><br></br>
            <Button onClick={handleSubmit} variant="contained" >Submit</Button>
        </Paper>
    </Grid>
  )
}


export default Login;