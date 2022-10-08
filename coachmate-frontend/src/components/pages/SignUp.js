import React from "react";
import { useState } from "react";
import classes from "./Signup.module.css";
import Button from "../UI/Button";
import axios from "axios";

function SignUpForm(props) {
  const [state, setState] = useState({
    role: "Athlete",
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
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.radioDiv}>
          <input
            name="role"
            id={classes["athlete"]}
            className={classes.athleteRadio}
            type="radio"
            value="Athlete"
            onChange={handleChange}
            defaultChecked
          />
          <label
            htmlFor={classes["athlete"]}
            id={classes["athlete"]}
            className={classes.athleteLabel}
          >
            ATHLETE
          </label>
          <input
            name="role"
            id={classes["coach"]}
            className={classes.coachRadio}
            type="radio"
            value="Coach"
            onChange={handleChange}
          />
          <label
            htmlFor={classes["coach"]}
            id={classes["coach"]}
            className={classes.coachLabel}
          >
            COACH
          </label>
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
      </form>
    </div>
  );
}

export default SignUpForm;
