"use client";
import { useState, memo, useMemo } from "react";
import { htmlToText } from "html-to-text";

const EmailCard = ({
  from,
  to,
  date,
  subject,
  message,
  lastSeen,
  openCount,
  isOpen
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const textMessage = useMemo(() => htmlToText(message), [message]);

  return (
    <div className="bg-white m-4 shadow-md rounded-lg p-4">
      <div className="flex items-center mb-4">
        <span className="text-gray-600 mr-2">From:</span>
        <span className="font-semibold">
          {from}
        </span>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-gray-600 mr-2">To:</span>
        <span className="font-semibold">
          {to}
        </span>
      </div>
      <div className="flex items-center mb-4">
        <span className="text-gray-600 mr-2">Date:</span>
        <span className="font-semibold">
          {new Date(date).toLocaleString()}
        </span>
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {expanded ? "Hide Details" : "Show Details"}
      </button>
      {expanded &&
        <div className="border-t border-gray-300 pt-4 mt-4">
          <div className="flex items-center mb-2">
            <span className="text-gray-600 mr-2">Last Seen:</span>
            <span>
              {lastSeen
                ? new Date(lastSeen).toLocaleString()
                : "Mail not open!"}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-600 mr-2">Open Count:</span>
            <span>
              {openCount}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-600 mr-2">Is Open:</span>
            <span>
              {isOpen ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-gray-600 mr-2">Subject:</span>
            <span className="font-semibold">
              {subject}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 mr-2">Message:</span>
            <div
              dangerouslySetInnerHTML={{ __html: message }}
              className="text-gray-600"
            />
          </div>
        </div>}
    </div>
  );
};

export default memo(EmailCard);
