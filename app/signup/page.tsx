"use client";

import MessagePop from "@/components/MessagePop";
import { SignUpDTO } from "@/contract/auth.dto";
import { Button } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [formData, setFormData] = useState<{
    userName: string;
    email: string;
    password: string;
  }>({ userName: "", email: "", password: "" });

  const formChangeHandler = (value: any, name: string) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const router = useRouter();

  const loginFunction = async (values: SignUpDTO) => {
    const response = await axios
      .post(`${process.env.BACKEND_URL}/auth/signup`, {
        userName: values.userName,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res.data);
        router.push("/login");
        router.refresh();
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw new Error();
      });
  };

  const onFinish = async (values: SignUpDTO, e?: any) => {
    e.preventDefault();
    toast.promise(loginFunction(values), {
      success: "Successfully created an account",
      loading: "Loading...",
      error: "Invalid input format",
    });
  };

  return (
    <div className="h-full grid place-items-center bg-blue-100 p-5">
      <MessagePop />
      <form
        name="Login form"
        style={{ maxWidth: 600 }}
        onSubmit={(e) => {
          onFinish(formData, e);
        }}
        autoComplete="on"
        className="form-container"
      >
        <h1 className="self-center font-bold text-2xl">Signup</h1>

        <label htmlFor="email" className="w-full input-container">
          <span>Username:</span>
          <input
            name="userName"
            placeholder=""
            required={true}
            type="text"
            onChange={(e) => formChangeHandler(e.target.value, e.target.name)}
            className="input-box"
            pattern="\w{3,16}"
          />
        </label>
        <label htmlFor="email" className="w-full input-container">
          <span>Email:</span>
          <input
            name="email"
            placeholder=""
            required={true}
            type="email"
            onChange={(e) => formChangeHandler(e.target.value, e.target.name)}
            className="input-box"
          />
        </label>

        <label htmlFor="password" className="w-full input-container">
          <span>Password:</span>
          <input
            name="password"
            placeholder=""
            required={true}
            type="password"
            onChange={(e) => formChangeHandler(e.target.value, e.target.name)}
            className="input-box"
          />
        </label>

        <Button type="primary" htmlType="submit" className="mt-5">
          Submit
        </Button>
        <Link href="/login" className="hover:underline">
          Login
        </Link>
      </form>
    </div>
  );
};

export default Page;
