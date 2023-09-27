這時候考慮到後續的需求擴充，我們可以引入 Redux 對我們的資料進行集中管理。
這邊先簡單介紹一下 Redux，這是一個狀態管理工具，雖然常用於 React，但使用場景不限於 React，其中主要會有幾種資料，

- store
  - 我們會將資料集中存在這個 store 之中
- action
  - 用來描述一個事件，我們需要透過 action 來判斷是否改變目標的狀態。
  - 每個 action 都會有`type`屬性，用來描述事件。
- Dispatch
  - 也會是一個 function，用來發送 action，當我們使用 dispatch 發送 action 之後，會開始執行相對應的 reducer 來改變 store 的狀態。
- Reducer
  - 會是一個 function，當我們接收到 action，並且需要改變狀態的時候，就會透過 function 返回一個新的狀態，而不是對原本的狀態進行修改。

經過上面的介紹之後，我們可以知道Redux的流程就會是
觸發Action => Reducer開始執行 => 獲得新的State => 更新store

接下來我們就可以開始為我們的專案加上Redux了。

首先先透過這段code安裝redux
```
yarn add react-redux

yarn add @reduxjs/toolkit
```
然後我們需要建立一個redux資料夾，其中包含一個store.js的檔案 & slices的資料夾，Slice我們可以將他理解為其中一組資料，我們可以透過slice將不同的資料做區分。

接下來我們就可以開始寫我們的todoSlice了。

首先我們需要引入```createSlice```這個method。
```
import { createSlice } from "@reduxjs/toolkit";
```
接下來我們開始寫這個slice的本體

```
const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {

  },
});
```
這邊可以看到，我們的這個slice的名稱是```todo```，並且初始狀態會是一個空array，最後在reducers的部分，我們會將前面寫過的邏輯加進去。