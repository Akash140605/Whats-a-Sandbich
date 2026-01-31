import { useState } from "react";
import { registerUser } from "../../services/authService";

export default function Register(){
  const [form,setForm]=useState({name:"",email:"",password:""});

  const submit=async(e)=>{
    e.preventDefault();
    await registerUser(form);
    alert("Registered successfully");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="input" placeholder="Name"
        onChange={e=>setForm({...form,name:e.target.value})}/>
      <input className="input" placeholder="Email"
        onChange={e=>setForm({...form,email:e.target.value})}/>
      <input className="input" placeholder="Password" type="password"
        onChange={e=>setForm({...form,password:e.target.value})}/>
      <button className="btn w-full">Register</button>
    </form>
  );
}
