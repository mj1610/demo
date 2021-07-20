import React, { useEffect, useState } from "react";
import "./admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    if (localStorage.getItem("userData") !== null) {
      const usersData = JSON.parse(localStorage.getItem("userData"));
      const data = JSON.parse(localStorage.getItem("user"));
      const fliterAdmin = usersData.filter(user => user.email !== data[0].email);
      setUsers(fliterAdmin);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const onReject = (id) => {
    let copy = [...users];
    copy = copy.filter((item) => item.email === id);
    const newData ={...copy[0],status:"Rejected"}
    if (localStorage.getItem("userData") !== null) {
      const data = JSON.parse(localStorage.getItem("userData"));
      let filterData =[...data];
      filterData = filterData.filter((item) => item.email !== id);
      filterData.push(newData);
      localStorage.setItem("userData", JSON.stringify(filterData));
      setUsers(filterData);
    }    
  };

  const onAccept = (id) => {
    let copy = [...users];
    copy = copy.filter((item) => item.email === id);
    const newData ={...copy[0],status:"Accepted"}
    if (localStorage.getItem("userData") !== null) {
      const data = JSON.parse(localStorage.getItem("userData"));
      let filterData =[...data];
      filterData = filterData.filter((item) => item.email !== id);
      filterData.push(newData);
      localStorage.setItem("userData", JSON.stringify(filterData));
      setUsers(filterData);
    }    
  }
  return (
    <div className="admin">
      <h1>Users those need to be reject from the list.</h1>
      <hr/>
      <div className="table">
      <table>
      <tbody>
      <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Mobile</td>
            <td>Status</td>
            <td>Reject/Accept</td>
        </tr>
      {users
        ? users.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>  
              <td>{item.email}</td>  
              <td>{item.mobile}</td> 
              <td>{item.status}</td>
              <td><button onClick={() => onReject(item.email)} disabled={item.status ==="Rejected"}>Reject</button><button onClick={() => onAccept(item.email)} disabled={item.status ==="Accepted"}>Accept</button></td>
            </tr>
          ))
        : ""}
          </tbody>
        </table>
        </div>
    </div>
  );
};

export default Admin;
