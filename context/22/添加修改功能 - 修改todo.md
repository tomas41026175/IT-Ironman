上一篇進行到透過 useModal 建立彈窗 & 按鍵點擊的時候顯示彈窗。
接下來我們需要在彈窗顯示的時候，帶入所點擊的 todo 資料

```js
const handleEditBtnClick = (item) => {
  setModalTodo((prev) => item);
  newTodo.current = { ...item };
  show();
};
```

我們先建立一個用於儲存顯示於 modal 中資料的 state，並且在顯示彈窗前將目標 todo 放進這個 state 中，在彈窗出現的時候顯示資料。

接下來我們需要儲存 user 再輸入欄位做的變更，這邊我們不使用 useState，因為 useState 會在每次觸發的時候產生 re-render，我們不希望再儲存資料的時候畫面一直 re-render 導致使用者體驗下降，所以這邊可以使用 useRef 來儲存這個資料，useRef 可以讓我們保存的 value 在整個生命週期中保持不變。

```js
const newTodo = useRef({});
```

這邊我們使用 useRef 保存一個物件，後續我們需要變更這個 ref 的時候就需要使用

```js
newTodo.current = { ...todo };
```

使用以上的方式可以變更 ref 中的 value。
現在將這個方法綁定至 onChange 中

```js
onChange={(e) => {
    e.preventDefault();
    newTodo.current.title = e.target.value;
}}
```

現在 user 在使用彈窗的同時，我們就可以在背後保存 user 所做的變更。
最後，我們需要在 user 送出保存的時候更新 todo & 關閉視窗，並重置modalTodo & 保存在ref中的資料。

```js
const updateTodoItem = (item) => {
  dispatch(updateTodo(item));
  newTodo.current = {};
  setModalTodo({});
  hide();
};
```
