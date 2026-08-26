import React,{useRef,useState} from "react";
import { useForm } from "react-hook-form";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const Registeruser = () => {
  const [registerError, setRegisterError] = useState("");
     const inputRef = useRef();
     const navigate = useNavigate();
  const {
    register,
    handleSubmit,
     trigger,
     resetField,
    getValues,
    formState: { errors },
  } = useForm();

  const sendotp = async() => {
    const isValid = await trigger("email");

  if (!isValid) {
    return;
  }

  const email = getValues("email");

  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/sendotp",
      { email }
    );

    console.log(response.data);

    inputRef.current.style.display = "block";
    inputRef.current.querySelector("input").focus();

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  const handleRegister = async(data) => {
    console.log("Create account");
    try{
       setRegisterError("");
     const response = await axios.post(
      "http://localhost:3000/api/user/register",
      {
        fullname: data.name,
        email: data.email,
        password: data.password,
        otp: data.otp,
      }
    );
    console.log(response.data);
    console.log(data);
     resetField("email");
      resetField("name");
      resetField("password");
      navigate("/");
  }
  catch(err){
        setRegisterError(
      err.response?.data?.message || "Registration failed"
    );
    console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  }

  };

  return (
    <div className="flex min-h-screen lg:w-[500px] mx-auto items-center justify-center px-0 py-2">
      <div className="w-full overflow-hidden rounded-none border border-white/10 bg-slate-950/80 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:rounded-[30px]">
        <div className="p-6 sm:p-8">

          <div className="mb-8 text-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-slate-400">
              welcome
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Create account
            </h1>
          </div>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">

            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Name required",
                  minLength: {
                    value: 3,
                    message: "Name should be at least 3 characters",
                  },
                })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
              />

              {errors.name && (
                <p className="text-red-400 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
              />

              {errors.email && (
                <p className="text-red-400 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters",
                  },
                })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
              />

              {errors.password && (
                <p className="text-red-400 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div ref={inputRef} style={{ display: "none" }}>
             <label className="mb-2 block text-sm font-medium text-slate-300">
                Enter OTP
              </label>
             <input type="text" {...register("otp", { required: "otp required", minLength: { value: 6, message: "otp should be 6 digit",},})} className=" w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30" placeholder="enter otp"  />
              </div>
              {errors.otp && (
                <p className="text-red-400 text-sm">
                  {errors.otp.message}
                </p>
              )}
            {/* SEND OTP */}
            <button 
              type="button"
              onClick={() => {sendotp()}}
              className="mt-1 w-full rounded-2xl active:scale-95 transition duration-100 text-white bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 px-4 py-1.5"
            >
              Send OTP
            </button>
            {/* REGISTER */}
            {registerError && (
  <p className="text-red-400 text-sm text-center">
    {registerError}
  </p>
)}
            <button
              type="submit"
              className="mt-1 w-full rounded-2xl bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-600/30 transition hover:opacity-95"
            >
              Create account
            </button>

          </form>

          <p className="mt-3 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/signinuser">
              <span className="font-semibold text-pink-400">
                Sign in
              </span>
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-slate-400">
            Create Account As Foodpartner{" "}
            <Link to="/registerpartner">
              <span className="font-semibold text-pink-400">
                create Account
              </span>
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Registeruser;