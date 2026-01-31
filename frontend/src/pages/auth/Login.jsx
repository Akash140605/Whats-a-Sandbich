import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form,setForm]=useState({email:"",password:""});
  const { login } = useAuth();
  const nav = useNavigate();

  const submit=async(e)=>{
    e.preventDefault();
    const res = await loginUser(form);
    if(res.data.success){
      login(res.data.user);
      nav("/");
    } else alert("Invalid credentials");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="input" placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})}/>
      <input className="input" placeholder="Password" type="password"
        onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="btn w-full">Login</button>
    </form>
  );
}
