import { Link } from "react-router-dom";
import classes from "./AthleteBooking.module.css";

const DUMMY_VARS = [
  {
    date: "10/10/2022",
    time: "10:00am",
    coach: "Jett",
    location: "Nunawading",
    price: "100",
    status: "Booked",
  },
  {
    date: "10/10/2022",
    time: "10:00am",
    coach: "Pheonix",
    location: "Clayton",
    price: "100",
    status: "Cancelled",
  },
  {
    date: "10/10/2022",
    time: "10:00am",
    coach: "Omen",
    location: "Sunshine",
    price: "100",
    status: "Booked",
  },
  {
    date: "10/10/2022",
    time: "10:00am",
    coach: "Jade",
    location: "Glen Waverley",
    price: "100",
    status: "Booked",
  },
];

function AthleteBooking() {
  return (
    <div className={classes["vertical-flex"]}>
      <div className={classes.topbar}>
        <Link to="/coach-dashboard" className={classes["topbar-text"]}>
          DASHBOARD
        </Link>
        <div>&nbsp; {">"} &nbsp;</div>
        <Link to="#" className={classes["topbar-text"]}>
          BOOKING HISTORY
        </Link>
      </div>
      <h1>BOOKING HISTORY</h1>
      <div className={classes["history-header"]}>
        <div>DATE</div>
        <div>|</div>
        <div>TIME</div>
        <div>|</div>
        <div>COACH</div>
        <div>|</div>
        <div>LOCATION</div>
        <div>|</div>
        <div>PRICE</div>
        <div>|</div>
        <div>STATUS</div>
      </div>

      {DUMMY_VARS.map((data) => {
        return (
          <div className={classes["history-row"]}>
            <div>{data.date}</div>
            <div>{data.time}</div>
            <div>{data.coach}</div>
            <div>{data.location}</div>
            <div>{data.price}</div>
            <div>{data.status}</div>
          </div>
        );
      })}
    </div>
  );
}

export default AthleteBooking;
