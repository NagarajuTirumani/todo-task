import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTodo } from "../redux/slice";
import axios from "axios";

function AddTodo() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [todoText, setTodoText] = useState("");

  const handleAdd = () => {
    if (todoText) {
      setLoader(true);
      axios
        .post("https://dummyjson.com/todos/add", {
          todo: todoText,
          completed: false,
          userId: 1,
        })
        .then((res) => {
          toast.success("Successfully Todo Added");
          dispatch(addTodo(res.data));
          setLoader(false);
          setTodoText("");
        })
        .catch((err) => {
          toast.error("Please try again..");
          setLoader(false);
        });
    } else {
      toast.error("Please add text first");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mb={6}>
      <TextField
        label="Add Todo"
        variant="outlined"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAdd}>
        {loader ? "Please Wait" : <span>Add&nbsp;</span>}
        {!loader && <Plus />}
      </Button>
    </Box>
  );
}

export default AddTodo;
