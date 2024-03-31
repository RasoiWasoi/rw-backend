// FeedbackForm.js
import React, { useRef, useEffect } from "react";

const FeedbackFormHistory = () => {
  return (
    <div>
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/appdxgViWfvCf8qq8/pagN3F3OSV4uvAK27/form"
        title="Feedback Form"
        width="100%"
        frameBorder="0"
        style={{
          background: "transparent",
          border: "1px solid #ccc",
          height: "100vh",
        }}
      ></iframe>
    </div>
  );
};

export default FeedbackFormHistory;
