import React, { useEffect} from 'react';
import {  useDispatch } from 'react-redux';
import {updateTodo } from '@/redux/slices/todoSlice';
import { getTodoData } from '@/api/todo';

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
