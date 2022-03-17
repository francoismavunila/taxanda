import {useState, useEffect} from 'react';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import {useNavigation, useLocation } from "react-router-dom";

const Users = () => {
const [users, setUsers]=useState();
const axiosPrivate = useAxiosPrivate();
const navigate = useNavigate();
const location = useLocation();

useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();

    axiosPrivate.get('/user',{
        signal:controller.signal
    })
    .then(response=>{
        console.log(response.data);
        isMounted && setUsers(response.data._users);
    })
    .catch(err=>{
        console.log(err);
        navigate('/login',{state:{from:location}, replace:true})
    })
  return ()=>{
      isMounted=false;
      controller.abort(); //cancel any pending requests when the component unmounts
  }
},[])
  return (
    <div>
        <h4>users</h4>
        {
          users?.length?
          <ul>
            {users.map((user)=>{
              return (
                <li>{user.Name}</li>
              )
            })
          }
          </ul> :
          <h4>No users</h4>
        }
    </div>
  )
}
export default Users;
