import axios from "axios";
import React, { useEffect, useState } from "react";

function TestDB() {
  const [users, setUsers] = useState([])

  const getData = () => {
    axios
      .get("/api")
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
        <h3>{post.firstName}</h3>
        <p>{post.lastName}</p>
      </div>
    ));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>MONGODB CONNECTION TESTING</h1>
      <div>{displayData()}</div>
    </div>
  );
}

export default TestDB;
