import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstant = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  // request interceptor to add authorization header for every secure call to the api
  axiosInstant.interceptors.request.use(
    function (config) {
    //   console.log("request stopped by interceptor.");
      const token = localStorage.getItem("access-token");
    //   console.log(token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // handle interceptor 401 and 403 status
  axiosInstant.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      const status = err.response.status;
    //   console.log(status);
      if (status === 401 || status === 403) {
        logOut()
          .then((res) => {
            console.log(res.user);
            localStorage.removeItem("access-token");
            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return Promise.reject(err);
    }
  );

  return axiosInstant;
};

export default useAxiosSecure;
