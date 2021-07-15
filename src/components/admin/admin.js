import React, { useEffect, useState } from "react";
import "./admin.css";

const Admin = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    const usersData = JSON.parse(localStorage.getItem("userData"));
    const data = JSON.parse(localStorage.getItem("user"));
    const fliterAdmin = usersData.filter(user => user.email !== data[0].email);
    setUsers(fliterAdmin);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const onReject = (id) => {
    let copy = [...users];
    copy = copy.filter((item) => item.email !== id);
    localStorage.setItem("userData", JSON.stringify(copy));
    const data = JSON.parse(localStorage.getItem("userData"));
    setUsers(data);
  };
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
            <td>Reject</td>
        </tr>
      {users
        ? users.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>  
              <td>{item.email}</td>  
              <td>{item.mobile}</td> 
              <td><button onClick={() => onReject(item.email)}>Reject</button></td>
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
