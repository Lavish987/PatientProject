import React, { useEffect, useState } from 'react'
import Header from './MyComponent/Header'
import Footer from './MyComponent/Footer'
import FooterLogin from './MyComponent/FooterLogin'
import { Box, Grid, Paper, TextField, } from '@material-ui/core'
import Button from '@mui/material/Button';
import { Link, redirect } from "react-router-dom"
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { doLogin } from './auth'
function Login() {
  const paperStyle = { padding: 20, height: '60vh', width: 280, margin: "20px auto" }
  const btnStyle = { margin: "10px 0px -5px" }
  const [loginDetail,setLoginDetail]=useState(
    {
      useremail:'',
      password:''
    }
  )
  const [message,setMessage]=useState("");
  const handleChange=(event,field)=>{
    let actualValue=event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
  })
  }
  const navigate=useNavigate();
  const handleFormSubmit=(event)=>{
    event.preventDefault();
    if (loginDetail.useremail.trim()=="" || loginDetail.password.trim()==""){
      alert("Useremail or password is required");
      return;
    }
    try {
      axios.post("http://localhost:8080/patient/auth", {patientEmail: loginDetail.useremail, patientPassword: loginDetail.password}).then((response)=>
      {
        if (response.data!==""){
          setMessage("User login successful");
          //save to the local storage
          doLogin(response.data,()=>{
            console.log("login detail is saved to the local storage");
            navigate("/user/dashboard")
          })
          
         }else{
          setMessage("Invalid User");
         }
    
      }).catch(err=>{
        console.log(err);
      })
     } catch (err) {
       console.log(err);
     }
   };

  

  return (
    <div>
      <Header l={false} h={false} />




      <div className='login_form'>
         
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleFormSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Patient Sign In</h3>
              
              <div className="form-group mt-3">
                
                <label htmlFor='useremail'>Email</label>
                <input
                  autoComplete='useremail'
                  type="email"
                  id='useremail'
                  className="form-control mt-1"
                  placeholder="Enter Email"
                  value={loginDetail.useremail}
                  onChange={(e)=>{handleChange(e,'useremail')}}
                  

                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <input
                   autoComplete='current-password'
                  type="password"
                  id="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  value={loginDetail.password}
                  onChange={(e)=>{handleChange(e,'password')}}
                  
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" >
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                <div>
              <Link style={{textDecoration:"none"}} to={"/doctor"}>Doctor Login</Link>
              </div>
              <div>
                 <Link  style={{textDecoration:"none"}} to={"/signup"}>Sign Up?</Link>
                 </div>

              </p>
            </div>
            <div className="me">{message ? <p >{message}</p> : null}</div>
          
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default Login