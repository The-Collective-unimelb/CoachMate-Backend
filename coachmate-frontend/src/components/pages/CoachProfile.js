import classes from "./CoachProfile.module.css";
import pfp from "../../assets/pfp-blue.jpg";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import Button from "../UI/Button";

function CoachProfile() {
  const ctx = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className={classes["vertical-flex"]}>
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
            {location.state.coach.firstName} {location.state.coach.lastName}
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
            <Link to="/edit-profile">EDIT PROFILE</Link>
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
          <p>
            <h2>ABOUT ME</h2>
            {location.state.coach.aboutMe}
          </p>
          <p>
            <h2>SKILLS</h2>
            {location.state.coach.skills}
          </p>
          <p>
            <h2>QUALIFICATIONS</h2>
            {location.state.coach.qualifications}
          </p>
          <p>
            <h2>SESSION PRICES</h2>
            <div>
              One-on-One Coaching 60 MINS {location.state.coach.privatePrice}
            </div>
            {/* <div>One-on-One Coaching 45 MINS $250</div>
            <div>Small Group up to 4 athletes 60 MINS $300</div>
            <div>Team up to 15 athletes 60 MINS $500</div>
            <div>Online Mentoring 30 MINS $100</div> */}
            <div>Group Coaching 60 MINS {location.state.coach.groupPrice}</div>
          </p>
          {/* <p>
            <h2>REVIEWES</h2>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Libero
            justo laoreet sit amet cursus sit amet dictum sit. Nulla facilisi
            cras fermentum odio eu. Sed risus pretium quam vulputate dignissim
            suspendisse in est. Convallis tellus id interdum velit laoreet id
            donec. Nibh mauris cursus mattis molestie a iaculis. Urna id
            volutpat lacus laoreet. Sagittis aliquam malesuada bibendum arcu
            vitae elementum curabitur vitae.
          </p> */}
          <p>
            <h2>CONTACT INFO</h2>
            {location.state.coach.contactInfo}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoachProfile;
