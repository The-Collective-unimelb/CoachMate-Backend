import { useState } from "react";
import dayjs from "dayjs";
import { TextField, Autocomplete } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const minDate = dayjs();
const maxDate = dayjs().add(5, "month");

function SessionPicker(props) {
  const [openDate, setOpenDate] = useState(false);
  const [hasError, setHasError] = useState(false);

  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  function handleSelectDate(newDate) {
    props.onSelectDate(newDate);
    console.log(newDate);
    console.log(minDate);
    if (newDate < minDate.date() - 1) {
      setHasError(true);
    } else if (newDate > maxDate) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }

  function handleError() {
    setOpenDate(false);
    // handle formatting here
  }

  function handleSelectTime(event, newTime) {
    props.onSelectTime(event, newTime);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        open={openDate}
        onOpen={() => setOpenDate(true)}
        onClose={handleError}
        value={props.date}
        onChange={handleSelectDate}
        label="Select date"
        inputFormat="L"
        minDate={minDate}
        maxDate={maxDate}
        views={["day"]}
        mask="__/__/____"
        components={{ OpenPickerIcon: CalendarMonthIcon }}
        renderInput={(param) => (
          <TextField
            {...param}
            error={hasError}
            helperText={hasError && "Invalid"}
            onClick={() => setOpenDate(true)}
            sx={{ borderImageWidth: "0px" }}
          />
        )}
      />
      {/* <TimePicker
        open={openTime}
        onOpen={() => setOpenTime(true)}
        onClose={() => setOpenTime(false)}
        value={props.time}
        onChange={handleSelectTime}
        label="Select time"
        inputFormat="LT"
        minTime={minTime}
        maxTime={maxTime}
        views={["hours"]}
        PopperProps={{ sx: popperSx }}
        shouldDisableTime={disableTime}
        renderInput={(param) => (
          <TextField
            {...param}
            error={hasError}
            helperText={hasError && "Invalid"}
            onClick={() => setOpenTime(true)}
            sx={{
              borderImageWidth: "5px",
            }}
          />
        )}
      /> */}
      <Autocomplete
        value={props.time || null}
        onChange={handleSelectTime}
        options={props.timeOptions}
        isOptionEqualToValue={(option, value) => option.label === value}
        renderInput={(params) => <TextField {...params} label="Select time" />}
      />
    </LocalizationProvider>
  );
}

export default SessionPicker;
