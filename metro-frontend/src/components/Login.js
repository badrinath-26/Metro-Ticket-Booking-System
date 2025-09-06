import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Services/api";
import { setToken, setUserRole } from "../utils/auth";
import {jwtDecode} from "jwt-decode";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;

      if (token) {
        setToken(token);
        
        // Determine user role by checking email or making another API call
        const role = email.includes('admin') ? 'ROLE_ADMIN' : 'ROLE_USER';
        setUserRole(role);
        
        if (onLogin) onLogin(role);
        
        alert("Login successful!");
        
        // Navigate based on role
        if (role === 'ROLE_ADMIN') {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ backgroundColor: 'white', maxWidth: '400px', margin: '100px auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: '10px' }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: '10px' }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#4CAF50', color: 'white' }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px' }}>
          Don't have an account?{" "}
          <span 
            onClick={() => navigate('/signup')} 
            style={{ color: '#4CAF50', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;