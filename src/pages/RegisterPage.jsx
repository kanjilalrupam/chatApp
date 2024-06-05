import React, { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import "../index.css";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const { handleRegister } = useAuth();

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before attempting registration

    if (credentials.password1 !== credentials.password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await handleRegister(e, credentials);
    } catch (err) {
      setError("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="field--wrapper">
            <label>Name:</label>
            <input
              required
              type="text"
              name="name"
              value={credentials.name}
              placeholder="Enter your name..."
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Password:</label>
            <input
              required
              type="password"
              name="password1"
              placeholder="Enter a password..."
              value={credentials.password1}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <label>Confirm password:</label>
            <input
              required
              type="password"
              name="password2"
              placeholder="Confirm your password..."
              value={credentials.password2}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <input
              className="btn btn--lg btn--main"
              type="submit"
              value="Register"
            />
          </div>
        </form>

        <p>
          Already have an account? Login <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
