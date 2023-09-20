import Link from "next/link";
import React from "react";

const LoginBtn = (link, value) => {
  return (
    <Link
      href={link}
      className="rounded mx-2 border-2 px-4 py-1 cursor-pointer transition-all hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold"
    >
      {value}
    </Link>
  );
};

export default LoginBtn;
