import { Link } from "react-router-dom";
import classes from "./AthleteBooking.module.css";

const DUMMY_VARS = [
  {
    date: "10/10/2022",
    time: "10:00am",
    athlete: "Jett",
    sessionType: "Private",
    status: "New",
  },
  {
    date: "10/10/2022",
    time: "10:00am",
    athlete: "Pheonix",
    sessionType: "Private",
    status: "Accepted",
  },
  {
    date: "10/10/2022",
    time: "10:00am",
    athlete: "Omen",
    sessionType: "Group",
    status: "Cancelled",
  },
  {
    date: "10/10/2022",
    time: "10:00am",
    athlete: "Jade",
    sessionType: "Group",
    status: "Completed",
  },
];

function CoachBookings() {
  function handleAccept(data) {
    data.status = "Accepted";
  }
  function handleCancel(data) {
    data.status = "Cancelled";
  }

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
      <div className={classes["history-header"]}>
        <div>DATE</div>
        <div>|</div>
        <div>TIME</div>
        <div>|</div>
        <div>ATHLETE</div>
        <div>|</div>
        <div>SESSION TYPE</div>
        <div>|</div>
        <div>STATUS</div>
      </div>

      <h1>NEW</h1>

      {DUMMY_VARS.map((data) => {
        if (data.status === "New") {
          return (
            <div className={classes["history-row"]}>
              <div>{data.date}</div>
              <div>{data.time}</div>
              <div>{data.athlete}</div>
              <div>{data.sessionType}</div>
              <div className={classes["data-status"]}>
                <button onClick={handleAccept(data)}> Accept</button>
                <button onClick={handleCancel(data)}> Cancel</button>
              </div>
            </div>
          );
        }
        return 0;
      })}
      <h1>UPCOMING</h1>

      {DUMMY_VARS.map((data) => {
        if (data.status === "Accepted") {
          return (
            <div className={classes["history-row"]}>
              <div>{data.date}</div>
              <div>{data.time}</div>
              <div>{data.athlete}</div>
              <div>{data.sessionType}</div>
              <div className={classes["data-status"]}>
                <button onClick={handleCancel(data)}> Cancel</button>
              </div>
            </div>
          );
        }
        return 0;
      })}

      <h1>PAST</h1>
      {DUMMY_VARS.map((data) => {
        if (data.status === "Completed" || data.status === "Cancelled") {
          return (
            <div className={classes["history-row"]}>
              <div>{data.date}</div>
              <div>{data.time}</div>
              <div>{data.athlete}</div>
              <div>{data.sessionType}</div>
              <div>{data.status}</div>
            </div>
          );
        }
        return 0;
      })}
    </div>
  );
}

export default CoachBookings;
