"use client";
import { signIn } from "next-auth/react";

export const GetStarted = () => {
  return (
    <button
      onClick={() => signIn("google")}
      className="inline-block px-12 py-3 mt-8 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
    >
      Get Started
    </button>
  );
};
