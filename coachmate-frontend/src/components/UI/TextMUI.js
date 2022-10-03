import classes from "./TextMUI.module.css";
import { TextField } from "@mui/material";

function TextMUI(props) {
  return (
    <TextField
      id={props.id}
      label={props.label}
      sx={props.sx}
      className={classes["textfield"]}
      onInput={props.onInput}
    />
  );
}

export default TextMUI;
