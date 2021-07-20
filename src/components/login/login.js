import React, { useState } from "react";
import Home from "../home/home";
import "./login.css";
import { useHistory } from "react-router-dom";

const bcrypt = require("bcryptjs");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  let history = useHistory();

  const handleCreate = () => {
    history.push("/register");
  };
  if (localStorage.getItem("admin") === null) {
    localStorage.setItem(
      "admin",
      '[{"email": "m","password": "1","username": "m"}]'
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    //Admin login
    if (password === "1" && email === "m") {
      const data = JSON.parse(localStorage.getItem("admin"));
      const filterData = data.filter(
        (item) => (item.username || item.email) === email
      );
      // storing user for making it login and logout
        if (localStorage.getItem("userLoggedIn") === null) {
          localStorage.setItem("userLoggedIn", "[]");
        }
        const loginData = JSON.parse(localStorage.getItem("userLoggedIn"));
        loginData.push(filterData[0]);
        localStorage.setItem("userLoggedIn", JSON.stringify(loginData));
        setUser(filterData[0]);
        
      // storing user information
        if (localStorage.getItem("user") === null) {
          localStorage.setItem("user", "[]");
        }
        const userData = JSON.parse(localStorage.getItem("user"));
        userData.push(filterData[0]);
        localStorage.setItem("user", JSON.stringify(userData));
    }
    //Other user login
    else {
      const data = JSON.parse(localStorage.getItem("userData"));
      const filterData = data.filter(
        (item) => (item.username || item.email) === email
      );
      if(filterData.length===0){
        alert("Invalid Credentials")
        return;
      }
      const validPassword = await bcrypt.compare(
        password,
        filterData[0].password
      );
      if (!validPassword) {
        alert("invalid credentials");
        return;
      }
      if(filterData[0].status==="Pending" || filterData[0].status==="Rejected"){
          alert("Wait until admin accept your profile");
          return;
      }
      if(filterData[0].status==="Accepted"){
        if (localStorage.getItem("userLoggedIn") === null) {
            localStorage.setItem("userLoggedIn", "[]");
        }
        const loginData = JSON.parse(localStorage.getItem("userLoggedIn"));
        loginData.push(filterData[0]);
        localStorage.setItem("userLoggedIn", JSON.stringify(loginData));
        setUser(filterData[0]);
          if (localStorage.getItem("user") === null) {
              localStorage.setItem("user", "[]");
          }
          const userData = JSON.parse(localStorage.getItem("user"));
          userData.push(filterData[0]);
          localStorage.setItem("user", JSON.stringify(userData));
      }
    }  
  };

  return (
    <>
      {JSON.parse(localStorage.getItem("userLoggedIn")) === null ? (
        <div className="login">
          <div className="loginWrapper">
            <div className="loginLeft">
              <h3 className="loginLogo">Login Here</h3>
              <span className="loginDesc">Enjoy most valued feature here.</span>
            </div>
            <div className="loginRight">
              <div className="loginBox">
                <input
                  className="loginInput"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email/Username"
                />
                <input
                  className="loginInput"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <button className="loginButton" onClick={handleLogin}>
                  Log in
                </button>
                <span className="loginForgot">Forgot your password</span>
                <button className="loginRegisterButton" onClick={handleCreate}>
                  Create a new account
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Home user={user} />
      )}
    </>
  );
};

export default Login;
