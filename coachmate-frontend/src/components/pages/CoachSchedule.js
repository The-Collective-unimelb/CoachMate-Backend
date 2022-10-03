import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import classes from "./CoachSchedule.module.css";
import SessionPicker from "../Booking/SessionPicker";
import Button from "../UI/Button";
import SessionType from "../Booking/SessionType";
import { Stack } from "@mui/system";
import Swal from "sweetalert2";
import NoPage from "./NoPage";

import BookingTick from "../../assets/BookingTick.png";
import testPic from "../../assets/profile pic.png";

const sessionTypes = [
  { type: "1 on 1", duration: "30mins", price: "$40" },
  { type: "1 on 1", duration: "60mins", price: "$80" },
  { type: "Group", duration: "30mins", price: "$20" },
  { type: "Group", duration: "60mins", price: "$40" },
];

function CoachSchedule(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [sessionType, setSessionType] = useState("Private");

  if (location.state === null) {
    return (
      <>
        <NoPage text="Please select a coach " linkText="here" to="/coaches" />
      </>
    );
  }

  function handleSelectDate(newDate) {
    setSelectedDate(newDate);
  }

  function handleSelectType(value) {
    setSessionType(value);
    console.log(value);
  }

  function handleConfirmBooking() {
    // navigate("/booking-success");

    Swal.fire({
      title: "Success!",
      text: "Your booking is successful!",
      icon: "success",
      // iconHtml: <img src="../../assets/BookingTick.png" alt="booking success" />,
      // imageUrl: "/assets/BookingTick.png",
      // imageHeight: "200px",
      // imageWidth: "200px",
      showCancelButton: true,
      confirmButtonText: "Back to home page",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  }

  return (
    <div className={classes.layout}>
      <Stack direction="row" spacing={10}>
        <Stack spacing={5}>
          {/* <Button onClick={() => navigate(-1)}>Back</Button> */}

          <img src={testPic} alt="profile pic" />
          <h2>{location.state.coach.name}</h2>
          <h3>Venue</h3>
        </Stack>
        <Stack spacing={5}>
          <SessionPicker
            dateTime={selectedDate}
            onSelectDate={handleSelectDate}
          />
          <SessionType
            sessionType={sessionType}
            onSelectType={handleSelectType}
          />
        </Stack>
      </Stack>
      <Button onClick={handleConfirmBooking}>CONFIRM BOOKING</Button>

    </div>
  );
}

export default CoachSchedule;
