import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useAdmin = () => {
    const {user,loading} = useAuth();
    const axiosSecure = useAxiosSecure();
   const {data:isAdmin,isLoading,error,refetch}=useQuery({
    queryKey:["admin",user?.email],
    enabled:!loading,
    queryFn:async()=>{
        const res=await axiosSecure.get(`/users/admin/${user?.email}`)
        return res?.data?.isAdmin;
    }
   })
   console.log(isAdmin);
   return {isAdmin,isLoading,error,refetch}
};

export default useAdmin;