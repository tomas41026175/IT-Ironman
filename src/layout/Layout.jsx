import React from "react";

export const Layout = ({ title,children }) => {
  return (
    <>
      <div className="flex flex-col text-center justify-center items-center w-screen min-h-screen bg-[#a3d5dc] self-baseline py-10 px-4">
        <h1 className="text-7xl md:text-8xl text-[#f3efdd] italic font-bold mb-10">
          {title}
        </h1>
        {children}
      </div>
    </>
  );
};
