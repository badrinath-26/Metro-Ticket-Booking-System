import React from 'react';
import './HeroSection.css';
import metroImage from './images/metro_img.jpg'; 

function HeroSection() {
  const backgroundStyle = {
    backgroundImage: `url(${metroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  };

  return (
  <main style={backgroundStyle}>
    <section className="hero-overlay" role="region" aria-label="MetroConnect Hero Section">
      <h1 className="hero-title">MetroConnect</h1>
      <p className="hero-tagline">Book your ride in seconds. Travel smart, travel safe.</p>
      <nav className="hero-buttons">
        <button className="hero-btn signup" aria-label="Sign Up for MetroConnect" onClick={() => window.location.href = "/signup"}>Sign Up</button>
        <button className="hero-btn signin" aria-label="Sign In to MetroConnect" onClick={() => window.location.href = "/login"}>Sign In</button>
      </nav>
    </section>
  </main>
);

}

export default HeroSection;
