import {
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

function SessionType(props) {
  function handleChange(event) {
    props.onSelectType(event.target.value);
  }

  return (
    <FormControl>
      <FormLabel id="session-type">Session Type</FormLabel>
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
