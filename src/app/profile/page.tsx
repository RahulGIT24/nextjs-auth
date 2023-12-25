"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const [data, setData] = useState("noting");
  const router = useRouter();
  const onLogOut = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      return;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  const userDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
      "
        onClick={onLogOut}
      >
        Logout
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded
      "
        onClick={userDetails}
      >
        Get User Details
      </button>
    </div>
  );
}
