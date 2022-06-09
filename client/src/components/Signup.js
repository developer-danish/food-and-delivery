import {React, useState} from 'react';
import "./Signup.css"
import { Link } from 'react-router-dom';

const Signup = () => {
  const [data,setData]=useState({
    username:'',
    email:'',
    password:'',
    cpassword:'',
    successMsg: false,
    errorMsg: false,
    loading: false
  });

const changeEvent = (e) => {
  setData((prevData)=>(
    {...prevData, [e.target.name]:e.target.value}
    ));
    console.log(data);
}
  const showSignUp = () => (
    <form className="container" onSubmit={(e)=>{ e.preventDefault()}} >
      <div className="row mb-3">
        <div className="col-sm-12">
          <input value={data.username} onChange={changeEvent} name="username" type="text" className="form-control" id="text" placeholder="Username" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12">
          <input value={data.email} onChange={changeEvent} name="email" type="email" className="form-control" id="email" placeholder="Email" />
        </div>
      </div>
      <div className="row mb-3">

        <div className="col-sm-12">
          <input onChange={changeEvent} value={data.password} name="password" type="password" className="form-control" id="password" placeholder="Password" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12">
          <input onChange={changeEvent} value={data.cpassword} name="cpassword" type="password" className="form-control" id="cpasssword" placeholder="Confirm password" />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-12">
          <button type="submit" className="btn btn-primary w-100">Sign up</button>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-12">
          <p className="text-center" >
            Have an account? <Link style={{textDecoration: 'none'}} to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </form>
  );
  return (
    <div className="signup-container">
      <div className="row vh-100">
        <div className="col-md-5 mx-auto my-auto" >
          {showSignUp()}
        </div>
      </div>
    </div>
  )
}

export default Signup