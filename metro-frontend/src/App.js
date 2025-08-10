// import './App.css';
// import TicketList from './components/TicketList';
// import TicketForm from './components/TicketForm';
// function App() {
//   return (
//     <div className="App">
//       <h1>Metro Ticket Booking System</h1>
//       <TicketForm />
//        <hr />
//       <TicketList/>
//     </div>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import './App.css';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">Metro Ticket Booking</div>
          <ul className="nav-links">
            <li><Link to="/">Book Ticket</Link></li>
            <li><Link to="/tickets">All Tickets</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            <div style={{ paddingTop: "80px" }}>
              <h1>Book Your Ticket</h1>
              <TicketForm />
            </div>
          } />

          <Route path="/tickets" element={
            <div style={{ paddingTop: "80px" }}>
              <h1>All Booked Tickets</h1>
              <TicketList />
            </div>
          } />

          <Route path="/contact" element={
            <div style={{ paddingTop: "80px", textAlign: "center" }}>
              <h2>Contact Us</h2>
              <p>Email: support@metrobooking.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
