import classes from "./CoachProfile.module.css";
import pfp from "../../assets/pfp-blue.jpg";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../App";
import Button from "../UI/Button";
import axios from "axios";
import NoPage from "./NoPage";

var baseUrl = process.env.BASE_URL || "http://localhost:5000";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  baseUrl = "https://coachmate-2022.herokuapp.com";
}

function CoachProfile() {
  const ctx = useContext(AuthContext);
  const location = useLocation();
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    aboutMe: "",
    skills: "",
    qualifications: "",
    privatePrice: "",
    groupPrice: "",
    contactInfo: "",
  });

  useEffect(() => {
    // athlete viewing
    if (location.state !== null && details !== null) {
      setDetails({
        firstName: location.state.coach.firstName,
        lastName: location.state.coach.lastName,
        aboutMe: location.state.coach.aboutMe,
        skills: location.state.coach.skills,
        qualifications: location.state.coach.qualifications,
        privatePrice: location.state.coach.privatePrice,
        groupPrice: location.state.coach.groupPrice,
        contactInfo: location.state.coach.contactInfo,
      });

      // entered from dashboard
    } else {
      axios
        .get(baseUrl + `/coaches/getDetails`, {
          withCredentials: true,
        })
        .then((res) => {
          setDetails({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            aboutMe: res.data.aboutMe,
            skills: res.data.skills,
            qualifications: res.data.qualifications,
            privatePrice: res.data.privatePrice,
            groupPrice: res.data.groupPrice,
            contactInfo: res.data.contactInfo,
          });
        })
        .catch((err) => {
          console.log(err);
          console.log("fetch profile error");
        });
    }
  }, []);

  if (
    (location.state === null && ctx.role !== "Coach") ||
    (ctx.isLoggedIn && ctx.role === "Athlete" && location.state === null)
  ) {
    return (
      <NoPage text="Please select a coach " linkText="here" to="/coaches" />
    );
  } else {
    // console.log(location.state);
  }

  return (
    <div className={classes["vertical-flex"]}>
      {ctx.isLoggedIn && ctx.role === "Athlete" && (
        <div className={classes.topbar}>
          <Link to="/coaches" className={classes["topbar-text"]}>
            COACH LIST
          </Link>
        </div>
      )}
      {ctx.isLoggedIn && ctx.role === "Coach" && (
        <div className={classes.topbar}>
          <Link to="/coach-dashboard" className={classes["topbar-text"]}>
            DASHBOARD
          </Link>
          <div>&nbsp; {">"} &nbsp;</div>
          <Link to="#" className={classes["topbar-text"]}>
            PROFILE
          </Link>
        </div>
      )}
      <h1 className={classes["heading"]}>PROFILE</h1>
      <div className={classes["horizontal-flex"]}>
        <div className={classes["profile-pic-column"]}>
          <h2 className={classes["coach-name"]}>
            {details.firstName} {details.lastName}
          </h2>
          <img
            src={pfp}
            className={classes["profile-pic"]}
            alt="profile pic"
          ></img>
          <br></br>
          <br></br>
          <br></br>
          {ctx.isLoggedIn && ctx.role === "Coach" && (
            <Button>
              <Link to="/edit-profile">EDIT PROFILE</Link>
            </Button>
          )}
          {ctx.isLoggedIn && ctx.role === "Athlete" && (
            <Button>
              <Link to="/schedule" state={{ coach: location.state.coach }}>
                BOOK NOW
              </Link>
            </Button>
          )}
        </div>
        <div className={classes["profile-details-column"]}>
          <div>
            <h2>ABOUT ME</h2>
            {!details.aboutMe && <p>No info yet!</p>}
            <pre>{details.aboutMe}</pre>
          </div>
          <div>
            <h2>SKILLS</h2>
            {!details.skills && <p>No info yet!</p>}
            <pre>{details.skills}</pre>
          </div>
          <div>
            <h2>QUALIFICATIONS</h2>
            {!details.qualifications && <p>No info yet!</p>}
            <pre>{details.qualifications}</pre>
          </div>
          <div>
            <h2>SESSION PRICES</h2>
            <pre>One-on-One Coaching 60 MINS {details.privatePrice}</pre>
            <pre>Group Coaching 60 MINS {details.groupPrice}</pre>
          </div>
          <div>
            <h2>CONTACT INFO</h2>
            {!details.contactInfo && <p>No info yet!</p>}
            <pre>{details.contactInfo}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachProfile;
