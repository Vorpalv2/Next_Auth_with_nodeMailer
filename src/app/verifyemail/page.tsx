"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);

  const token = searchParams.get("token") || "";
  console.log(token);

  console.log(typeof token);

  async function verifyUser() {
    try {
      await axios.post("/api/users/verifyEmail", token);
      setVerified(true);
    } catch (error: any) {
      console.log("error : ", error);
    }
  }

  verifyUser();

  return <div>VerifyPage</div>;
};

export default VerifyPage;
