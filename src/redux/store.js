import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '@/redux/slices/todoSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;
