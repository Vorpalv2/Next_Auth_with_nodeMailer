"use client";
import axios from "axios";
import React, { useState } from "react";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function handleSign(event: any) {
    event?.preventDefault();
    const response = await axios.post("/api/users/login", user);
    console.log(response);
    try {
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>{isLoading ? "Processing" : " Login"}</h1>
      <form
        className="flex-col flex gap-4 bg-stone-800 p-10"
        // action={handleSignUp}
        onSubmit={handleSign}
      >
        <input
          className="rounded-xl p-2 bg-gray-400 placeholder-black text-black"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="text"
          name="email"
          placeholder="email"
        />
        <input
          className="rounded-xl p-2 bg-gray-400 placeholder-black text-black"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          name="password"
          placeholder="password"
        />
        <button className="rounded-xl p-2 bg-gray-400 text-black" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
