import { useContext } from "react";
import AuthContext from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";


const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <h1>Loading...</h1>
    }

    if(user&& user.email){
        return children;
    }
   
    return <Navigate state={{from: location.pathname}} to="/login" />;
};

export default PrivateRoute;