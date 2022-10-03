import classes from "./CoachCard.module.css";
import testPic from "../../assets/profile pic.png";

function CoachCard(props) {
  return (
    <div className={classes["coach-cards"]} onClick={props.onClick}>
      <img className={classes.pic} src={testPic} alt="test profile pic" />
      <div>
        <h2>{props.name}</h2>
        <p>{props.avail}</p>
      </div>
      <h4>{props.location}</h4>
    </div>
  );
}

export default CoachCard;
