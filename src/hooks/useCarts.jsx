import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCarts = () => {
    const {user} = useAuth();
    const axiosInstant = useAxiosSecure();
   const {data: carts=[],isLoading,error,refetch} = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const res = await axiosInstant.get(`/carts?email=${user?.email}`);
      return res.data;
    },
   })

   return {carts,isLoading,error,refetch};
};

export default useCarts;