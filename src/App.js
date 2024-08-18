import React from "react";
import { Container, Typography } from "@mui/material";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Container maxWidth={false} sx={{ maxWidth: "700px", margin: "0 auto" }}>
      <Typography variant="h3" align="center" pt={6}>
        Todo App
      </Typography>
      <Typography variant="h5" align="center" mb={4}>
        Manage your tasks efficiently
      </Typography>
      <AddTodo />
      <TodoList />
      <ToastContainer />
    </Container>
  );
};

export default App;
