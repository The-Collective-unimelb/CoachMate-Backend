import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import classes from "./CoachSchedule.module.css";
import SessionPicker from "../Booking/SessionPicker";
import Button from "../UI/Button";
import SessionType from "../Booking/SessionType";
import { Stack } from "@mui/system";
import Swal from "sweetalert2";
import NoPage from "./NoPage";
import testPic from "../../assets/profile pic.png";

let timeOptions = [
  { label: "8:00am", time: 8 },
  { label: "9:00am", time: 9 },
  { label: "10:00am", time: 10 },
  { label: "11:00am", time: 11 },
  { label: "12:00pm", time: 12 },
  { label: "1:00pm", time: 13 },
  { label: "2:00pm", time: 14 },
  { label: "3:00pm", time: 15 },
  { label: "4:00pm", time: 16 },
  { label: "5:00pm", time: 17 },
  { label: "6:00pm", time: 18 },
];

function CoachSchedule(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [sessionType, setSessionType] = useState("Private");

  if (location.state === null) {
    return (
      <NoPage text="Please select a coach " linkText="here" to="/coaches" />
    );
  }

  function handleSelectDate(newDate) {
    setSelectedDate(newDate);
  }

  function handleSelectTime(event, newTime) {
    if (newTime) setSelectedTime(newTime.label);
    else setSelectedTime(null);
  }

  function handleSelectType(value) {
    setSessionType(value);
    console.log(value);
  }

  function handleConfirmBooking(event) {
    event.preventDefault();
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
      <div className={classes.topbar}>
        <Link to="/coaches" className={classes["topbar-text"]}>
          COACH LIST
        </Link>
        <div>&nbsp; {">"} &nbsp;</div>
        <div to="#" className={classes["topbar-text"]}>
          {location.state.coach.name}
        </div>
      </div>
      <div className={classes["stack-col"]}>
        <Stack spacing={10} direction="row">
          <Stack spacing={3}>
            <img src={testPic} alt="profile pic" />
            <h2>{location.state.coach.name}</h2>
            <h3>Venue</h3>
          </Stack>
          <Stack>
            <form id="session-form" onSubmit={handleConfirmBooking}>
              <SessionPicker
                date={selectedDate}
                time={selectedTime}
                timeOptions={timeOptions}
                onSelectDate={handleSelectDate}
                onSelectTime={handleSelectTime}
              />
              <SessionType
                sessionType={sessionType}
                onSelectType={handleSelectType}
              />
            </form>
            <Button type="submit" form="session-form">
              CONFIRM BOOKING
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default CoachSchedule;
