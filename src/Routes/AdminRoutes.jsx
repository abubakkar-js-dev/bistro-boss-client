import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const AdminRoutes = ({children}) => {
   const {loading,user} = useAuth();
   const {isAdmin,isLoading} = useAdmin();
   const locaiton = useLocation();
   if(loading || isLoading){
    return <Loading/>
   }
   if(user && isAdmin){
    return children;
   }
   
   return <Navigate to="/login" state={{from:locaiton.pathname}} replace />
};

export default AdminRoutes;