import React, { useState,useRef,useEffect } from 'react';
import mqtt from 'mqtt'
import { Grid, Paper} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Routes,Route,Link,useLocation,useNavigate} from 'react-router-dom';
import './driver.css'
import '../message.css';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import SignalCellularOffOutlinedIcon from '@mui/icons-material/SignalCellularOffOutlined';
import useStyles from '../textFields';

const AddFinger = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
    var options = {
        hostname: '9c641868feef4f288cb222c3d38b905e.s1.eu.hivemq.cloud',
        port: 8884,
        protocol: 'wss',
        username: 'Francois',
        password: '12345Fra',
        clientId: 'bytr853',
        path:'/mqtt'
    }

    const [client, setClient] = useState(null);

    const [connectStatus, setConnectStatus] = useState("not connected");

    const [device_id, setDeviceId] = useState("");

    const [driver_id, setDriverId] = useState("");

    const [errMsg, setErrMsg] = useState('')

    const [succMsg, setSuccMsg] = useState('')

    const [messageStatus, setMessagestatus] = useState('Read Instrunctions')

    const [shouldRedirect, setRedirect] = useState(false)

    const userRef = useRef();
    const errRef = useRef();
    const succRef = useRef();

    var getFinger = (evt)=>{
        evt.preventDefault();
        var publish_topic = 'driver/register/'+device_id+'/getFP';
        console.log(publish_topic);
        client.publish(publish_topic, driver_id);
        client.subscribe('registration');
    }
    const mqttDisconnect = () => {
        if (client) {
          client.end(() => {
              console.log("disconnected")
            setConnectStatus('Disconnected');
          });
        }
      }
    const redirect=()=>{
        setTimeout(() => {
            navigate('/')
         }, 4000);
    }
    // const mqttConnect = (opts) => {

    // };
    useEffect(()=>{
        setConnectStatus('Connecting');
        setClient(mqtt.connect(options));
    },[])
    useEffect(() => {
       
      if (client) {
        console.log(client)
        client.on('connect', () => {
          setConnectStatus('Connected');
          console.log("connected")
        });
        client.on('error', (err) => {
          console.error('Connection error: ', err);
          client.end();
        });
        client.on('reconnect', () => {
          setConnectStatus('Reconnecting');
        });
        client.on('message', (topic, message) => {
        //   const payload = { topic, message: message.toString() };
        //   setPayload(payload);
        var mess = message.toString();
         if(mess=="done"){
            setSuccMsg("Done Registration redirecting in 4 seconds..");
            redirect();
         }else{
            setErrMsg(mess);
         }
        });
      }
      console.log("running")
      return () => {
        mqttDisconnect();
      };
    }, [client]);
    

    useEffect(()=>{
        userRef.current.focus();
      },[])
    
      
      useEffect(()=>{
        setErrMsg('');
        setSuccMsg('');
      },[device_id,driver_id])
    return (
        <div className='center white'>
            <h2 >Connection Status:<br/>{connectStatus=="Connected" ? <SignalCellularAltOutlinedIcon fontSize="large" className='green'/>: <SignalCellularOffOutlinedIcon fontSize="large" className='red'/>} </h2>
        <Paper elavation={24} style={paperStyle}>
           <p ref={errRef} className={errMsg? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
           <p ref={succRef} className={succMsg? "succmsg" : "offscreen"} aria-live="assertive">{succMsg}</p>
            <Grid align='center'>
                <h2 >{messageStatus}</h2>
            </Grid>
            <form  noValidate autoComplete="off">
                <TextField className={classes.root}  id="filled-basic" variant="filled"  label="device id" placeholder='Enter device id' value={device_id}
                fullWidth required 
                onChange={e => setDeviceId(e.target.value)} inputRef={userRef} /><br></br><br></br>
                <TextField className={classes.root}  id="filled-basic" variant="filled"  label="driver id" placeholder='Enter driver id' value={driver_id}
                fullWidth required 
                onChange={e => setDriverId(e.target.value)} /><br></br><br></br>
            </form>
            {/* {shouldRedirect && <Navigate
                    to={{
                        pathname: "/addfingerprint",
                        state: { driver_id: driverId }
                    }}
                    />} */}
            <br />
            <Button onClick={getFinger} color='primary'>Get Finger Print</Button> 
          
        </Paper>
        <h3>Instructions</h3>
        <ol>
            <li>Check Connection status</li>
            <li>If connected Enter the device Id</li>
            <li>Press Get FingerPrint Button</li>
            <li>Follow the Instructions prompted by the device</li>
            <li>Wait for the server to respond and redirect</li>
        </ol>
        </div>
    );
};

export default AddFinger;