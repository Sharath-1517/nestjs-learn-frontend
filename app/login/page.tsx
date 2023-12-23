"use client";

import React, { useState } from "react";
import { Button } from "antd";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axios from "axios";
import MessagePop from "@/components/MessagePop";
import { LoginDTO } from "@/contract/auth.dto";
import Link from "next/link";

const Page = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );

  const formChangeHandler = (value: any, name: string) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const router = useRouter();

  const loginFunction = async (values: LoginDTO) => {
    const response = await axios
      .post(`${process.env.BACKEND_URL}/auth/login`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        const { jwt_access_token } = res.data;
        if (jwt_access_token) {
          setCookie("passcode", jwt_access_token, {
            maxAge: 60 * 60 * 1,
          });
          router.push("/profile");
          router.refresh();
        }
      })
      .catch((err) => {
        throw new Error();
      });
  };

  const onFinish = async (values: LoginDTO, e?: any) => {
    e.preventDefault();
    toast.promise(loginFunction(values), {
      success: "Successfully logged in",
      loading: "",
      error: "Invalid credentials",
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
        <h1 className="self-center font-bold text-2xl">Login</h1>

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
        <Link href="/signup" className="hover:underline">
          Signup
        </Link>
      </form>
    </div>
  );
};

export default Page;
