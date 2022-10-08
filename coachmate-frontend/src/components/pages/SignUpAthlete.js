import React from "react";
import { useState } from "react";
import classes from "./Signup.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Button";
import axios from "axios";

function SignUpFormAthlete(props) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password matches confirm password
    const { password, confirmPassword } = state;

    if (password !== confirmPassword) {
      alert("Passwords Don't Match");
      return;
    }

    console.log("Client Submitted");

    const payload = {
      role: state.role,
      firstName: state.firstName,
      lastName: state.lastName,
      phone: state.phone,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };

    axios({
      url: "http://localhost:5000/coaches/submit",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Internal Server Error!!");
      });
  };

  return (
    <div className={classes.loginForm}>
      <div className={classes.form}>
        <div className={classes.roleContainer}>
          <Button className={classes.current}>ATHLETE</Button>
          <Link to="/signup-coach"  className={classes.other}>
            <Button style={{backgroundColor: '#FFFFFF'}}>COACH</Button>
          </Link>
        </div>
        <h2>SIGN UP</h2>

        <div className={classes.loginDetails}>
          <label>FIRST NAME</label>
          <input
            className={classes.entries}
            name="firstName"
            type="text"
            value={state.firstName}
            onChange={handleChange}
          />
          <label>LAST NAME</label>
          <input
            className={classes.entries}
            name="lastName"
            type="text"
            value={state.lastName}
            onChange={handleChange}
          />
          <label>PHONE NO.</label>
          <input
            className={classes.entries}
            name="phone"
            type="tel"
            value={state.phone}
            onChange={handleChange}
          />
          <label>EMAIL</label>
          <input
            className={classes.entries}
            required
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
          />
          <label>PASSWORD</label>
          <input
            className={classes.entries}
            required
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
          />
          <label>CONFIRM PASSWORD</label>
          <input
            className={classes.entries}
            required
            name="confirmPassword"
            type="password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <br />
        <Button>SIGN UP</Button>
      </div>
    </div>
  );
}

export default SignUpFormAthlete;
