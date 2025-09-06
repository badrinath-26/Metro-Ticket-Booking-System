import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser({
        ...formData,
        age: parseInt(formData.age)
      });

      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ backgroundColor: 'white', maxWidth: '400px', margin: '100px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ marginBottom: '10px' }}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ marginBottom: '10px' }}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ marginBottom: '10px' }}
          />

          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            style={{ marginBottom: '10px' }}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ marginBottom: '10px' }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#4CAF50', color: 'white' }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Already have an account?{" "}
          <span 
            onClick={() => navigate('/login')} 
            style={{ color: '#4CAF50', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;