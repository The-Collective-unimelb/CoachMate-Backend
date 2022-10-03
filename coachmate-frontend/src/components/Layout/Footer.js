import classes from "./Footer.module.css"
import coachmateSquare from "../../assets/CoachmateSquare.png";

function Footer() {
    return <div className={classes.footer}>
        <div className={classes.div1}>
            <a href='/' className={classes.h1}>HOME</a>
            <a href='/about-us' className={classes.h1}>ABOUT US</a>
            <a href='/contact' className={classes.h1}>CONTACT</a>
        </div>
        <div className={classes.div2}>
            <div className={classes.div3}>
                <div className={classes.h1}>&copy; 2022 COACHMATE</div>
                <div className={classes.h1}>&nbsp; | &nbsp;</div>
                <a href='/' className={classes.h1}>TERMS &amp; CONDITIONS</a>
                <div className={classes.h1}>&nbsp; | &nbsp;</div>
                <a href='/' className={classes.h1}>PRIVACY POLICY</a>
                <div className={classes.h1}>&nbsp; | &nbsp;</div>
                <a href='/' className={classes.h1}>COOKIE POLICY</a>
            </div>
        </div>
        <div className={classes.div4}>
            <img className={classes["coachmate-square-logo"]} src={coachmateSquare}></img>
        </div>
    </div>
}

export default Footer;