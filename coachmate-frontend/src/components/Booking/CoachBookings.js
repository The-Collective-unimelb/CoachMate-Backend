import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./AthleteBooking.module.css";

var baseUrl = process.env.BASE_URL || "http://localhost:5000";

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  baseUrl = "https://coachmate-2022.herokuapp.com";
}

function CoachBookings() {
  const [bookings, setBookings] = useState([]);
  const [pending, setPending] = useState(false);
  const [booked, setBooked] = useState(false);
  const [complete, setComplete] = useState(false);

  const getData = () => {
    axios
      .get(baseUrl + "/bookings/coach", { withCredentials: true })
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setBookings(data);
        console.log("booking", data);
        console.log("Data has been received!!");
      })
      .catch((e) => {
        console.log(e);
        alert("Error retrieving data!!");
      });
  };

  const handleAccept = (id) => {
    console.log(id);
    axios({
      url: baseUrl + "/coaches/acceptBookings",
      method: "POST",
      data: { bookingId: id},
      withCredentials: true,
    })
  };

  const handleCancel = (id) => {
    console.log(id);
    axios({
      url: baseUrl + "/coaches/cancelBookings",
      method: "POST",
      data: { bookingId: id},
      withCredentials: true,
    })
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
      <div>
        {bookings.map((booking) => {
          if (booking.status === "Pending") {
            if (!pending) setPending(true);
            return (
              <div className={classes["history-row"]}>
                <div>{booking.sessionDate.slice(0, -12)}</div>
                <div>{booking.sessionTime}</div>

                {booking.trainees.map((athlete) => {
                  return (
                    <div>
                      {athlete.firstName} {athlete.lastName}
                    </div>
                  );
                })}
                <div>{booking.sessionType}</div>
                <div className={classes["data-status"]}>
                  <button onClick={(e) => handleAccept(booking._id, e)}> Accept</button>
                  <button onClick={(e) => handleCancel(booking._id, e)}> Cancel</button>
                </div>
              </div>
            );
          }
          return null;
        })}
        {!pending && <p>No data here</p>}
      </div>

      <h1>UPCOMING</h1>
      <div>
        {bookings.map((booking) => {
          if (booking.status === "Booked") {
            if (!booked) setBooked(true);
            return (
              <div className={classes["history-row"]}>
                <div>{booking.sessionDate.slice(0, -12)}</div>
                <div>{booking.sessionTime}</div>
                {booking.trainees.map((athlete) => {
                  return (
                    <div>
                      {athlete.firstName} {athlete.lastName}
                    </div>
                  );
                })}
                <div>{booking.sessionType}</div>
                <div className={classes["data-status"]}>
                  <button onClick={(e) => handleCancel(booking._id, e)}> Cancel</button>
                </div>
              </div>
            );
          }
          return null;
        })}
        {!booked && <p>No data here</p>}
      </div>

      <h1>PAST</h1>
      <div>
        {bookings.map((booking) => {
          if (
            booking.status === "Completed" ||
            booking.status === "Cancelled"
          ) {
            if (!complete) setComplete(true);
            return (
              <div className={classes["history-row"]}>
                <div>{booking.sessionDate.slice(0, -12)}</div>
                <div>{booking.sessionTime}</div>
                {booking.trainees.map((athlete) => {
                  return (
                    <div>
                      {athlete.firstName} {athlete.lastName}
                    </div>
                  );
                })}
                <div>{booking.sessionType}</div>
              </div>
            );
          }
          return null;
        })}
        {!complete && <p>No data here</p>}
      </div>
    </div>
  );
}

export default CoachBookings;
