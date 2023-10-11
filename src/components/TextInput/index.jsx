import React, { forwardRef } from "react";

// react hook form 的register會傳入ref，所以要用forwardRef包裝一下
const TextInput = forwardRef(
  (
    { label, error, type, placeholder, InputOnChange = () => {}, ...props },
    ref
  ) => {
    return (
      <div className="my-8 w-full flex flex-col md:flex-row">
        <label className="w-[30%] min-w-[100px] text-2xl italic font-bold text-gray-500">
          {label}：
        </label>
        <div className="flex-1">
          <input
            ref={ref}
            type={type}
            className="w-full py-2 border-2 rounded-md focus-visible:outline-none pl-4 text-gray-500"
            placeholder={placeholder}
            {...props}
          />
          {error && <p className="text-sm text-red-400">{error.message}</p>}
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
