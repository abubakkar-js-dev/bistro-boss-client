import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({children}) => {
    const {user,loading}=useAuth();
    const {isAdmin,isLoading}=useAdmin();
    const location = useLocation();
   if(loading || isLoading){
    return <Loading/>
   }
   if(user && isAdmin){
    return children;
   }    
   return <Navigate to="/login" state={{from:location.pathname}} replace />;  
};

export default AdminRoutes;