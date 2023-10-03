import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTodoArr } from '@/redux/slices/todoSlice';
import { getTodoData } from '@/api/todo';

export const useGetTodo = () => {
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
                dispatch(updateTodoArr(definedTodo));
                // console.log(definedTodo);
            })
            .catch(err => console.log(err));
    }, [dispatch]);

    // console.log('allTodo', oriTodo);
};
