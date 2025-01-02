import  { useEffect, useState, useRef, useContext } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from "react-simple-captcha";
import AuthContext from "../../context/AuthContext/AuthContext";

const Register = () => {
    const { createUser, setUser } = useContext(AuthContext);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const captchaInputRef = useRef(null); // Reference for the captcha input field

    useEffect(() => {
        loadCaptchaEnginge(6); // Load the captcha with 6 characters
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const captcha = captchaInputRef.current.value;

        if (validateCaptcha(captcha)) {
            console.log(email, password);
            createUser(email, password).then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
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
                    <h1 className="text-5xl font-bold">Register now!</h1>
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
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="name"
                                className="input input-bordered"
                                required
                            />
                        </div>
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
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;