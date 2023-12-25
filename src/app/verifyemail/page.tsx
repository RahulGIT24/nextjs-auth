"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Email Verified");
    } catch (error: any) {
      setError(error);
      console.log(error);
      return;
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl p-2 bg-orange-500 text-black">Verify Email</h1>
      <h2>{token ? `${token}` : "No token"}</h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href={"/login"}>
            <p className="text-blue-500">Login</p>
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl">Error</h2>
        </div>
      )}
    </div>
  );
}
