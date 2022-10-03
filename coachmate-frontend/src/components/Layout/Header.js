import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import coachmateFlat from "../../assets/CoachmateFlat.png";

function Header() {
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
      <Link to="/login" className={classes["login"]}>
        LOGIN
      </Link>
    </div>
  );
}

export default Header;
