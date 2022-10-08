import classes from "./Button.module.css";

function Button(props) {
  return (
    <button
      type={props.type}
      style={props.style}
      className={classes.button}
      onClick={props.onClick}
      form={props.form}
    >
      {props.children}
    </button>
  );
}

export default Button;
