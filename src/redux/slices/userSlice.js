import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        email: '',
    },
    reducers: {
        updateUser: (state, action) => {
            const { id, email } = action.payload;

            return {
                ...state,
                ...(id && { id }),
                ...(email && { email }),
            };
        },
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice;

// 註冊時 加上其他欄位
