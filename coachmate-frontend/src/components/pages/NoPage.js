import { Link } from "react-router-dom";
import classes from "./NoPage.module.css";

function NoPage(props) {
    const linkText = <Link to={props.to} style={{color:"dodgerblue"}}>{props.linkText}</Link>
  return (
    <div className={classes.page}>
      <h1>404</h1>
      <h3>{props.text} {linkText}</h3>

    </div>
  );
}

export default NoPage;
