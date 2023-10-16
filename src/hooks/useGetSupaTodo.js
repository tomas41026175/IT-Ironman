import useUser from './useUser';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodoArr } from '@/redux/slices/todoSlice';
import getSupabaseClient from '../data/mock/utils/getSupabaseClient';

const supabase = getSupabaseClient();

/**
 * Fetch todos from Supabase based on the given userId.
 * @param {string} userId - User's ID.
 * @returns {Array} List of todos.
 */
const getSupaTodos = async userId => {
    try {
        const { data: todos } = await supabase.from('todos').select('*').eq('userId', userId);
        return todos;
    } catch (error) {
        console.error("Failed to fetch todos:", error);
        return [];
    }
};

/**
 * Custom hook to get and set user's todos into redux store.
 */
const useGetSupaTodo = () => {
    const { user } = useUser();
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch and dispatch user's todos.
        getSupaTodos(user.id)
            .then(todos => {
                dispatch(updateTodoArr(todos));
            })
            .catch(err => {
                console.error("Error while getting todos:", err);
            });
    }, [user.id, dispatch]);
};

export default useGetSupaTodo;
