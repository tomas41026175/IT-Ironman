import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    updateTodoArr: (state, action) => {
      return action.payload;
    },
    removeTodo: (state, action) => {
      const { id } = action.payload;
      const index = state.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    addTodo: (state, action) => {
      const lastTodo = state[state.length - 1];
      const newTodoId = lastTodo ? lastTodo.id + 1 : 1;
      const { title, desc } = action.payload;
      const newTodo = {
        id: newTodoId,
        title: title,
        desc: desc,
        isDone: false,
      };
      state.push(newTodo);
    },
    updateTodo: (state, action) => {
      const { id, title, desc } = action.payload;
      const targetTodoPosition = state.findIndex((todo) => todo.id === id);
      if (targetTodoPosition !== -1) {
        state[targetTodoPosition] = {
          ...state[targetTodoPosition],
          title,
          desc,
        };
      }
    },
    
  },
});

export const { updateTodoArr,addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice;
