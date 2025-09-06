import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import HeroSection from "./components/HeroSection";
import { getToken, clearToken, isLoggedIn, getUserRole } from "./utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    if (isLoggedIn()) {
      setUserRole(getUserRole());
    }
  }, []);

  const handleLogout = () => {
    clearToken();
    setLoggedIn(false);
    setUserRole(null);
  };

  const handleLogin = (role) => {
    setLoggedIn(true);
    setUserRole(role);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">Metro Ticket Booking</div>
          <ul className="nav-links">
            {loggedIn && userRole === 'ROLE_USER' && (
              <li><Link to="/dashboard">Dashboard</Link></li>
            )}
            {loggedIn && userRole === 'ROLE_ADMIN' && (
              <li><Link to="/admin">Admin Panel</Link></li>
            )}
            {!loggedIn && (
              <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Sign In</Link></li>
              </>
            )}
            {loggedIn && (
              <li>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </li>
            )}
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {loggedIn && userRole === 'ROLE_USER' && (
            <Route path="/dashboard" element={<Dashboard />} />
          )}
          {loggedIn && userRole === 'ROLE_ADMIN' && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
          <Route 
            path="/" 
            element={
              loggedIn ? (
                userRole === 'ROLE_ADMIN' ? <AdminDashboard /> : <Dashboard />
              ) : (
                <HeroSection />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
