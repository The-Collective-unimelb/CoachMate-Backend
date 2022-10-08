import {
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import classes from "./Session.module.css";

function SessionType(props) {
  function handleChange(event) {
    props.onSelectType(event.target.value);
  }

  return (
    <FormControl>
      <label htmlFor="session-type" className={classes["label"]}>
        Session Type
      </label>
      <RadioGroup
        aria-labelledby="session-type"
        name="session-type"
        value={props.sessionType}
        onChange={handleChange}
      >
        <FormControlLabel value="Private" control={<Radio />} label="Private" />
        <FormControlLabel value="Group" control={<Radio />} label="Group" />
      </RadioGroup>
    </FormControl>
  );
}

export default SessionType;
