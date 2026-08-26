import React,{useRef,useState} from "react";
import { useForm } from "react-hook-form";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
const RegisterFoodpartner = () => {
  const [registerError, setRegisterError] = useState("");
  const [profile, setProfile] = useState(null)
     const inputRef = useRef();
     const fileref=useRef();
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

       if (!profile) {
         setRegisterError("Please upload a profile image");
         return;
       }

       const formData = new FormData();
       formData.append("fullname", data.name);
       formData.append("email", data.email);
       formData.append("password", data.password);
       formData.append("otp", data.otp);
       formData.append("address", data.address);
       formData.append("profile", profile);

       const response = await axios.post(
        "http://localhost:3000/api/foodpartner/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
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
const handleprofile = async() =>{
   fileref.current.click();
}

  return (
    <div className="flex min-h-screen lg:w-[500px] mx-auto items-center justify-center px-0 py-2 ">
      <div className="w-full overflow-hidden rounded-none border border-white/10 bg-slate-950/80 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:rounded-[30px]">
        <div className="p-6 sm:p-8">

        <div className="a flex flex-col items-center">

  <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-slate-400">
    welcome
  </p>
  <div className="flex w-full justify-between h-[40px] items-center gap-[3px]">

  <h1 className="mt-2 text-2xl font-bold tracking-tight text-white  left-[30px] h-fit">
    Create account As Foodpartner
  </h1>
    <div onClick={handleprofile} className="bg-red-400 py-[3px] h-fit px-[8px] text-[13px] rounded-[6px] 
      cursor-pointer active:scale-95 transition duration-100 self-end">upload profile</div>
  </div>
  <input
    ref={fileref}
    type="file"
    className="hidden"
    accept="image/*"
    onChange={(e) => setProfile(e.target.files[0])}
  />
        </div>


          <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">

            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                  bussiess name
              </label>

              <input
                type="text"
                placeholder="Enter your bussiness"
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
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full address
              </label>

              <input
                type="text"
                placeholder="Enter Address"
                {...register("address", {
                  required: "address required",
                  minLength: {
                    value: 3,
                    message: "Address should be at least 3 characters",
                  },
                })}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
              />

              {errors.address && (
                <p className="text-red-400 text-sm">
                  {errors.address.message}
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
            <Link to="/signinpartner">
              <span className="font-semibold text-pink-400">
                Sign in
              </span>
            </Link>
          </p>

      

        </div>
      </div>
    </div>
  );
};

export default RegisterFoodpartner;