import BookingTick from "../../assets/BookingTick.png"
import classes from "./BookingSuccess.module.css"

function BookingSuccess() {
    return (
        <div className={classes.tick}>
            <img src={BookingTick}/>
            <h2>Thank you for choosing CoachMate</h2>
            <h3>Confirmation email has been sent.</h3>
            <h3>Please check your spam/junk folder if not in inbox</h3>
        </div>
    );
}

export default BookingSuccess;