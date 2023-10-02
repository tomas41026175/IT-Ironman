import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import HomeListPage from '@/components/HomeListPage';
import TodoInput from '@/components/TodoList';
import { Layout } from '@/layout/Layout';
import { CheckIcon, Cross2Icon, ResetIcon } from '@radix-ui/react-icons';
import { getTodoData } from '@/api/todo';
import SearchBar from '@/components/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodoArr, addTodo, removeTodo, updateTodo } from '@/redux/slices/todoSlice';
import { createSelector } from 'reselect';

function Home() {
    const [isFocus, setIsFocus] = useState({ tag1: true, tag2: false });
    // const [oriList, setOriList] = useState([]);
    // const todos = useSelector(state => state.todo);
    const oriTodo = useSelector(state => state.todo);

    //這邊的selectTodos可以理解為 作為selector的函數在createSelector的時候 從state中選取todo
    const selectTodos = state => state.todo;

    const selectCompletedTodos = createSelector([selectTodos], todos => {
        return todos.filter(todo => todo.isDone);
    });

    const selectUncompletedTodos = createSelector([selectTodos], todos =>
        todos.filter(todo => !todo.isDone)
    );
    const completedTodos = useSelector(selectCompletedTodos);
    const uncompletedTodos = useSelector(selectUncompletedTodos);

    // console.log('finish', completedTodos, 'uncompletedTodos', uncompletedTodos);

    // const [todoList, setTodoList] = useState([]);
    // const [doneTodo, setDoneTodo] = useState([]);
    // console.log("OriData", OriData);
    const dispatch = useDispatch();
    const defineTodo = todoArr => {
        return todoArr;
    };

    useEffect(() => {
        getTodoList()
            .then(res => {
                const definedTodo = defineTodo(res.data.todoList);
                // setOriList(definedTodo);
                // arrSort(definedTodo);
                dispatch(updateTodoArr(definedTodo));
            })
            .catch(err => console.log(err));
    }, []);

    // console.log("new", OriData);

    /**
     * @description function for Sort todo isDone
     * @param {array} oriTodoArr
     */
    // const arrSort = oriTodoArr => {
    //     const definedTodo = oriTodoArr.map(e => e);
    //     const todoArr = [];
    //     const doneArr = [];
    //     definedTodo.forEach(e => {
    //         e.isDone ? todoArr.push(e) : doneArr.push(e);
    //     });
    //     setTodoList(todoArr);
    //     setDoneTodo(doneArr);
    // };

    // console.log("todoList", todoList, "doneTodo", doneTodo);

    const getTodoList = async () => {
        try {
            const data = await getTodoData();
            return data;
            // console.log(data);
        } catch (error) {
            console.error('get data error:', error);
        }
    };

    const handleGetSubmitResult = result => {
        // const getLastItem = todos[todos.length - 1];
        // const newTodo = [
        //     ...todos,
        //     { ...getLastItem, id: getLastItem.id + 1, title: result, desc: '', isDone: false },
        // ];

        // return newTodo;

        dispatch(addTodo({ title: result, desc: '', isDone: false }));
    };

    /**
     * @param {string} tag
     */
    const togglePage = tag => {
        setIsFocus(prev => {
            //先儲存整個state
            const updateState = { ...prev };

            //如果點選的標籤已經active，就不執行
            if (!updateState[tag]) {
                //reset所有標籤
                for (const key in updateState) {
                    if (key !== tag) {
                        updateState[key] = false;
                    }
                }

                //更新點選頁籤的狀態
                updateState[tag] = !prev[tag];
            }
            return updateState;
        });
    };

    const handleDoneClick = Item => {
        // const newTodoArr = todoList.map(e => e);
        // const doneItem = newTodoArr.splice(ItemId, 1);
        // // setTodoList(newTodoArr);
        // // console.log(ItemId, newDoneArr);
        // const newDoneArr = doneTodo.map(e => e);
        // newDoneArr.push(doneItem[0]);
        // setDoneTodo(newDoneArr);
        const newTodos = oriTodo.map(todo => {
            if (todo.id === Item.id) {
                return {
                    ...todo,
                    isDone: true,
                };
            }
            return todo;
        });

        dispatch(updateTodoArr(newTodos));
    };

    const handleRecoverClick = Item => {
        const newTodos = oriTodo.map(todo => {
            if (todo.id === Item.id) {
                return {
                    ...todo,
                    isDone: false,
                };
            }
            return todo;
        });

        dispatch(updateTodoArr(newTodos));
        // const newDoneArr = doneTodo.map(e => e);
        // const recoverItem = newDoneArr.splice(ItemId, 1);
        // setDoneTodo(newDoneArr);

        // const newTodoArr = todoList.map(e => e);
        // newTodoArr.push(recoverItem[0]);
        // setTodoList(newTodoArr);
    };

    const handleDeleteBtnClick = Item => {
        dispatch(removeTodo(Item));
    };

    return (
        <main>
            <Layout>
                <div className="w-full max-w-[992px] min-h-[300px] bg-[#E3D5C9] rounded-md flex flex-col shadow-md py-10 gap-16">
                    <TodoInput handleOnSubmit={handleGetSubmitResult}>
                        <SearchBar data={oriTodo} />
                    </TodoInput>
                    <div className="flex justify-start w-[90%] mx-auto relative">
                        <div className="absolute rounded-md top-[-40px] h-[40px] left-4">
                            <span
                                className={cx(
                                    'inline-block py-2 px-4 mr-4 rounded-t-md select-none cursor-pointer text-[1.2rem] font-bold hover:bg-white hover:text-gray-600',
                                    { 'bg-gray-400 text-white': !isFocus.tag1 },
                                    { 'text-gray-600  bg-white': isFocus.tag1 }
                                )}
                                onClick={() => togglePage('tag1')}
                            >
                                未完成事項
                            </span>
                            <span
                                className={cx(
                                    'inline-block py-2 px-4 mr-4 rounded-t-md select-none cursor-pointer text-[1.2rem] font-bold hover:bg-white hover:text-gray-600',
                                    { 'bg-gray-400 text-white': !isFocus.tag2 },
                                    { 'text-gray-600  bg-white': isFocus.tag2 }
                                )}
                                onClick={() => togglePage('tag2')}
                            >
                                已完成事項
                            </span>
                        </div>
                        <div className="overflow-x-hidden w-full flex relative z-5">
                            <HomeListPage
                                title="未完成事項"
                                todoList={uncompletedTodos}
                                isMove={isFocus.tag2}
                                renderAdd={() => <CheckIcon className="w-6 h-6" />}
                                renderDelete={() => <Cross2Icon className="w-6 h-6" />}
                                handleAdd={handleDoneClick}
                                handleDelete={handleDeleteBtnClick}
                            />
                            <HomeListPage
                                title="已完成事項"
                                todoList={completedTodos}
                                isMove={isFocus.tag2}
                                handleRecover={handleRecoverClick}
                                renderRecover={() => <ResetIcon className="w-6 h-6" />}
                                renderDelete={() => <Cross2Icon className="w-6 h-6" />}
                                handleDelete={handleDeleteBtnClick}
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </main>
    );
}

export default Home;
