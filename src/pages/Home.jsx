import cx from 'classnames';
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from '@/layout/Layout';
import { createSelector } from 'reselect';
import { CheckIcon, Cross2Icon, Pencil2Icon, ResetIcon } from '@radix-ui/react-icons';
import useUser from '@/hooks/useUser';
import useModal from '@/hooks/useModal';
import TodoInput from '@/components/TodoList';
import SearchBar from '@/components/SearchBar';
import HomeListPage from '@/components/HomeListPage';
import useGetSupaTodo from '@/hooks/useGetSupaTodo';
import useCheckUserLogin from '@/hooks/useCheckUserLogin';
import { updateTodoArr, addTodo, removeTodo, updateTodo } from '@/redux/slices/todoSlice';
// import { useGetTodo } from '@/hooks/useGetTodos';

function Home() {
    const [isFocus, setIsFocus] = useState({ tag1: true, tag2: false });
    const [modalTodo, setModalTodo] = useState({});
    const oriTodo = useSelector(state => state.todo);
    const newTodo = useRef({});

    // Redux dispatch
    const dispatch = useDispatch();

    // Fetch todo data
    // useGetTodo(); //by api
    useGetSupaTodo(); // by supabase

    // get UserId
    const { user } = useUser();

    //check Login
    useCheckUserLogin();

    // Modal
    const { show, RenderModal, hide } = useModal();

    //這邊的selectTodos可以理解為 作為selector的函數在createSelector的時候 從state中選取todo
    // Selectors
    const selectTodos = state => state.todo;
    const selectCompletedTodos = createSelector([selectTodos], todos =>
        todos.filter(todo => todo.isDone)
    );
    const selectUncompletedTodos = createSelector([selectTodos], todos =>
        todos.filter(todo => !todo.isDone)
    );
    const completedTodos = useSelector(selectCompletedTodos);
    const uncompletedTodos = useSelector(selectUncompletedTodos);

    // Handlers & Logic functions
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
    /**
     * @param {string} result
     */
    const handleGetSubmitResult = result => {
        const template = { title: result, desc: '', isDone: false, userId: user.id };
        dispatch(addTodo(template));
    };
    /**
     * @param {object} item
     */
    const handleDoneClick = item => {
        const newTodos = oriTodo.map(todo => {
            if (todo.id === item.id) {
                return {
                    ...todo,
                    isDone: true,
                };
            }
            return todo;
        });

        dispatch(updateTodoArr(newTodos));
    };
    const handleRecoverClick = item => {
        const newTodos = oriTodo.map(todo => {
            if (todo.id === item.id) {
                return {
                    ...todo,
                    isDone: false,
                };
            }
            return todo;
        });

        dispatch(updateTodoArr(newTodos));
    };
    const handleDeleteBtnClick = item => {
        dispatch(removeTodo(item));
    };
    const handleEditBtnClick = item => {
        setModalTodo(prev => (prev = item));
        newTodo.current = { ...item };
        show();
    };
    const updateTodoItem = item => {
        dispatch(updateTodo(item));
        newTodo.current = {};
        setModalTodo({});
        hide();
    };

    return (
        <main>
            <Layout>
                <div className="w-full max-w-[992px] min-h-[300px] bg-[#E3D5C9] rounded-md flex flex-col shadow-md py-10 gap-16">
                    <TodoInput handleOnSubmit={handleGetSubmitResult}>
                        <SearchBar data={oriTodo} />
                    </TodoInput>
                    <RenderModal>
                        <div className="flex flex-wrap flex-col">
                            <div className="flex my-2">
                                <span>標題:</span>
                                <input
                                    type="text"
                                    className="ml-2 border-2 rounded-md"
                                    defaultValue={modalTodo.title}
                                    onChange={e => {
                                        e.preventDefault();
                                        newTodo.current.title = e.target.value;
                                    }}
                                />
                            </div>
                            <div className="flex my-2">
                                <span>內容:</span>
                                <textarea
                                    className="flex-1 border-2 ml-2 h-[80px] rounded-md"
                                    defaultValue={modalTodo.desc}
                                    onChange={e => {
                                        e.preventDefault();
                                        newTodo.current.desc = e.target.value;
                                    }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                updateTodoItem(newTodo.current);
                            }}
                            className=" bg-green-500 text-white py-1 px-2 rounded-md m-2"
                        >
                            更新
                        </button>
                    </RenderModal>
                    <div className="flex justify-start w-[90%] mx-auto relative">
                        <div className="absolute rounded-md top-[-40px] h-[40px] left-4 flex">
                            <span
                                className={cx(
                                    'inline-block py-2 px-4 mr-4 rounded-t-md select-none cursor-pointer text-[1.2rem] font-bold hover:bg-white hover:text-gray-600',
                                    { 'bg-gray-400 text-white': !isFocus.tag1 },
                                    { 'text-gray-600  bg-white': isFocus.tag1 }
                                )}
                                onClick={() => togglePage('tag1')}
                            >
                                未完成
                            </span>
                            <span
                                className={cx(
                                    'inline-block py-2 px-4 mr-4 rounded-t-md select-none cursor-pointer text-[1.2rem] font-bold hover:bg-white hover:text-gray-600',
                                    { 'bg-gray-400 text-white': !isFocus.tag2 },
                                    { 'text-gray-600  bg-white': isFocus.tag2 }
                                )}
                                onClick={() => togglePage('tag2')}
                            >
                                已完成
                            </span>
                        </div>
                        <div className="overflow-x-hidden w-full flex relative z-5">
                            <HomeListPage
                                title="未完成事項"
                                todoList={uncompletedTodos}
                                isMove={isFocus.tag2}
                                renderAdd={() => <CheckIcon className="w-6 h-6" />}
                                renderDelete={() => <Cross2Icon className="w-6 h-6" />}
                                renderEdit={() => <Pencil2Icon className="w-6 h-6" />}
                                handleAdd={handleDoneClick}
                                handleDelete={handleDeleteBtnClick}
                                handleEdit={handleEditBtnClick}
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
