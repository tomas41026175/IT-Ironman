這邊可以看到我們的透過`createSelector`建立一個 selectCompletedTodos 用於計算 isDone 為 true 的 todo 資料。

並且使用 useSelector 取用這個資料，將他賦值給 completedTodos。

```
const selectCompletedTodos = createSelector([selectTodos], todos => {
    return todos.filter(todo => todo.isDone);
});

const completedTodos = useSelector(selectCompletedTodos);
```

至於為何需要使用 useSelector 來取用這個資料是因為，createSelector 的本質上是將所有符合條件的資料選擇出來，所以我們需要透過 useSelector 來取用這個 store 中的資料。

這時候我們可以看到剛剛 getAPI 的部分，由於我們現在已經確定我們將資料都放進 redux 了，所以我們可以將這部分的邏輯包裝起來。

```
    useEffect(() => {
        getTodoList()
            .then(res => {
                const definedTodo = defineTodo(res.data.todoList);
                dispatch(updateTodo(definedTodo));
            })
            .catch(err => console.log(err));
    }, []);

    const getTodoList = async () => {
        try {
            const data = await getTodoData();
            return data;
        } catch (error) {
            console.error('get data error:', error);
        }
    };
```

目前我們使用 useEffect 並透過 getTodoList() call api，但若我們需要在不同的 component 中，使用這段邏輯的話，我們就需要一直重複這段。
所以我們這時候可以透過 custom hook 將這段邏輯封裝成一個 hook。

```js
export const useGetTodo = ()=>{
    const dispatch = useDispatch();
    const defineTodo = todoArr => {
        return todoArr;
    };

    const getTodoList = async () => {
        try {
            const data = await getTodoData();
            return data;
            // console.log(data);
        } catch (error) {
            console.error('get data error:', error);
        }
    };

    useEffect(() => {
        getTodoList()
            .then(res => {
                const definedTodo = defineTodo(res.data.todoList);
                dispatch(updateTodo(definedTodo));
            })
            .catch(err => console.log(err));
    }, [dispatch]);
}
```

接下來在原本的 component 中，我們只需要引入這個 custom hook 並且執行就可以達成一樣的效果，並且可以在不同的 component 中重複使用這個 hook，這可以幫我們避免每次 call api 的時候都需要做一樣的事情。

接下來看到新增 todo 的部分

```js
const handleGetSubmitResult = result => {
    const getLastItem = todos[todos.length - 1];
    const newTodo = [
        ...todos,
        { ...getLastItem, id: getLastItem.id + 1, title: result, desc: '', isDone: false },
    ];

    return newTodo;
};
```

目前我們使用的還是 useState 中的資料，但由於我們前面已經將useState都移除了，但我們知道這個function的作用是新一筆新的todo塞進目前的todoList中，所以我們可以使用store中的addTodo，我們在這個method中透過複製最後一筆資料，並且修改這筆資料來建立一個新的todo並且將這個新的todo加入到todoArr中。

```js
const handleGetSubmitResult = result => {
    dispatch(addTodo({ title: result, desc: '', isDone: false }));
};
```
