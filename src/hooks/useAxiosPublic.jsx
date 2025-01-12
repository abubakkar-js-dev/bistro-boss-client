import axios from "axios";


const axiosPublic = axios.create({
    baseURL: "https://bistro-boss-server-xi-mauve.vercel.app",
})

const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;