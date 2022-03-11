import React from 'react';
import { Grid, Paper} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Avatar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';


const Login = () => {
    const paperStyle ={
        padding : 20,
        height : '70vh',
        margin :"20px auto",
        width :300,
        backgroundColor : 'rgba(00,00,00,0.4)',
        color: '#ffffff'
    }
    const avatarStyle={
        backgroundColor : '#1c0042'
    }

  return (
    <Grid>
        <Paper elavation={24} style={paperStyle}>
            <Grid align='center'>
                <Avatar  style={avatarStyle}><LockIcon/></Avatar>
                <h2 >Sign In</h2>
            </Grid>
            <form  noValidate autoComplete="off">
                <TextField id="standard-basic" label="username" placeholder='Enter username' fullWidth required />
                <TextField id="standard-basic" label="password" placeholder='Enter password' type='password' fullWidth required />
            </form>
        </Paper>
    </Grid>
  )
}

export default Login;