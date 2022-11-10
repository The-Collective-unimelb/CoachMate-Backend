import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import classes from "./CoachDashboard.module.css";
import pfp from "../../assets/pfp-blue.jpg";
import axios from "axios";

import { AuthContext } from "../../App";

var baseUrl = process.env.BASE_URL || "http://localhost:5000";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  baseUrl = "https://coachmate-2022.herokuapp.com";
}

function CoachDashboard() {
  const [profileReady, setProfileReady] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);
  const [data, setData] = useState({});

  // check whenever ctx change
  useEffect(() => {
    if (ctx.isLoggedIn === false) {
      navigate("/login");
    }
  }, [ctx.isLoggedIn, navigate]);

  useEffect(() => {
    axios
      .get(baseUrl + `/coaches/getDetails`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setData(res.data);
        if (
          res.data.aboutMe === "undefined" ||
          res.data.groupPrice === "undefined" ||
          res.data.privatePrice === "undefiend"
        ) {
          setProfileReady(false);
        } else {
          setProfileReady(true);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("fetch profile error");
      });
  }, []);

  return (
    <div className={classes["vertical-flex"]}>
      <h1 className={classes.heading}>DASHBOARD</h1>
      {!profileReady && <p>Set up your profile!</p>}
      <div className={classes["dashboard-grid-container"]}>
        <div className={classes["profile-column"]}>
          <div className={classes["profile-box"]}>
            <img
              src={pfp}
              className={classes["profile-pic"]}
              alt="profile pic"
            ></img>
            <h2 className={classes["profile-username"]}>
              {data.firstName}
              {" "}
              {data.lastName}
            </h2>
          </div>
        </div>
        <div className={classes["dashboard-buttons-grid-container"]}>
          <Link to="/coach-profile" className={classes.link}>
            MY PROFILE
          </Link>
          <Link to="/edit-profile" className={classes.link}>
            EDIT PROFILE
          </Link>
          <Link to="/coach-booking" className={classes.link}>
            MY SESSIONS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CoachDashboard;
