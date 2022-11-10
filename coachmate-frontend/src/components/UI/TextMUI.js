import classes from "./TextMUI.module.css";
import { TextField } from "@mui/material";

function TextMUI(props) {
  return (
    <TextField
      id={props.id}
      name={props.id}
      label={props.label}
      sx={props.sx}
      className={classes["textfield"]}
      onInput={props.onInput}
      value={props.value}
      defaultValue={props.value}
    />
  );
}

export default TextMUI;
