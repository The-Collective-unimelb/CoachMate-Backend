import classes from "./CoachSearch.module.css";
import Button from "../UI/Button";
import TextMUI from "../UI/TextMUI";

function CoachSearch(props) {
  return (
    <form className={classes.form} onSubmit={props.onSubmit}>
      <TextMUI
        id={props.id}
        label="Search"
        className={classes["textfield"]}
        onInput={props.onInput}
        value={props.searchVal}
      />
      <div className={classes.button}>
        {/* <Button type="button" onClick={props.onButtonClick}>FILTER</Button> */}
        <Button type="submit">SEARCH</Button>
      </div>
    </form>
  );
}

export default CoachSearch;
