// FeedbackForm.js
import React, { useRef, useEffect } from "react";

const FeedbackFormSubscriptions = () => {
  return (
    <div>
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/appdxgViWfvCf8qq8/pagrmFouzgroW7OZc/form"
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

export default FeedbackFormSubscriptions;
