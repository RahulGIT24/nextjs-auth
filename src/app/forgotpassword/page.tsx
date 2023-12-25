"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const sendLink = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
      toast.success("Email send successfully");
      return;
    } catch (e) {
      toast.success("Can't send Email");
      console.log(e);
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Login</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 text-black rounded-lg mb-4 focus-outline-none focus:border-gray-600"
        type="email"
        id="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter email"
      />
      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:border-gray-600 text-white" onClick={sendLink}>
        Send Password Reset Link
      </button>
    </div>
  );
}
