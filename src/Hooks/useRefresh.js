import axios from "../axiosInstance";
import useAuth from "./useAuth";

const useRefresh = () => {
const { setAuth } = useAuth();

  const refresh = async ()=>{
      const response =await axios.get('/user/refreshToken',{
          withCredentials : true
      });
      setAuth(prev=>{
          console.log(JSON.stringify(prev));
          console.log(response.data.accessToken);
          return {...prev,accessToken: response.data.accessToken}
      });
      return response.data.accessToken
  }
  return refresh;
}

export default useRefresh