import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signinfoodpartner = () => {
   const [Error, setError] = useState("");
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const submit = async(e) =>{
    try{
      e.preventDefault();
   const response = await axios.post(
      "http://localhost:3000/api/foodpartner/login",
      {
        email: email,
        password: password
      },{
       withCredentials:true
      }
    );
 console.log(response.data);
 navigate("/");
  }
  catch(err){
     setError(
      err.response?.data?.message || "Registration failed"
    );
    console.log(err.response?.data || err.message);
  }
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center  px-4 py-6">
      <div className="w-full max-w-[500px] overflow-hidden rounded-[28px] border bg-slate-950/80 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <div className="p-6 sm:p-8">
          <div className="mb-8 text-center">
          
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-violet-500">
              welcome back
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-800">
              Sign in As a Foodpartner
            </h1>
          </div>

          <form className="space-y-4" onSubmit={submit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com" value={email}  onChange={(e)=>{setemail(e.target.value)}}
                className="w-full rounded-2xl border border-violet-100 bg-white/5 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Password
              </label>
              <input
                type="password"  value={password}  onChange={(e)=>{setpassword(e.target.value)}}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-violet-100 bg-white/5 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-violet-200 bg-white text-violet-600 focus:ring-violet-500" />
                Remember me
              </label>
              <span className="text-violet-600">Forgot password?</span>
            </div>
<p className="text-red-400 text-sm text-center">
    {Error}
  </p>
            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{' '}
            <Link to="/foodpartner/register" className="font-semibold text-violet-600 hover:text-violet-700">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signinfoodpartner;
