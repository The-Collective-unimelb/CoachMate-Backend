import classes from "./Contact.module.css";
import Button from "../UI/Button";

function Contact() {
  return (
    <div className={classes["flexbox-main-content"]}>
      <h1>CONTACT US</h1>
      <form
        action="https://formspree.io/f/xeqdkqab"
        method="POST"
        className={classes["form-container"]}
      >
        <div className={classes["flexbox-horizontal"]}>
          <div className={classes["flexbox-form"]}>
            <label>NAME</label>
            <input
              className={classes.entries}
              name="Name"
              type="text"
              placeholder="YOUR FULL NAME"
            />
          </div>
          <div className={classes["flexbox-form"]}>
            <label>PHONE</label>
            <input
              className={classes.entries}
              name="Phone"
              type="tel"
              placeholder="E.G. 0472654982"
            />
          </div>
        </div>
        <div className={classes["flexbox-form"]}>
          <label>EMAIL</label>
          <input
            className={classes["entries-fullwidth"]}
            name="Email"
            type="email"
            placeholder="E.G. EXAMPLE@DOMAIN.COM"
          />
        </div>
        <div className={classes["flexbox-form"]}>
          <label>MESSAGE</label>
          <textarea
            className={classes["entries-textarea"]}
            name="Message"
            type="text"
            placeholder="TYPE YOUR MESSAGE HERE"
          />
        </div>
        <Button>SEND</Button>
      </form>
    </div>
  );
}

export default Contact;
