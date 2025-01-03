import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";

const Register = () => {
    const { createUser, setUser,updateUser } = useContext(AuthContext);
    const {register,handleSubmit,reset,formState: {errors}} = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const {from} = location.state || '/';

    const onSubmit = (data) => {
       console.log(data);
        const name = data.name;
        const email = data.email;
        const password = data.password;
   
        console.log(name,email,password);

        createUser(email, password).then((userCredential) => {
            const user = userCredential.user;
            updateUser({displayName:name})
            .then(() =>{
                Swal.fire({
                    icon: "success",
                    title: "User created successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setUser(user);
                reset();
                navigate(from);
            })
            .catch((error) => {
                alert(error.code);
            });
            // setUser(user);
        }).catch((error) => {
            const errorCode = error.code;
            alert(errorCode);
        });
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
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name",{required:true, minLength: 3, maxLength:20})}
                                placeholder="name"
                                className="input input-bordered"
                                required
                            />
                            {errors.name && errors.name.type === "minLength" && <p className="text-red-500 text-xs">Name must be at least 3 characters</p>}
                            {errors.name && errors.name.type === "maxLength" && <p className="text-red-500 text-xs">Name must be at most 20 characters</p>}
                            {/* {errors.name && <p className="text-red-500">Name is required</p>} */}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                              {...register("email",{required:true,pattern:/^\S+@\S+$/i})}
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password",{required:true,pattern:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/})}
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            {errors.password && errors.password.type === "pattern" && <p className="text-red-500 text-xs">Password must contain at least 6 characters, including UPPER/lowercase and numbers</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p className="mt-2">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-hover">
                                Login now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;