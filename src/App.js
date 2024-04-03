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
import { useEffect } from "react";
import FeedbackFormOneTime from "./FeedbackFormOneTime";

// const timeZone = { timeZone: "Asia/Kolkata" };

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("Get Daily Orders");
  const [selectedShowOrderTypeOption, setSelectedShowOrderTypeOption] =
    useState("All");
  const [tableData, setTableData] = useState([]);
  const [oneTimeTableData, setOneTimeTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const [tableWidth, setTableWidth] = useState("60%");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSelectedShowOrderTypeOption = (event) => {
    setSelectedShowOrderTypeOption(event.target.value);
  };

  // const getYYYYMMDDFormat = (month, day, year) => {
  //   const monthString = month < 10 ? `0${month}` : `${month}`;
  //   const dayString = day < 10 ? `0${day}` : `${day}`;
  //   const yearString = `${year}`;
  //   return `${yearString}-${monthString}-${dayString}`;
  // };

  useEffect(() => {
    const handleResize = () => {
      // Adjust table width based on screen size
      if (window.innerWidth <= 768) {
        setTableWidth("100%");
      } else {
        setTableWidth("60%");
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize on component mount to set initial table width
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

      const oneTimeResponse = await axios.get(
        "https://api.airtable.com/v0/appdxgViWfvCf8qq8/tblUjWgud6SPD95B8",
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
      setOneTimeTableData(filterOneTimeData(oneTimeResponse.data.records));
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
        const skipLunchOrDinner = skip.fields["Lunch/Dinner"].some((meal) =>
          record.fields["Lunch/Dinner"].includes(meal)
        );

        return (
          skip.fields.Date ===
            selectedDate.toLocaleDateString().split("/").reverse().join("-") &&
          skipLunchOrDinner &&
          // skip.fields.Name === record.fields.Name
          skip.fields.Name.includes(record.fields.Name)
        );
      });

      const conditionSelectedShowOrderTypeOption = () => {
        if (selectedShowOrderTypeOption === "All") {
          return true;
        } else {
          return record.fields["Lunch/Dinner"].includes(
            selectedShowOrderTypeOption
          );
        }
      };

      // Check if Month matches current month and Days includes today's day
      return (
        record.fields.Month ===
          currentDate.toLocaleString("default", { month: "long" }) &&
        record.fields.Days.includes(getDayName(currentDay)) &&
        !skipMatches &&
        conditionSelectedShowOrderTypeOption()
      );
    });
  };

  const filterOneTimeData = (records) => {
    return records.filter((record) => {
      const conditionSelectedShowOrderTypeOption = () => {
        if (selectedShowOrderTypeOption === "All") {
          return true;
        } else {
          return record.fields["Lunch/Dinner"].includes(
            selectedShowOrderTypeOption
          );
        }
      };

      // Check if Month matches current month and Days includes today's day
      return (
        record.fields.Date ===
          selectedDate.toLocaleDateString().split("/").reverse().join("-") &&
        conditionSelectedShowOrderTypeOption()
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
      "Thrusday",
      "Friday",
      "Saturday",
    ];
    return days[dayIndex];
  };

  const handleOptionSelection = async (selectedOption) => {
    if (selectedOption !== "Choose Option") {
      setSelectedOption(selectedOption);
    }
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
              "Choose Option",
              "Add Subscriptions",
              // "Add Order History",
              "Add Skips",
              "Add One Time",
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
            {selectedOption === "Add One Time" && <FeedbackFormOneTime />}
            {selectedOption === "Get Daily Orders" && (
              <>
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <h2 style={{ color: "#891652" }}>Order Details</h2>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    style={{ borderRadius: "10px", padding: "10px" }}
                  />
                  <select
                    value={selectedShowOrderTypeOption}
                    onChange={handleSelectedShowOrderTypeOption}
                    style={{
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    <option value="All">All</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>

                  <button onClick={handleShowTable}>Show Orders</button>
                </div>

                {showTable && (
                  <div
                    style={{
                      width: tableWidth,
                      overflowX: "auto",
                      margin: "0 auto",
                    }}
                  >
                    <Table data={tableData} tableName={"Subscriptions"} />
                  </div>
                )}

                {showTable && (
                  <div
                    style={{
                      width: tableWidth,
                      overflowX: "auto",
                      margin: "0 auto",
                    }}
                  >
                    <Table data={oneTimeTableData} tableName={"One Time"} />
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
