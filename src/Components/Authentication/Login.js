import React, { useState, useRef, useEffect ,useContext } from 'react';
import AuthContext from '../../Context/AuthProvider';
import { Grid, Paper, useForkRef} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Avatar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.css'
import axios from '../../axiosInstance';


const Login = () => {
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
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState('')

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post('/user/login', {
            mail: email,
            password: password
          })
          .then(function (response) {
            console.log(response);
            if(response.data.user){
              const accessToken = response?.data?.accessToken;
              const roles = response?.data?.roles;
              setAuth({email, password, roles, accessToken});
              setEmail('');
              setPassword('');
              window.location.href='/home';
            }else{
              alert('please check your username and password')
            }
          })
          .catch(function (err) {
            console.log(err);
            if(!err?.response){
              setErrMsg('No Server Response');
            }else if(err.response?.status==400){
              setErrMsg('missing Your Username or Password');
            }else if(err.response?.status==400){
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
    <Grid>
        <Paper elavation={24} style={paperStyle}>
          <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <Grid align='center'>
                <Avatar  style={avatarStyle}><LockIcon/></Avatar>
                <h2 >Sign In</h2>
            </Grid>
            <form  noValidate autoComplete="off">
                <TextField id="standard-basic" label="email" placeholder='Enter email' value={email} 
                fullWidth required 
                onChange={e => setEmail(e.target.value)} className="space" inputRef={userRef}/>
                <TextField id="standard-basic" label="password" 
                placeholder='Enter password' type='password' value={password} fullWidth required
                onChange={e => setPassword(e.target.value)} className="space"/>
            </form>
            <Button onClick={handleSubmit} variant="contained" color="primary" className="space">Submit</Button>
        </Paper>
    </Grid>
  )
}

export default Login;