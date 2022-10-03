import classes from "./AboutUs.module.css";

function AboutUs() {
  return (
    <div className={classes["flexbox-main-content"]}>
      <h1 className={classes.title}>ABOUT US</h1>
      <img
        className={classes.image}
        src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
      />
      <br />
      <div className={classes.about}>
        <div>
        CoachMate's <b>mission</b> is to bring coaches and clients together by
        enabling them to easily reserve their services online no matter which,
        where they are or when they want to book!
        </div>
        <br />
        <div>
        Our <b>vision</b> is to become the best global customer centric One Stop
        Solution where coaches and athletes can unite in harmony.
        </div>
        <br />
        <div>
        Today CoachMate runs four offices around the world with the headquarters
        based in Melbourne.
        </div>
      </div>
      <br />
      <br />
      <div className={classes.details}>
        <h2 className={classes["details-title"]}>WE LOVE WHAT WE DO</h2>
        and we do our BEST to support our clients all the way. We are constantly
        improving our services and are proud to say that most of our new
        SimplyBook.me users come through referrals from existing clients. We
        look forward to having you, as one of our new users in the future!
      </div>
    </div>
  );
}

export default AboutUs;
