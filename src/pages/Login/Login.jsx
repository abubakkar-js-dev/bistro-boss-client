import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadCanvasTemplateNoReload, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import AuthContext from "../../context/AuthContext/AuthContext";

const Login = () => {
    const { loginUser,setUser } = useContext(AuthContext);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const captchaInputRef = useRef(null); // Reference for the captcha input field
    const location = useLocation(); 
    const {from} = location.state || '/';
    const navigate = useNavigate();

    useEffect(() => {
        loadCaptchaEnginge(6); // Load the captcha with 6 characters
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const captcha = captchaInputRef.current.value;

        if (validateCaptcha(captcha)){
            console.log(email, password);
            loginUser(email,password).then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                navigate(from);

            }).catch((error) => {
                const errorCode = error.code;
                alert(errorCode);
            });
        } else {
            alert("Captcha does not match");
        }
    };

    const handleCaptchaValidation = () => {
        const captchaValue = captchaInputRef.current.value;
        if (validateCaptcha(captchaValue)) {
            setIsCaptchaValid(true);
        } else {
            setIsCaptchaValid(false);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                        a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Match Captcha</span>
                            </label>
                            <LoadCanvasTemplateNoReload />
                            <input
                                type="text"
                                name="captcha"
                                ref={captchaInputRef}
                                placeholder="Enter captcha"
                                className="input input-bordered mt-2"
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-secondary mt-2 btn-outline text-xs btn-xs inline"
                                onClick={handleCaptchaValidation}
                            >
                                Validate Captcha
                            </button>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={!isCaptchaValid}>
                                Login
                            </button>
                            <p className="mt-2">
                                Don&apos;t have an account?{" "}
                                <Link to="/register" className="link link-hover">
                                    Register now
                                </Link>
                            </p>
                        </div>
                    </form>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;
