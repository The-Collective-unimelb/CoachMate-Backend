import classes from "./Welcome.module.css";
import Card from "../UI/Card";
import netball from "../../assets/netball.png";
import Button from "../UI/Button";

function Welcome() {
  return (
    <div className={classes["vertical-flex"]}>
      <h1>SEARCH COACHMATE</h1>
      <div className={classes["horizontal-search-flex"]}>
        <div className={classes["flexbox-form"]}>
          <input
            className={classes.entries}
            name="Name"
            type="text"
            placeholder="SPORT"
          />
        </div>
        <div className={classes["flexbox-form"]}>
          <input
            className={classes.entries}
            name="Name"
            type="text"
            placeholder="LOCATION"
          />
        </div>
        <Button>FIND COACH</Button>
      </div>
      <div className={classes["horizontal-content-flex"]}>
        <div className={classes["welcome-quote"]}>
          LESS TIME BOOKING, MORE TIME TRAINING
          <div className={classes["welcome-quote-small"]}>
            Seemlessly connects coaches with athletes hassle free. So you only
            have to worry about the important stuff - Training to be better
            everyday!
            <br />
            <br />
            <b>ANYWHERE.ANYTIME.</b>
          </div>
        </div>
        <Card>
          <img
            className={classes["netball-img"]}
            src={netball}
            alt="Netball icon"
          ></img>
          <div className={classes["card-title"]}>NETBALL</div>
          <div className={classes["card-quote"]}>
            Netball is a ball sport played by two teams of seven players,
            usually on an indoor court.
          </div>
          <Button variant="contained">SEE MORE</Button>
        </Card>
      </div>
    </div>
  );
}

export default Welcome;
