import classes from "./EditProfile.module.css";
import pfp from "../../assets/pfp-blue.jpg";
import { Link } from "react-router-dom";

function EditProfile() {
  return (
    <div className={classes["vertical-flex"]}>
      <div className={classes.topbar}>
        <Link to="/coach-dashboard" className={classes["topbar-text"]}>
          DASHBOARD
        </Link>
        <div>&nbsp; {">"} &nbsp;</div>
        <Link to="#" className={classes["topbar-text"]}>
          EDIT PROFILE
        </Link>
      </div>
      <h1 className={classes["heading"]}>EDIT PROFILE</h1>
      <div className={classes["horizontal-flex"]}>
        <div className={classes["profile-pic-column"]}>
          <h2 className={classes["coach-name"]}>NAME</h2>
          <img
            src={pfp}
            className={classes["profile-pic"]}
            alt="profile pic"
          ></img>
          <h3 className={classes["edit-pfp"]}>EDIT PROFILE PHOTO</h3>
        </div>
        <div className={classes["input-column"]}>
          <label>Name</label>
          <input className={classes["name"]}></input>
          <label>Password</label>
          <input className={classes["name"]}></input>
          <label>Email</label>
          <input className={classes["name"]}></input>
          <label>Contact Number</label>
          <input className={classes["name"]}></input>
          <label>Gender</label>
          <input className={classes["name"]}></input>
          <label>Date of Birth</label>
          <input className={classes["name"]}></input>
          <label>Location</label>
          <input className={classes["name"]}></input>
          <label>Social Media</label>
          <input className={classes["name"]}></input>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
