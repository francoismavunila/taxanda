import {useState, useEffect} from 'react';
import axios from '../../axiosInstance'

const Users = () => {
const [users, setUsers]=useState();

useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();

    axios.get('/user',{
        signal:controller.signal
    })
    .then(response=>{
        console.log(response.data);
        isMounted && setUsers(response.data);
    })
    .catch(err=>{
        console.log(err);
    })
  return ()=>{
      isMounted=false;
      controller.abort(); //cancel any pending requests when the component unmounts
  }
},[])
  return (
    <div>
        <H4>users</H4>
    </div>
  )
}
export default Users;
