import { Link } from "react-router-dom";
import classes from "./AthleteBooking.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

var baseUrl = process.env.BASE_URL || "http://localhost:5000";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  baseUrl = "https://coachmate-2022.herokuapp.com";
}

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
];

function AthleteBooking() {
  const [users, setUsers] = useState([]);

  const getData = () => {
    axios
      .get(baseUrl + "/athlete/viewBookings", { withCredentials: true })
      .then((response) => {
        //console.log(response.data);
        return response.data;
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  useEffect(() => {
    getData();
  }, []);

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

      {users.map((data) => {
        return (
          <div className={classes["history-row"]}>
            <div>{data.sessionDate.slice(0, -12)}</div>
            <div>{data.sessionTime}</div>
            <div>{data.coachName}</div>
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
