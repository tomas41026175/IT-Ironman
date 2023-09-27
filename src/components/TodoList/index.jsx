import React, { useState } from "react";

const TodoInput = ({ handleOnSubmit, children }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const result = inputValue;
    handleOnSubmit(result);
    setInputValue("");
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex self-center items-center justify-center w-full h-[50px] pl-4 pr-2">
      <input
        type="text"
        className="min-h-[53px] flex-1 max-w-[400px] rounded-md pl-4 shadow-md"
        placeholder="請輸入代辦事項"
        onChange={handleChange}
        value={inputValue}
      />
      <div
        className="self-center min-w-[80px] text-center rounded mx-2 border-2 px-4 py-1 cursor-pointer shadow-md transition-all bg-white hover:bg-[#e3e8eB] text-gray-500 text-xl font-bold"
        onClick={handleSubmit}
      >
        送出
      </div>
      {children}
    </div>
  );
};
export default TodoInput;
