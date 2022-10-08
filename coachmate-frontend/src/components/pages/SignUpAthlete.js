import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Signup.module.css";
import Button from "../UI/Button";

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

  return (
    <div className={classes.loginForm}>
      <div className={classes.form}>
        <div className={classes.roleContainer}>
          <Button className={classes.current}>ATHLETE</Button>
          <Link to="/signup-coach">
            <Button className={classes.other}>COACH</Button>
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
            name="lastNAME"
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
        <br/>
        {/*<input type="submit" value="SIGN UP" className={classes.submitBtn} />*/}
        <Link to="/login" className={classes.login}>
          <Button>SIGN UP</Button>
        </Link>
      </div>
    </div>
  );
}

export default SignUpFormAthlete;
