"use client";
import React, { useState, memo } from "react";
import axios from "@/lib/axiosInstance";
import swal from "sweetalert";
import { useSession } from "next-auth/react";

const AppPasswordsInstructions = props => {
  const { data: session } = useSession();
  const [appPassword, setAppPassword] = useState("");

  const handleInputChange = event => {
    setAppPassword(event.target.value);
  };

  const addAppPassword = async () => {
    if (appPassword.length === 16) {
      try {
        const addPassword = await axios.patch("/gmail/app/password", {
          appPassword: appPassword,
          userEmail: session.user.email
        });
        if (addPassword.data) {
          setAppPassword("");
          swal("Added App Password Successfully", {
            icon: "success"
          });
        }
      } catch (error) {
        setAppPassword("");
        swal("Error", error.message, "error");
      }
    } else {
      swal("Error", "Please add 16 characters App Password", "error");
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const willAdd = await swal({
      title: "Are you sure?",
      text: "Once Added, Previous App Password will be deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willAdd => {
      if (willAdd) {
        addAppPassword();
      }
    });
  };

  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-900 p-4 rounded shadow-md">
      <div className="flex items-center">
        <div>
          <p className="font-bold">Important Instructions:</p>
          <p className="text-sm">
            To create an app password for Gmail, follow these steps:
          </p>
          <ol className="text-sm list-decimal pl-6 mt-2">
            <li>Go to your Google Account settings.</li>
            <li>Click on the &#34;Security&#34; tab.</li>
            <li>
              Under the &#34;Signing in to Google&#34; section, click on
              &#34;App Passwords&#34;.
            </li>
            <li>Enter your Google account password if prompted.</li>
            <li>
              Select the app and device where you want to use the app password.
            </li>
            <li>Follow the instructions to generate the app password.</li>
            <li>
              Use the generated app password when prompted to sign in to your
              Gmail account on the selected app or device.
            </li>
          </ol>
          <form onSubmit={handleSubmit} className="mt-4">
            <label htmlFor="appPassword" className="block mb-2 text-sm">
              Enter App Password:
            </label>
            <input
              type="password"
              id="appPassword"
              value={appPassword}
              onChange={handleInputChange}
              className="w-full px-2 py-1 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(AppPasswordsInstructions);
