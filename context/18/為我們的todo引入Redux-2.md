目前我們的 todoSlice 會是長這樣的

```
const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {

  },
});
```

接下來我們可以想一下在這之前我們寫過了甚麼。
我們有添加 Todo / 移除 Todo 的功能。
現在我們只需要將這兩項功能加進 reducer
先從 add 開始

```
addTodo: (state, action) => {
    const lastTodo = state[state.length - 1];
    const newTodoId = lastTodo ? lastTodo.id + 1 : 1;
    const newTodo = {
    id: newTodoId,
    title: action.payload.title,
    desc: action.payload.desc,
    isDone: false,
    };
    state.push(newTodo);
},
```

首先第一個參數會是目前這個 store 的狀態，後面的 action 會是一個物件，其中包含{type,payload}，payload 會是我們輸入的資料。

再來就是 removeTodo

```
removeTodo: (state, action) => {
    const { id } = action.payload;
    const index = state.findIndex((todo) => todo.id === id);
    if (index !== -1) {
    state.splice(index, 1);
    }
},
```

到目前我們可以看到我們都是針對 state 進行操作，因為我們現在的資料來源會統一是從 store 中取出來的，針對任何資料的更新也都會是在這邊做修正。

現在我們已經建立好了 todoSlice 的本體，接下來就是要將剛剛建立的 reducer 作為 actions 輸出。

```
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice;
```

回到 store.js，我們還需要加建立 store，並引入剛剛建立好的 todoSlice。

```
import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "@/redux/slices/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export default store;


```

接下來我們回到 call api 的那層 component，先是看看我們的 redux 是否建立成功。

首先我們先引入`useSelector, useDispatch`這兩個 Method 來取用 redux 中的資料 & 調用 reducers

```
import { useSelector, useDispatch } from "react-redux";
```

接下來透過`useSelector`取用 store

```
  const OriData = useSelector((state) => state.todo);
  console.log("OriData", OriData);
```

- 這邊的 state 是 Store 中的狀態，我們需要 store 中的 todo 所以要加上.todo

到這邊我們可以看到 console 會有下面的訊息

```
OriData []
```

代表我們成功抓到 todo 這個 slice 中的資料。

接下來我們回到 todoSlice 中，新增一個 reducer 來為我們處理變更新的 state。

```
updateTodoArr: (state, action) => {
return action.payload;
},
```

現在我們回到剛剛的`Home`中，就可以使用`dispatch(updateTodoArr(res.data.todoList));`來將我們從 API 中獲取的資料塞進去store中。

現在我們就可以先把
```
  const [oriList, setOriList] = useState([]);
```
這個state移除掉，因為我們現在的oriList已經存在Store中了。