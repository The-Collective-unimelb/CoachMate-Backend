import React, { useState } from "react";
import { ButtonGroup } from "@mui/icons-material";
import {} from "@mui/material";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Button from "../UI/Button";

function LoginForm(props) {
  const [state, setState] = useState({
    role: "Athlete",
    email: "",
    password: "",
  });

  /*const [checked, setChecked] = useState({
    rememberMe : false
  })*/

  /*const handleChecked =() => {

    setChecked(!checked);
}*/

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
            for={classes["athlete"]}
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
            for={classes["coach"]}
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
        <br/>
        {/* <input type="submit" value="LOGIN" className={classes.submitBtn}/> */}
        {/* Link to dashboard temporarily */}
        <Link to="/coach-dashboard" className={classes.login}>
          <Button>LOGIN</Button>
        </Link>
        <br/>
        <div className={classes.createAccount}>
          <p>
            DON'T HAVE AN ACCOUNT?&nbsp;
            <Link to="/signup" className={classes.signup}>
              CREATE AN ACCOUNT
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
