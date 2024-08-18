import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const { open, handleClose, todoTitle, handleEdit } = props;

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const todoText = formJson.todo;
            handleEdit(todoText);
            handleClose();
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Edit Your Task</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontWeight: "600" }}>
            Feel free to update the task information. Don't forget to save your
            changes!
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="todo"
            name="todo"
            label="Edit Todo"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={todoTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
