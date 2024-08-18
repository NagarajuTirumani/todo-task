import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Pencil, Trash2, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateTodoStatus, deleteTodo, editTodos } from "../redux/slice";
import { useTheme } from "@mui/material/styles";
import DraggableDialog from "./DraggableDiolog";
import { toast } from "react-toastify";
import FormDialog from "./FormDialog";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleEdit = (editText) => {
    console.log("editText", editText);
    dispatch(
      editTodos({
        id: todo.id,
        todo: editText,
      })
    );
    toast.success("Task successfully updated!");
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent={isMobile ? "start" : "space-between"}
          alignItems={isMobile ? "start" : "center"}
          flexWrap={isMobile ? "wrap" : "nowrap"}
        >
          <Box mb={isMobile ? 2 : 0}>
            <Typography
              variant="h6"
              sx={{
                textWrap: "wrap",
                wordBreak: "break-word",
                textDecoration: `${todo?.completed ? "line-through" : "none"}`,
              }}
              pr={2}
            >
              {todo?.todo}
            </Typography>
          </Box>
          <Box display="flex">
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <React.Fragment>
                  <Button
                    me={10}
                    endIcon={<ChevronDown />}
                    color={todo?.completed ? "success" : "secondary"}
                    variant={"contained"}
                    sx={{ minWidth: "55px" }}
                    {...bindTrigger(popupState)}
                  >
                    {todo?.completed ? "Done" : "Todo"}
                  </Button>
                  <Menu
                    {...bindMenu(popupState)}
                    sx={{ "& .MuiPaper-root": { width: "100px" } }}
                  >
                    <MenuItem
                      onClick={() => {
                        dispatch(
                          updateTodoStatus({
                            id: todo.id,
                            completed: false,
                          })
                        );
                        popupState.close();
                      }}
                    >
                      Todo
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(
                          updateTodoStatus({
                            id: todo.id,
                            completed: true,
                          })
                        );
                        popupState.close();
                      }}
                    >
                      Done
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mr: 1,
                ml: 1,
                textTransform: "capitalize",
                minWidth: "35px",
              }}
              onClick={() => {
                setOpenEdit(true);
              }}
            >
              <Typography
                variant="button"
                sx={{
                  display: { xs: "none", sm: "block" },
                  alignItems: "center",
                }}
              >
                Edit&nbsp;
              </Typography>
              <Pencil size={15} />
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ textTransform: "capitalize", minWidth: "35px" }}
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              <Typography
                variant="button"
                sx={{
                  display: { xs: "none", sm: "block" },
                  alignItems: "center",
                }}
              >
                Delete&nbsp;
              </Typography>
              <Trash2 size={15} />
            </Button>
          </Box>
        </Box>
      </CardContent>
      <DraggableDialog
        open={openDelete}
        handleClose={() => {
          setOpenDelete(false);
        }}
        handleDelete={() => {
          dispatch(
            deleteTodo({
              id: todo.id,
            })
          );
          toast.success("Task successfully deleted!");
        }}
      />
      <FormDialog
        open={openEdit}
        handleClose={() => {
          setOpenEdit(false);
        }}
        handleEdit={handleEdit}
        todoTitle={todo?.todo}
      />
    </Card>
  );
}

export default TodoItem;
