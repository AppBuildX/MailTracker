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
            <li>
              Open your Google Account settings page:{" "}
              <a href="https://myaccount.google.com/">
                https://myaccount.google.com/
              </a>.
            </li>
            <li>Sign in to your Gmail account if you haven&#39;t already.</li>
            <li>
              In the &#34;.Security&#34;. section, click on the &#34;.App
              Passwords&#34;. option. You may need to verify your identity by
              entering your password again.
            </li>
            <li>
              If you have 2-Step Verification enabled, you&#39;ll need to enter
              the verification code sent to your device.
            </li>
            <li>
              Scroll down to the &#34;.Select app&#34;. dropdown and choose
              &#34;.Mail&#34;. or &#34;.Other (Custom name)&#34;.if Mail is not
              available.
            </li>
            <li>Select your device or app from the second dropdown menu.</li>
            <li>Click on the &#34;.Generate&#34;. button.</li>
            <li>
              Google will generate a unique app password for the selected
              app/device.
            </li>
            <li>Copy the generated app password and use it in this website.</li>
          </ol>
          <form onSubmit={handleSubmit} className="mt-4">
            <label htmlFor="appPassword" className="block mb-2 text-sm">
              Enter App Password:
            </label>
            <input
              type="password"
              id="appPassword"
              placeholder="generated app password"
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
