"use client";

import { deleteCookie } from "cookies-next";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import React from "react";
import Profile from "./Profile";

const Page = () => {
  // const router = useRouter();

  return (
    <>
      <Profile />
      <button
        onClick={() => {
          deleteCookie("passcode");
          // router.push("/login");
          // router.refresh();
        }}
      >
        Go back to login page
      </button>
    </>
  );
};

export default Page;
