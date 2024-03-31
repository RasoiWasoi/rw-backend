// App.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import FeedbackFormSubscriptions from "./FeedbackFormSubscriptions";
import FeedbackFormHistory from "./FeedbackFormHistory";
import axios from "axios";
import Table from "./Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FeedbackFormSkips from "./FeedbackFormSkips";
import LoginPage from "./LoginPage";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("Get Daily Orders");
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const fetchData = async () => {
    try {
      const skipsResponse = await axios.get(
        "https://api.airtable.com/v0/appdxgViWfvCf8qq8/tbl6zNrp3xGOQ1rkD",
        {
          headers: {
            Authorization:
              "Bearer patwBa9X03vyo4aHj.efbe6aa9e86c235a23cb6ee9979f85c221a52b99df186141c3ac812e22925ab8",
          },
        }
      );

      const response = await axios.get(
        "https://api.airtable.com/v0/appdxgViWfvCf8qq8/tbl5UA31oW39y4Bv6",
        {
          headers: {
            Authorization:
              "Bearer patwBa9X03vyo4aHj.efbe6aa9e86c235a23cb6ee9979f85c221a52b99df186141c3ac812e22925ab8",
          },
        }
      );

      // Filter records based on current month and today's day
      const filteredData = filterData(
        response.data.records,
        skipsResponse.data.records
      );

      setTableData(filteredData);
      setShowTable(true); // Show table when data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to filter data based on current month and today's day
  const filterData = (records, skipsRecords) => {
    const currentDate = selectedDate;
    const currentDay = currentDate.getDay(); // Day of the week (0 for Sunday, 1 for Monday, etc.)

    return records.filter((record) => {
      // Check if there are any skip records that match the subscription
      const skipMatches = skipsRecords.some((skip) => {
        return (
          skip.fields.Date === new Date().toISOString().slice(0, 10) &&
          skip.fields["Lunch/Dinner"] === record.fields["Lunch/Dinner"] &&
          skip.fields.Name === record.fields.Name
        );
      });

      // Check if Month matches current month and Days includes today's day
      return (
        record.fields.Month ===
          currentDate.toLocaleString("default", { month: "long" }) &&
        record.fields.Days.includes(getDayName(currentDay)) &&
        !skipMatches
      );
    });
  };

  // Function to get day name based on day index (0 for Sunday, 1 for Monday, etc.)
  const getDayName = (dayIndex) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayIndex];
  };

  const handleOptionSelection = async (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleShowTable = () => {
    fetchData();
  };

  return (
    <div>
      {isLoggedIn ? (
        <div
          className="app-container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Sidebar
            options={[
              "Add Subscriptions",
              "Add Order History",
              "Add Skips",
              "Get Daily Orders",
            ]}
            onSelectOption={handleOptionSelection}
          />

          <div className="main-content" style={{ flex: 1, overflowX: "auto" }}>
            {selectedOption === "Add Subscriptions" && (
              <FeedbackFormSubscriptions />
            )}
            {selectedOption === "Add Order History" && <FeedbackFormHistory />}
            {selectedOption === "Add Skips" && <FeedbackFormSkips />}
            {selectedOption === "Get Daily Orders" && (
              <>
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <h2 style={{ color: "#891652" }}>Order Details</h2>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                  />
                  <button onClick={handleShowTable}>Show Orders</button>
                </div>

                {showTable && (
                  <div
                    style={{
                      width: "60%",
                      overflowX: "auto",
                      margin: "0 auto",
                    }}
                  >
                    <Table data={tableData} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
