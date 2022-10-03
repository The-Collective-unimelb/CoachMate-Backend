import { Routes, Route } from "react-router-dom";

import NoPage from "./components/pages/NoPage";
import Welcome from "./components/pages/Welcome";
import Footer from "./components/Layout/Footer.js";
import Header from "./components/Layout/Header";
import CoachesList from "./components/pages/CoachesList";
import CoachProfile from "./components/pages/CoachProfile";
import EditProfile from "./components/pages/EditProfile";
import LoginForm from "./components/pages/Login";
import SignUpForm from "./components/pages/SignUp";
import CoachDashboard from "./components/pages/CoachDashboard";
import CoachSchedule from "./components/pages/CoachSchedule";
import SessionPicker from "./components/Booking/SessionPicker";
import AthleteBooking from "./components/Booking/AthleteBooking";
import BookingSuccess from "./components/pages/BookingSuccess";
import CoachBookings from "./components/Booking/CoachBookings"
import AboutUs from "./components/pages/AboutUs";
import Contact from "./components/pages/Contact"
import TestDB from "./components/pages/TestDB";

function App() {
  return (
    <div>
      {/** header and content: viewport height minus footer height */}
      <div style={{ minHeight: "calc(100vh - 150px)" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/coach-profile" element={<CoachProfile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/coach-dashboard" element={<CoachDashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/coaches" element={<CoachesList />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/schedule" element={<CoachSchedule />} />
          <Route path="/session-picker" element={<SessionPicker />} />
          <Route path="/athlete-booking" element={<AthleteBooking />} />
          <Route path="/coach-booking" element={<CoachBookings />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/test-db" element={<TestDB />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
