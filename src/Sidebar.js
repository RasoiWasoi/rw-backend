// Sidebar.js
import React from "react";
import logo from "./logo_without_bg.png";
import { useState, useEffect } from "react";

const sidebarStyle = {
    // flex: 1,
  backgroundColor: "#f4f4f4",
  width: "250px",
  height: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  overflowY: "auto", // Allow vertical scrolling if the content exceeds the height
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  textAlign: "center", // Center align the content within the sidebar
};

const buttonStyle = {
  // width: "100%",
  display: "block",
  padding: "14px",
  border: "none",
  background: "none", // Remove background property
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold", // Make the font bold
  borderBottom: "1px solid #ccc", // Add border bottom
};

const logoContainerStyle = {
  marginBottom: "20px", // Add margin below logo
  borderBottom: "10px solid #ccc", // Add border line below the logo
  paddingBottom: "10px", // Adjust padding to separate logo from buttons
};

const logoStyle = {
  width: "150px", // Set width of the logo
  height: "150px", // Set height of the logo
  borderRadius: "50%", // Make the image round
};

const dropdownStyle = {
  backgroundColor: "#f4f4f4",
  width: "100%",
  padding: "10px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  //   display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxSizing: "border-box",
};

const selectStyle = {
  padding: "10px",
  width: "200px",
};

const Sidebar = ({ companyName = "Rasoi Wasoi", options, onSelectOption }) => {
  const [isDropdown, setIsDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDropdown(window.innerWidth <= 768);
    };

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Initial check for window size on component mount
    handleResize();

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={isDropdown ? dropdownStyle : sidebarStyle}>
      {isDropdown ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <img
              src={logo}
              alt="Company Logo"
              style={{
                width: "50px", // Set width of the logo
                height: "50px", // Set height of the logo
                borderRadius: "50%", // Make the image round
              }}
            />
          </div>

          <select
            style={selectStyle}
            onChange={(e) => onSelectOption(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <>
          <div style={logoContainerStyle}>
            <img src={logo} alt="Company Logo" style={logoStyle} />{" "}
          </div>

          <ul>
            {options.map((option, index) => (
              <button
                style={buttonStyle}
                onClick={() => onSelectOption(option)}
              >
                {option}
              </button>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
