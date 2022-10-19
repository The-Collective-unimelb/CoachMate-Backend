import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./TestDB.module.css";

function TestDB() {
  const [users, setUsers] = useState([]);

  const getData = () => {
    axios
      .get("/coaches")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  const displayData = () => {
    if (users.length < 0) return null;

    return users.map((post, index) => (
      <div key={index}>
        <h3>USER {index + 1}</h3>
        <h3>NAME</h3>
        <p>{post.firstName}</p>
        <p>{post.lastName}</p>
        <h3>EMAIL</h3>
        <p>{post.email}</p>
        <h3>PASSWORD</h3>
        <p>{post.password}</p>
        <h3>PHONE</h3>
        <p>{post.phone}</p>
        {(() => {
          if (1) {
            return (
              <div>
                <h3>GENDER</h3>
                <p>{post.gender}</p>
                <h3>ADDRESS</h3>
                <p>{post.address}</p>
              </div>
            );
          }
        })()}
      </div>
    ));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>MONGODB CONNECTION TESTING (COACH)</h1>
      <div className={classes["horizontal-flex"]}>{displayData()}</div>
    </div>
  );
}

export default TestDB;
