"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);

  const onLogin = async () => {
    try {
      setDisabled(true);
      await axios.post("/api/users/login", {
        email: user.email,
        password: user.password,
      });
      toast.success("Successfully Logged In");
      router.push("/profile");
      return;
    } catch (e) {
      console.log(e);
      return;
    } finally {
      setDisabled(true);
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
        onClick={onLogin}
      >
        Login Here
      </button>
      <Link href={"/signup"}>Visit SignUp Page</Link>
    </div>
  );
}
