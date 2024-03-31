// Table.js
import React from "react";

const fixedColumns = [
  "Name",
  "Month",
  "Subscription",
  "Veg/NonVeg",
  "Roti/Roti-Rice",
  "Days",
  "Whatsapp Mobile",
  "Location",
  "Paid",
  "Special-Request",
  "Lunch/Dinner",
];

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const records = data;

  return (
    <div
      style={{
        marginTop: "20px",
        overflowX: "auto",
        marginLeft: "20px",
        marginRight: "20px",
      }}
    >
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {fixedColumns.map((column, index) => (
              <th key={index} style={tableHeaderStyle}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              {fixedColumns.map((column, columnIndex) => (
                <td key={columnIndex} style={tableCellStyle}>
                  {record.fields[column] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default Table;
