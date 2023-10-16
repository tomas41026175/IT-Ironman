import { useEffect } from 'react';
import getSupabaseClient from '../data/mock/utils/getSupabaseClient';

const supabase = getSupabaseClient();

const getSupaTodos = async () => {
    try {
        const { data: todos } = await supabase.from('todos').select('*');
        return todos;
    } catch (error) {
        console.error('Failed to fetch todos:', error);
        return [];
    }
};


const useGetAllSupaTodoLength = () => {

    useEffect(() => {
        // Fetch and dispatch user's todos.
        getSupaTodos()
            .then(todos => {
                return todos.length;
            })
            .catch(err => {
                console.error('Error while getting todos:', err);
            });
    }, []);
};

export default useGetAllSupaTodoLength;
