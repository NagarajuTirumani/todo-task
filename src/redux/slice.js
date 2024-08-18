import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const FETCH_TODOS = "FETCH_TODOS";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    fetchTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos];
    },
    updateTodoStatus: (state, action) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: action.payload.completed,
          };
        }
        return todo;
      });
      state.todos = updatedTodos;
    },
    editTodos: (state, action) => {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            todo: action.payload.todo,
          };
        }
        return todo;
      });
      state.todos = updatedTodos;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    },
  },
});

export const { fetchTodos, addTodo, updateTodoStatus, editTodos, deleteTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
