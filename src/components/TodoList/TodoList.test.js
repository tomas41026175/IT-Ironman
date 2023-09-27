import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoInput from "./index";
import React from "react";

test("應該使用輸入值來呼叫handleOnSubmit並清除輸入", () => {
//是否成功render
  const handleOnSubmit = jest.fn();
  render(<TodoInput handleOnSubmit={handleOnSubmit} />);

  //使用fireEvent模擬user操作事件
  //使用screen查詢 input元素
  fireEvent.change(screen.getByPlaceholderText("請輸入代辦事項"), {
    // target: { value: "Teo" }, //錯誤
    target: { value: "Test Todo" },
  });

  fireEvent.click(screen.getByText("送出"));

  //使用expect進行判斷handleOnSubmit是否調用，是否成功送出Test Todo
  //使用expect 檢查是否清空輸入框
  expect(handleOnSubmit).toHaveBeenCalledWith("Test Todo");

  expect(screen.getByPlaceholderText("請輸入代辦事項")).toHaveValue("");
});
