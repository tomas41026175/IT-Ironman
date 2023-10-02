這邊可以看到我們的透過```createSelector```建立一個selectCompletedTodos用於計算isDone為true的todo資料。

並且使用useSelector取用這個資料，將他賦值給completedTodos。
```
const selectCompletedTodos = createSelector([selectTodos], todos => {
    return todos.filter(todo => todo.isDone);
});

const completedTodos = useSelector(selectCompletedTodos);
```
至於為何需要使用useSelector來取用這個資料是因為，createSelector的本質上是將所有符合條件的資料選擇出來，所以我們需要透過useSelector來取用這個store中的資料。

這時候我們可以看到剛剛getAPI的部分，由於我們現在已經確定我們將資料都放進redux了，所以我們可以將這部分的邏輯包裝起來。
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
目前我們使用useEffect 並透過getTodoList() call api，但若我們需要在不同的component中，使用這段邏輯的話，我們就需要一直重複這段。
所以我們這時候可以透過custom hook將這段邏輯封裝成一個hook。
```
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
