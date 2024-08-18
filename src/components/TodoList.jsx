import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { fetchTodos } from "../redux/slice";
import axios from "axios";
import { Box, Skeleton } from "@mui/material";

function TodoList() {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/todos");
      const resp = response.data; // axios stores the response data in response.data
      dispatch(fetchTodos(resp.todos));
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      {todos?.length ? (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <Box sx={{ width: 650 }}>
          {Array(20)
            .fill("todo")
            .map((todo) => {
              return <Skeleton height={100} />;
            })}
        </Box>
      )}
    </Container>
  );
}

export default TodoList;
