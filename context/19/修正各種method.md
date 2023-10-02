當我們引入 redux 之後，我們之前所有邏輯的部分都需要進行重構，這將會大幅減少 function & State 這兩個部分，因為我們原本的操作基本上都是接收到資料後=>存進 state 中，接下來對這個 state 進行各種操作。

但是當我們引入 redux 之後，我們的所有行為都可以透過 store 取得目前最新的資料，並調用 store 中儲存的 method 對 store 中的 state 進行各種操作。

首先先看到我們的父層元件，原先我們抓取 api 後將結果儲存在 state 中，現在我們可以來修改一下段 code。
//修改前

```
useEffect(() => {
    getTodoList()
        .then(res => {
            const definedTodo = defineTodo(res.data.todoList);
            setOriList(definedTodo);
            arrSort(definedTodo);
        })
        .catch(err => console.log(err));
}, []);
```

//修改後

```
useEffect(() => {
    getTodoList()
        .then(res => {
            const definedTodo = defineTodo(res.data.todoList);
            dispatch(updateTodoArr(definedTodo));
        })
        .catch(err => console.log(err));
}, []);
```

可以看到，原先我們取得資料後，經過 definedTodo 進行資料整理後，將結果透過 useState 存在 state 中，但現在我們透過從 store 中獲得的 updateTodoArr 這個方法，將我們獲得的資料更新至 store 中。
接下來我們要使用資料的時候都可以透過 store 中的資料進行處哩，而不再需要建立一個 state 儲存資料。

```
    // const [todoList, setTodoList] = useState([]);
    // const [doneTodo, setDoneTodo] = useState([]);
    // console.log("OriData", OriData);
```

這代表以上這些 state 我們都可以刪掉了，那接下來我們要如何獲得已完成&未完成的資料呢。
最直觀的來說，我們可以

```
const completedTodos = useSelector(state=>state.isDone)
```

這樣確實沒錯，我們可以得到"目前"store中已完成&未完成的資料，但是並不會因為store中的資料更新，這兩個參數所儲存的state也跟著變化，所以我們需要透過```createSelector```這個來自於reselect中的方式，建立一個Memoized Selector。
他會在store中的state產生變化的時候重新計算需要的state。

首先第一個參數會是一個input array，第二個參數為處裡資料的function。

若是input array中的資料沒有變化，則不觸發後面的資料處理function。