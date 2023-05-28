"use client";
import React, { useState, memo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSession } from "next-auth/react";
import axios from "@/lib/axiosInstance";
import swal from "sweetalert";
import { v4 as uuidv4 } from "uuid";

const FloatingActionButton = props => {
  const { data: session } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const { to, subject, message } = formData;

    if (to && subject && message) {
      try {
        setIsLoading(true);
        const uniqueId = uuidv4();
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/track-email/${session
          .user.email}/${uniqueId}`;
        const trackingMessage =
          message +
          `<img src=${apiUrl} width="1" height="1" style="display: none;">`;
        const sendMail = await axios.post("/send-email", {
          _id: uniqueId,
          sender: session.user.email,
          recipient: to,
          subject: subject,
          content: trackingMessage
        });
        const { error, sent } = sendMail.data;
        if (sent) {
          props.onRefresh();
          setIsLoading(false);
          setFormData({
            to: "",
            subject: "",
            message: ""
          });
          setIsFormOpen(false);
          swal("Successfully Sent", {
            icon: "success"
          });
        }
        if (error) {
          setIsLoading(false);
          setIsFormOpen(false);
          if (
            error.includes("Invalid login") ||
            error.includes('Missing credentials for "PLAIN"')
          ) {
            swal("Error", "Please use the correct app password", "error");
          } else {
            swal("Error", error, "error");
          }
        }
      } catch (error) {
        setIsLoading(false);
        setIsFormOpen(false);
        swal("Error", error.message, "error");
      }
    } else {
      swal("Error", "Please filled all fields", "error");
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleQuillChange = value => {
    setFormData(prevFormData => ({
      ...prevFormData,
      message: value
    }));
  };

  return (
    <div className="fixed bottom-28 right-10 z-10">
      <div
        className={`relative ${isFormOpen ? "w-80" : "w-12"} transition-all`}
      >
        {isFormOpen &&
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 shadow-md rounded"
          >
            <div className="mb-4">
              <label htmlFor="to" className="block mb-1">
                To:
              </label>
              <input
                type="text"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block mb-1">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-1">
                Message:
              </label>
              <ReactQuill
                value={formData.message}
                onChange={handleQuillChange}
                className="border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading
                ? "opacity-50 cursor-not-allowed"
                : ""}`}
              disabled={isLoading}
            >
              {isLoading
                ? <svg
                    className="animate-spin"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="#fff" fill-opacity=".01" d="M0 0h48v48H0z" />
                    <path
                      d="M4 24c0 11.046 8.954 20 20 20v0c11.046 0 20-8.954 20-20S35.046 4 24 4"
                      stroke="#000"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M36 24c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12v0"
                      stroke="#000"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                : "Submit"}
            </button>
          </form>}
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md absolute bottom-0 right-0 transform translate-x-4 translate-y-4 transition-all"
        >
          <span
            className={`transform text-2xl ${isFormOpen
              ? "rotate-45"
              : "rotate-0"}`}
          >
            +
          </span>
        </button>
      </div>
    </div>
  );
};

export default memo(FloatingActionButton);
