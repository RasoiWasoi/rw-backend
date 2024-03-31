import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Verify the entered credentials against environment variables
    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      // Call the onLogin function passed as props
      onLogin();
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </label>
        <br />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "20px",
};

const inputStyle = {
  padding: "10px",
  marginBottom: "10px",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#891652", // Blue color
  color: "#fff", // White text color
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default LoginPage;
