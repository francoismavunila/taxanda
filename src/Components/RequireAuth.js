import {usseLocation, Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = ({allowedRoles}) =>{
    const { auth } = useAuth();
    const location = useLocation();
   console.log(auth.roles);
   console.log(allowedRoles)
    return (
        allowedRoles?.includes(auth?.roles)
        ?<Outlet /> : auth?.email?   <Navigate to="/unathorized" state={{from: location}}  replace />:
        <Navigate to="/login" state={{from: location}}  replace />
    );
}
 
export default RequireAuth;