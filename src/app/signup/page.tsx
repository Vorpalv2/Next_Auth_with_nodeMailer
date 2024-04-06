"use client";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { handleSignUp } from "@/actions/users.actions";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setIsDisabled(false);
    }
  }, [user]);

  async function handleSign(e: any) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);

      console.log("hello");
      router.push("/login");
      // redirect("/login");
      setIsLoading(false);
    } catch (error: any) {
      console.log("error : ", error.message);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>{isLoading ? "Processing" : " Signup"}</h1>
      <form
        className="flex-col flex gap-4 bg-stone-800 p-10"
        // action={handleSignUp}
        onSubmit={handleSign}
      >
        <input
          className="rounded-xl p-2 bg-gray-400 placeholder-black text-black"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          type="text"
          name="username"
          placeholder="username"
        />
        <input
          className="rounded-xl p-2 bg-gray-400 placeholder-black text-black"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          type="password"
          name="password"
          placeholder="password"
        />
        <input
          className="rounded-xl p-2 bg-gray-400 placeholder-black text-black"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          type="email"
          name="email"
          placeholder="email"
        />
        <button
          type="submit"
          className={isDisabled ? " disabled:bg-gray-700" : ""}
          // onClick={handleSignUp}
        >
          {isDisabled ? "Fill" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
