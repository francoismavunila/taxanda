import React, { useState,useRef,useEffect } from 'react';
import { Grid, Paper} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import { Avatar } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from '../../axiosInstance';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../message.css'
import {Routes,Route,Link,useNavigate} from 'react-router-dom';



const Driver = () => {
  const navigate = useNavigate();
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

    const [VehicleReg, setVehicleReg] = useState("")

    const [DriverLicence, setDriverLicence] = useState("")

    const [Address, setAddress] = useState("")

    const [errMsg, setErrMsg] = useState('')

    const [succMsg, setSuccMsg] = useState('')

    const [shouldRedirect, setRedirect] = useState(false)

    const [driverId,setDriverId] = useState("")

    const userRef = useRef();
    const errRef = useRef();
    const succRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        axios.post('/driver/registration', {
            name : name,
            email: email,
            surname: surname,
            phone : phone,
            national : national,
            responder : responder,
            DriverLicence: DriverLicence,
            VehicleReg: VehicleReg,
            Address: Address
          })
          .then(function (response) {
            console.log(response);
            if(response.data){
              setSuccMsg('successful');
              succRef.current.focus();
              //setDriverId(response.data.driver_id)
              setRedirect(true);
            }else{
              setErrMsg('please check your username and password');
              errRef.current.focus();
              
            }
          })
          .catch(function (err) {
            console.log(err);
            if(!err?.response){
              setErrMsg('No Server Response');
            }else if(err.response?.status){
              console.log(err.response)
              setErrMsg(err.response.data.message);
            }
            errRef.current.focus();
          });
    }

    useEffect(()=>{
      userRef.current.focus();
    },[])
    useEffect(()=>{
      {shouldRedirect && navigate('/addfingerprint',{state:{driver_id:driverId}})}
    })
    useEffect(()=>{
      setErrMsg('');
      setSuccMsg('');
    },[email,name,surname,responder,national,phone])
  return (
    <Grid>
        <Paper elavation={24} style={paperStyle}>
           <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
           <p ref={succRef} className={succMsg? "succmsg" : "offscreen"} aria-live="assertive">{succMsg}</p>
            <Grid align='center'>
                <h2 >Driver Registration</h2>
            </Grid>
            <form  noValidate autoComplete="off">
                <TextField id="standard-basic" label="driver name" placeholder='Enter name' value={name}
                fullWidth required 
                onChange={e => setName(e.target.value)} className="space" inputRef={userRef} /><br/>
                <TextField id="standard-basic" label="driver surname" placeholder='Enter name' value={surname}
                fullWidth required 
                onChange={e => setSurname(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="email" placeholder='Enter email' value={email} 
                fullWidth required 
                onChange={e => setEmail(e.target.value)} className="space" /><br/>
                <TextField id="standard-basic" label="phone" 
                placeholder='Enter phone number' value={phone} fullWidth required
                onChange={e => setPhone(e.target.value)} className="space" />
                <br/>
                <TextField id="standard-basic" label="national id" 
                placeholder='Enter your national id' value={national} fullWidth required
                onChange={e => setNational(e.target.value)} className="space" />
                <br/>
                <TextField id="standard-basic" label="Driver Licence No" 
                placeholder='Driver Licence No' value={DriverLicence} fullWidth required
                onChange={e => setDriverLicence(e.target.value)} className="space" />
                <br/>
                <TextField id="standard-basic" label="Vehicle Reg No" 
                placeholder='Vehicle Reg No' value={VehicleReg} fullWidth required
                onChange={e => setVehicleReg(e.target.value)} className="space" />
                <br/><br/>
                <TextField id="standard-basic" label="Resedential Address" 
                placeholder='Resedential Address' value={Address} fullWidth required
                onChange={e => setAddress(e.target.value)} className="space" />
                <br/>
                <TextField id="standard-basic" label="responder" 
                placeholder='Enter your responder' value={responder} fullWidth required
                onChange={e => setResponder(e.target.value)} className="space" />
                <br/>
            </form>
            
            <br />
            <Button onClick={handleSubmit} variant="contained" color="primary" className="space">Submit</Button>
        </Paper>
    </Grid>
  )
}

export default Driver;