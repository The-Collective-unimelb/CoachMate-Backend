import { Link } from "react-router-dom";
import classes from "./AthleteBooking.module.css";


function CoachBookings() {

  const [bookings, setBookings] = useState([]);

  const getData = () => {
    axios
      .get("/bookings")
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setBookings(data);
        console.log(data);
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!");
      });
  };

  

  const displayPendingData = () => {
    if (bookings.length < 0) return null;
    bookings.map((booking) => {
      if (booking.status === "Pending") {
      return (
          <div className={classes["history-row"]}>
              <div>{booking.session}</div>
              {booking.trainees.map((athlete)=>{
                <div>{athlete.firstName} {athlete.lastName}
                </div>
              })
              }
              <div>{booking.sessionType}</div>
              <div className={classes["data-status"]}>
                <button> Accept</button>
                <button> Cancel</button>
              </div>
            </div>
      )
      }}

      )
      }
  
      const displayBookedData = () => {
        if (bookings.length < 0) return null;
        bookings.map((booking) => {
          if (booking.status === "Booked") {
          return (
              <div className={classes["history-row"]}>
                  <div>{booking.session}</div>
                  {booking.trainees.map((athlete)=>{
                    <div>{athlete.firstName} {athlete.lastName}
                    </div>
                  })
                  }
                  <div>{booking.sessionType}</div>
                  <div className={classes["data-status"]}>
                    <button> Cancel</button>
                  </div>
                </div>
          )
          }}
    
          )
          }
          const displayPastData = () => {
            if (bookings.length < 0) return null;
            bookings.map((booking) => {
              if (booking.status === "Completed" || booking.status === "Cancelled"){ 
              return (
                  <div className={classes["history-row"]}>
                      <div>{booking.session}</div>
                      {booking.trainees.map((athlete)=>{
                        <div>{athlete.firstName} {athlete.lastName}
                        </div>
                      })
                      }
                      <div>{booking.sessionType}</div>
                    </div>
              )
              }}
        
              )
              }    
  return (
    <div className={classes["vertical-flex"]}>
      <div className={classes.topbar}>
        <Link to="/coach-dashboard" className={classes["topbar-text"]}>
          DASHBOARD
        </Link>
        <div>&nbsp; {">"} &nbsp;</div>
        <Link to="#" className={classes["topbar-text"]}>
          BOOKING HISTORY
        </Link>
      </div>
      <div className={classes["history-header"]}>
        <div>DATE</div>
        <div>|</div>
        <div>TIME</div>
        <div>|</div>
        <div>ATHLETE</div>
        <div>|</div>
        <div>SESSION TYPE</div>
        <div>|</div>
        <div>STATUS</div>
      </div>

      <h1>NEW</h1>
      <div>{displayPendingData()}</div>
      
      <h1>UPCOMING</h1>
      
      <div>{displayBookedData()}</div>
      

      <h1>PAST</h1>
      
      <div>{displayPastData()}</div>
    </div>
  );
}

export default CoachBookings;
