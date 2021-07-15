import React, { useState } from 'react';
import "./register.css";
import { useHistory } from "react-router-dom";

const bcrypt = require('bcryptjs');

const Register = () => {
    const [login, setLogin]= useState(false);
    const [data, setData] = useState({
        name :"",
        username:"",
        email:"",
        mobile:"",
        address:"",
        password:"",
        cPassword:"",
    })
    let history = useHistory();

    const handleCreate = () => {
        history.push("/login");
    }

    let name, value;
  const handleData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setData({ ...data, [name]: value });
  };

  if(localStorage.getItem('userData')===null) {
    localStorage.setItem('userData','[{"email": "m","password": "1","username": "m"}]');
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.name==="" || data.username=== "" || data.email==="" || data.mobile==="" || data.address==="" || data.password==="" || data.cPassword===""){
        alert("please fill all data");
        return;
    }
    if(data.password!== data.cPassword){
        alert("Password and Confirm Password Should be same");
        return;
    }
    // if(localStorage.getItem('userData')===null) {
    //     localStorage.setItem('userData','[{"name" : "mukul"}]');
    // }
    const lastData = JSON.parse(localStorage.getItem('userData'));
    
    // filtering for checking if email is already exists or not!
    const filteredData = lastData.filter((item) =>item.email ===data.email)
    if(filteredData.length!==0){
        alert("Email is already exists!");
        return;
    }

    // filtering for checking if username is already exists or not!
    const filteredUsername = lastData.filter((item) => item.username === data.username)
    if(filteredUsername.length!==0){
        alert("Username is already exists!");
        return;
    }
    const password = data.password;
    const cPassword = data.cPassword;
    // hashing password
    const hash = await bcrypt.hash(password, 10)
    const cHash = await bcrypt.hash(cPassword, 10)
    const hashData = [{
        name :data.name,
        username:data.username,
        email:data.email,
        mobile:data.mobile,
        address:data.address,
        password:hash,
        cPassword:cHash
    }]
    lastData.push(hashData[0])
    setLogin(true);
    localStorage.setItem('userData', JSON.stringify(lastData))
  }

    return (
        <>
        {
        // JSON.parse(localStorage.getItem('userLoggedIn'))===null &&
         !login ?
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Register Here</h3>
                    <span className="loginDesc">Enjoy most valued feature here.</span>
                </div>
                <div className="loginRight">
                    <div className="registerBox">
                        <input className="loginInput" onChange={handleData} name="name" value={data.name} type="text" placeholder="Name"/>
                        <input className="loginInput" onChange={handleData} name="username" value={data.username} type="text" placeholder="Username"/>
                        <input className="loginInput" onChange={handleData} name="email" value={data.email} type="email" placeholder="Email"/>
                        <input className="loginInput" onChange={handleData} name="mobile" value={data.mobile} type="number" placeholder="Mobile"/>
                        <input className="loginInput" onChange={handleData} name="address" value={data.address} type="text" placeholder="Address"/>
                        <input className="loginInput" onChange={handleData} name="password" value={data.password} type="password" placeholder="Password"/>
                        <input className="loginInput" onChange={handleData} name="cPassword" value={data.cPassword} type="password" placeholder="Confirm Password"/>
                        <button className="loginButton" type="submit" onClick={handleSubmit}>Sign Up</button>
                        <button className="loginRegisterButton" onClick={handleCreate}>Log in your account</button>
                    </div> 
                </div>
            </div> 
        </div>
        :<>
            <div className="loginLogo1">Registration Successful</div>
            <div className="loginLeft">
                <button className="loginRegisterButton" onClick={handleCreate}>Login</button>
            </div>
        </>
        } 
        </>
    ); 
};
 
export default Register;