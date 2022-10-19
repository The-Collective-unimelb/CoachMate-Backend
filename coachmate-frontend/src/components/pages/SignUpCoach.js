import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./Signup.module.css";
import Button from "../UI/Button";
import axios from "axios";

function SignUpFormCoach(props) {

  const navigate = useNavigate();

  const [state, setState] = useState({
    role: "Coach",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "Male",
    age: "",
    address: "",
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
      gender: state.gender,
      age: state.age,
      address: state.address,
      email: state.email,
      password: state.password,
    };

    axios({
      url: "http://localhost:5000/coaches/register",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Coach data has been received!!");
        navigate("/login");
      })
      .catch(() => {
        alert("Internal Server Error!!");
      });
  };

  console.log(state);

  return (
    <div className={classes.loginForm}>
      <div className={classes.form}>
        <div className={classes["role-horizontal-container"]}>
          <Link
            to="/signup-athlete"
            className={[classes.other, classes.removeRight].join(" ")}
          >
            ATHLETE
          </Link>
          <div className={classes.current}>COACH</div>
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
          <label>GENDER</label>
          <br />
          <br />
          <select
            className={classes.entries}
            name="gender"
            value={state.gender}
            onChange={handleChange}
          >
            <option value="Male">MALE</option>
            <option value="Female">FEMALE</option>
          </select>
          <br />
          <br />
          <label>AGE</label>
          <input
            className={classes.entries}
            name="age"
            type="number"
            value={state.age}
            onChange={handleChange}
          />
          <label>ADDRESS</label>
          <input
            className={classes.entries}
            name="address"
            type="text"
            value={state.address}
            onChange={handleChange}
          />
          <label>EMAIL</label>
          <input
            className={classes.entries}
            name="email"
            type="email"
            value={state.email}
            onChange={handleChange}
          />
          <label>PASSWORD</label>
          <input
            className={classes.entries}
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
          />
          <label>CONFIRM PASSWORD</label>
          <input
            className={classes.entries}
            name="confirmPassword"
            type="password"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <br />
        <Button onClick={handleSubmit}>SIGN UP</Button>
      </div>
    </div>
  );
}

export default SignUpFormCoach;
