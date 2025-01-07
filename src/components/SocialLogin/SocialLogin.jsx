import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const {googleLogin} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const {from} = location.state || '/';
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin= ()=>{
        googleLogin()
        .then(result=>{
            console.log(result);
            const user = result.user;
            const userInfo = {
                email: user?.email,
                name: user?.displayName,
            }
            axiosPublic.post('/users',userInfo)
            .then(res => {
                console.log(res.data);
                if(res.data.insertedId){
             
                    navigate(from);
                    
                }
            })

        })
        .catch(err=>{
            console.log(err.message);
        })
    }
  return (
    <div className="px-8 mx-auto py-3">
        <div className="divider uppercase">Or</div>
      <button onClick={handleGoogleLogin} className="btn">
        <FaGoogle className="mr-3" /> 
        Login with google
      </button>
    </div>
  );
};

export default SocialLogin;
