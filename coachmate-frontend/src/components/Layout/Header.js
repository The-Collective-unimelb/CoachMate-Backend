import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./Header.module.css";
import coachmateFlat from "../../assets/CoachmateFlat.png";

import { AuthContext } from "../../App";

function Header() {
  const ctx = useContext(AuthContext);

  function isLoggedInLink() {
    if (ctx.isLoggedIn) {
      return (
        <Link to="/login" className={classes["account"]}>
          ACCOUNT
        </Link>
      );
    } else {
      return (
        <Link to="/login" className={classes["login"]}>
          LOGIN
        </Link>
      );
    }
  }

  function showBookingNav() {
    if (ctx.role === "Athlete") {
      return (
        <Link to="athlete-booking" className={classes["nav-item"]}>
          My Bookings
        </Link>
      );
    }
    if (ctx.role === "Coach") {
      return (
        <Link to="coach-booking" className={classes["nav-item"]}>
          My Schedule
        </Link>
      );
    }
  }

  return (
    <div className={classes.header}>
      <Link to="/" className={classes["logo"]}>
        <img
          className={classes.logo}
          src={coachmateFlat}
          alt="coachmate logo"
        />
      </Link>
      <nav>
        <ul className={classes["flexbox-navbar-text"]}>
          <li>
            {ctx.isLoggedIn && ctx.role === "Athlete" && (
              <Link to="athlete-booking" className={classes["nav-item"]}>
                MY BOOKINGS
              </Link>
            )}
            {ctx.isLoggedIn && ctx.role === "Coach" && (
              <Link to="coach-booking" className={classes["nav-item"]}>
                MY SCHEDULE
              </Link>
            )}
          </li>
          <li>
            <Link to="/about-us" className={classes["nav-item"]}>
              ABOUT US
            </Link>
          </li>
          <li>
            <Link to="/contact" className={classes["nav-item"]}>
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
      {isLoggedInLink()}
    </div>
  );
}

export default Header;
