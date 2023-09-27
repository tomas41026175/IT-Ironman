目前我們的 todo 也到了一個階段，接下來我們可以對我們的 component 進行一下測試，確保他的功能是正常的。
今天我們會使用 Jest 進行測試

首先我們需要先安裝 Jest

```
npm install --save-dev jest

```

接下來我們需要在`package.json`中的 script 加入下面這段 code

```
"test":"jest"
```

建立.babelrc 檔案
//.babelrc

```
{
    "presets": ["@babel/preset-env","@babel/preset-react"]
}
```

執行以下 code

```
yarn add --save-dev @babel/preset-env @babel/preset-react @babel/preset-typescript
```

- 若是使用 TS 才需要這段`@babel/preset-typescript`

由於我們使用的是 jsx 而不是 js，所以我們還需要加上這個檔案來幫助我們設定 jest。
//jest.config.js

```
const config = {
  testEnvironment: "jsdom", //默認使用dom 我們需要更改為jsdom
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
};

module.exports = config;

```

這樣我們才可以透過 npm 進行 test。

接下來建立一個 test 的檔案
//TodoList.test.js

```
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoInput from "./index";
import React from "react";

test("應該使用輸入的value使用handleOnSubmit並清除輸入", () => {

  const handleOnSubmit = jest.fn();
  render(<TodoInput handleOnSubmit={handleOnSubmit} />);

  fireEvent.change(screen.getByPlaceholderText("請輸入代辦事項"), {
    target: { value: "Teo" },
  });

  fireEvent.click(screen.getByText("送出"));

  expect(handleOnSubmit).toHaveBeenCalledWith("Test Todo");

  expect(screen.getByPlaceholderText("請輸入代辦事項")).toHaveValue("");
});

```

這個 test 元件做哪些事情。
首先我們要先確認是否成功 render，接下來使用 fireEvent 模擬 user 操作事件&使用 screen 查詢 input 元素，最後使用 expect 進行判斷 handleOnSubmit 是否有被使用，是否成功送出 Test Todo，使用 expect 檢查是否清空輸入框。

這時候我們就可以執行`yarn test`來開始測試了。

但是我們現在會看到 terminal 顯示以下通知

```
  × 應該使用輸入值來呼叫handleOnSubmit並清除輸入 (30 ms)

  ● 應該使用輸入值來呼叫handleOnSubmit並清除輸入

    expect(jest.fn()).toHaveBeenCalledWith(...expected)

    Expected: "Test Todo"
    Received: "Teo"

    Number of calls: 1

      19 |   //使用expect進行判斷handleOnSubmit是否調用，是否成功 送出Test Todo
      20 |   //使用expect 檢查是否清空輸入框
    > 21 |   expect(handleOnSubmit).toHaveBeenCalledWith("Test Todo");
         |                          ^
      22 |
      23 |   expect(screen.getByPlaceholderText("請輸入代辦事項")).toHaveValue("");
      24 | });

      at Object.toHaveBeenCalledWith (src/components/TodoList/TodoList.test.js:21:26)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.382 s
```

可以看到這個錯誤表示他應該要送出 Test Todo 這筆資料，但是 Test 抓到的資料卻是 Teo，所以沒通過測試。
至於為何要故意把這邊寫錯呢。

因為我們這邊使用 TDD(Test-Driven Development)的原則進行開發，那甚麼是 TDD 呢?

首先我們需要寫一個含有 error 的 test，這可以保證我們的 test 是有意義的(Red 階段)，接下來修正這些問題讓 test 可以成功進行(Green 階段)，最後我們將這段 code 進行重構(refactor 階段)，確保我們的 code 可以順利執行&更加整潔。

現在我們知道甚麼是TDD了，我們再回頭看一下為什麼要寫錯，除了紅色階段提到的理由之外，實務上一般來說也確實不會每次一寫test都會是合格。

- TDD & TEST