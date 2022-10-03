import { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { width } from "@mui/system";

const minTime = dayjs().hour(8);
const maxTime = dayjs().hour(18);

function SessionPicker(props) {
  const [hasError, setHasError] = useState(false);

  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);

  function handleSelectDate(newDate) {
    props.onSelectDate(newDate);
  }

  function handleError() {
    setHasError(!hasError);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
        value={props.dateTime}
        onChange={handleSelectDate}
        label="Select date and time"
        onError={handleError}
        inputFormat="DD/MM/YYYY HH:mm"
        minDate={dayjs()}
        maxDate={dayjs().add(5, "month")}
        minTime={minTime}
        maxTime={maxTime}
        mask="____/__/__ __:__ _M"
        views={["year", "day", "hours"]}
        renderInput={(param) => (
          <TextField
            {...param}
            error={hasError}
            helperText={hasError && "Invalid"}
            sx={{ 
              width: "500px",
              borderImageWidth: "0px"
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default SessionPicker;
