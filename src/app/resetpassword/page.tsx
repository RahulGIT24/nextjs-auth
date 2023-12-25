"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async () => {
    if (confirmPassword !== password) return;
    try {
      const res = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      router.push("/login");
      return res;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Reset Your Password</h1>
      <hr />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Create new password"
      />
      <label htmlFor="password">Confirm Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:border-gray-600 text-black"
        type="password"
        id="cpassword"
        placeholder="Confirm password"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:border-gray-600 text-white"
        onClick={onSubmit}
      >
        Reset Password
      </button>
    </div>
  );
}
