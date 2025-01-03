import axios from "axios";


const axiosInstant = axios.create({
    baseURL: "http://localhost:5000",
    
});

const useAxiosSecure = () => {
    
    return axiosInstant;
};

export default useAxiosSecure;