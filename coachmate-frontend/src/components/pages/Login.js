import React, { useState } from "react";
import {} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Button from "../UI/Button";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../App";

var baseUrl = process.env.BASE_URL || "http://localhost:5000";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  baseUrl = "https://coachmate-2022.herokuapp.com";
}

function LoginForm(props) {
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [state, setState] = useState({
    role: "Athlete",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    if (state.email === "" || state.password === "") {
      alert("Enter email and password");
      return;
    }

    const payload = {
      email: state.email,
      password: state.password,
    };

    let role;
    if (state.role === "Coach") role = "coaches";
    if (state.role === "Athlete") role = "athlete";

    axios({
      url: baseUrl + `/${role}/login`,
      method: "POST",
      data: payload,
      withCredentials: true,
    })
      .then(() => {
        ctx.setRole(state.role);
        ctx.setIsLoggedIn(true);

        axios
          .get(baseUrl + `/${role}/getId`, {
            withCredentials: true,
          })
          .then((res) => {
            console.log("res data", res.data)
            localStorage.setItem("user", res.data._id);
            console.log("store", localStorage.getItem("user"));
          })
          .catch((err) => {
            console.log(err);
            console.log("store fail");
          });

        if (state.role === "Coach") {
          // log(role);
          navigate("/coach-dashboard");
        }
        if (state.role === "Athlete") {
          // log(role);
          navigate("/");
        }
        console.log(`${state.role} data has been received!!`);
      })
      .catch(() => {
        alert("Email or Password is incorrect");
      });
  };

  function log(role) {
    axios
      .get(baseUrl + `/${role}/getDetails`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log("WTF");
      });
  }

  return (
    <div className={classes.loginForm}>
      <div className={classes.form}>
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
        <h2>LOGIN</h2>

        <div className={classes.loginDetails}>
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
          {/*<FormControlLabel control={
                        <CheckBox
                            checked={checked}
                            onChange={handleChecked} 
                          />}
                        label="REMEMBER ME"
                    />*/}
        </div>
        <br />
        {/* <input type="submit" value="LOGIN" className={classes.submitBtn}/> */}
        {/* Link to dashboard temporarily */}
        <Button type="submit" onClick={handleLogin}>
          LOGIN
        </Button>
        <br />
        <div className={classes.createAccount}>
          <p>
            DON'T HAVE AN ACCOUNT?&nbsp;
            <Link to="/signup-athlete" className={classes.signup}>
              CREATE AN ACCOUNT
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
