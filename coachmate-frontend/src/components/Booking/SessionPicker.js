import { useState } from "react";
import { Autocomplete, Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import classes from "./Session.module.css";

const minDate = dayjs();
const maxDate = dayjs().add(5, "month");

function SessionPicker(props) {
  const [openDate, setOpenDate] = useState(false);
  const [hasError, setHasError] = useState(false);

  let dateColor = "green";
  const popperSx = {
    "& .MuiPaper-root": {
      // backgroundColor: "rgba(120, 120, 120, 0.2)",
    },
    "& .MuiCalendarPicker-root": {
      // backgroundColor: "rgba(45, 85, 255, 0.4)",
    },
    "& .MuiPickersDay-dayWithMargin": {
      color: "white",
      backgroundColor: `${dateColor}`,
    },
    // "& .MuiTabs-root": { backgroundColor: "rgba(120, 120, 120, 0.4)" },
  };

  function handleSelectDate(newDate) {
    props.onSelectDate(newDate);
    if (newDate > minDate.date() - 1 && newDate < maxDate) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  }

  function handleSelectTime(event, newTime) {
    props.onSelectTime(event, newTime);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label htmlFor="date" className={classes["label"]}>
        Select Date:
      </label>
      <DatePicker
        open={openDate}
        onOpen={() => setOpenDate(true)}
        onClose={() => setOpenDate(false)}
        value={props.date}
        onChange={handleSelectDate}
        label="Select date"
        inputFormat="MM/DD/YYYY"
        minDate={minDate}
        maxDate={maxDate}
        views={["day"]}
        mask="__/__/____"
        disableHighlightToday
        PopperProps={{ sx: popperSx }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <Box>
            <input
              ref={inputRef}
              {...inputProps}
              id="date"
              onClick={() => setOpenDate(true)}
              className={`${classes["box"]} ${
                hasError ? classes["err"] : classes["valid"]
              }`}
            />
          </Box>
        )}
      />
      <br />
      <label htmlFor="time" className={classes["label"]}>
        Select Time:
      </label>
      <Autocomplete
        value={props.time || null}
        onChange={handleSelectTime}
        options={props.timeOptions}
        isOptionEqualToValue={(option, value) => option.label === value}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              id="time"
              type="text"
              {...params.inputProps}
              className={`${classes["box"]} ${classes["valid"]}`}
            />
          </div>
        )}
      />
      <br />
    </LocalizationProvider>
  );
}

export default SessionPicker;
