"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onSignUp = async () => {
    try {
      setButtonDisabled(true);
      const res = await axios.post("/api/users/signup", {
        userName: user.userName,
        email: user.email,
        password: user.password,
      });
      toast.success("Account Created!");
      router.push("/login");
      return;
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
      return;
    } finally {
      setButtonDisabled(false);
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Sign Up</h1>
      <hr />
      <label htmlFor="username">User Name</label>
      <input
        className="p-2 border text-black border-gray-300 rounded-lg mb-4 focus-outline-none focus:border-gray-600"
        type="text"
        id="username"
        onChange={(e) => {
          setUser({
            ...user,
            userName: e.target.value,
          });
        }}
        placeholder="Enter username"
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 text-black rounded-lg mb-4 focus-outline-none focus:border-gray-600"
        type="email"
        id="email"
        onChange={(e) => {
          setUser({
            ...user,
            email: e.target.value,
          });
        }}
        placeholder="Enter email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:border-gray-600 text-black"
        type="password"
        id="password"
        onChange={(e) => {
          setUser({
            ...user,
            password: e.target.value,
          });
        }}
        placeholder="Enter Password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus-outline-none focus:border-gray-600 text-white"
        onClick={onSignUp}
      >
        SignUp Here
      </button>
      <Link href={"/login"}>Visit Login Page</Link>
    </div>
  );
}
