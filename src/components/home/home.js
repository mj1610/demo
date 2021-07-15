import React, { useState, useEffect } from "react";
import "./home.css";
import Login from "../login/login";
import Admin from "../admin/admin";

const Home = () => {
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState([]);
  useEffect(() =>{
    const data =JSON.parse(localStorage.getItem('user'));
    if(data!==null){
        setUser(data[0]);
    }
  },[])
  
  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("user");
    setLogin(false);
  };
  return (
    <>
      {JSON.parse(localStorage.getItem("userLoggedIn")) !== null && login
      ? <>
          <div className="home">
            <div className="btn" onClick={handleLogout}>Logout</div>
          </div>
          <div className="container">
            {user && ((user.email || user.username) === "m")
              ? "Welcome to HomePage Admin."
              : "Welcome to HomePage"}
          </div>
          {user && user.email === "m" ? <Admin /> : ""}
        </>
      : <Login/>}
    </>
  );
};

export default Home;
