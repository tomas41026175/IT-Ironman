因為我們要模擬 call API 的方式獲得資料，首先我們介紹一下甚麼是 axios，它是一個 JS 的 Library，專門處理各種操作 API 的功能，接下來我們先安裝 axios 這個 Library。

```
npm install axios
```

然後我們先看到資料夾的部分，雖然現在只有一隻 api，但考量擴充性，我們應該建立一個 api 資料夾，將我們的 api 做集中管理。
|- src
|-- api
|--- todo.js

接下來我們需要一隻 api，那我們這時候應該從哪邊生出一隻 api 呢，寫到這邊應該都忘了 NEXT 是一個 React 的全端框架，我們可以直接透過 page router 提供的位址，將我們的 api 塞進去。

所以我們可以在 pages 資料夾中建立一個名為 api 的資料夾，並且在其中建立一個`handleTodoRequest.js`的 api 檔案。
|- pages
|-- api
|--- handleTodoRequest.js

這時候我們先將昨天建立的 mock 檔案 import 進去，並建立一個新的常數存放它，最後通過 handleTodoRequest 這個 function 處理 api 的 Method。
當使用 get 的方式 call api 的時候，使用 json()Method，將 todoData 放進 todoList 中，並回傳一個 key 是 todoList、value 是 todoData 的 JSON response。
為了讓使用者知道 response 是 json 格式，我們要加上`res.setHeader("Content-Type", "application/json"); `,確保使用者知道回傳的是 json 格式的檔案。

//handleTodoRequest.js

```
import todoListMock from "@/data/mock/todoList";
const todoData = todoListMock.map((e) => e);

const handleTodoRequest = (req, res) => {

res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    res.status(200).json({ todoList: todoData });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handleTodoRequest;

```

回到 api 資料夾下的 todo.js，並且 import axios。

//todo.js

```
import axios from "axios";
```

接下來我們要使用`axios.create`的方式，建立一個 axios instance

```
const apiClient = axios.create({ baseURL: "/api" });
```

最後將 get Method 作為一個 async function export 出去

```
export const getTodoData = async() => apiClient.get("/handleTodoRequest");
```

接下來我們就可以回到我們的 todo 畫面中，透過使用 axios.get 的方式獲得這個 api 的資料了。

那我們開始操作吧。

首先 import 剛剛建立的 getTodoData

```
import { getTodoData } from "@/api/todo";
```

再來我們需要一個 state 存放我們得到的資料

```
  const [todoList, setTodoList] = useState([  const [todoList, setTodoList] = useState([]);]);
```

先建立一個 async function 來處理 call 的方式，透過 try catch 確保穩定性

```
  const getTodoList = async () => {
    try {
      const data = await getTodoData();
      return data;
      // console.log(data);
    } catch (error) {
      console.error("get data error:", error);
    }
  };
```

然後我們使用 useEffect 在一進入到畫面的時候 call api ，這時候我們可以得到 api 回傳的資料，但是我們還需要處理一件事情，因為實務上我們不能確保 api 的資料是拿回來就可以用的，所以需要先將 api 做個整理，再存進 state 中

```
  useEffect(() => {
    getTodoList()
      .then((res) => {
        setTodoList(res.data.todoList);
      })
      .catch((err) => console.log(err));
  }, []);
```

最後在到子元件中,更改 useEffect 的條件就完成拉。

```
  useEffect(() => {
    setNewTodoList((prev) => (prev = todoList?.map((e) => e)));
    //由於todoList 是一個會變動的state
    //為了確保新的List能夠更新，所以加入到array中進行監聽
  }, [todoList]);
```
