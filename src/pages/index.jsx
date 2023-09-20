import React from "react";
import { Layout } from "@/layout/Layout";
import Link from "next/link";
import LoginBtn from "@/components/LoginBtn";

const index = () => {
  return (
    <Layout>
      <form className="py-10 px-16 bg-white rounded-xl shadow-md">
        <div className="mb-12">
          <div className="my-8">
            <label className="text-2xl italic font-bold text-gray-500">
              帳號：
            </label>
            <input
              type="text"
              className="w-[350px] py-2 border-2 rounded-md focus-visible:outline-none pl-4 text-gray-500"
            />
          </div>
          <div className="my-8">
            <label className="text-2xl italic font-bold text-gray-500">
              密碼：
            </label>
            <input
              type="password"
              className="w-[350px] py-2 border-2 rounded-md focus-visible:outline-none pl-4 text-gray-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href={"/Home"}
            className="rounded mx-2 border-2 px-4 py-1 cursor-pointer transition-all hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold"
          >
            登入
          </Link>
          <Link
            href={"/"}
            className="rounded mx-2 border-2 px-4 py-1 cursor-pointer transition-all hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold"
          >
            註冊
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default index;
