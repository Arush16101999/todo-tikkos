import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";

const TodoTable = ({ todos, onDelete, onToggleComplete }) => {
  // line-through style for completed todos
  const textStyle = (todo) =>
    todo.status === "Complete" ? { textDecoration: "line-through" } : {};

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <Checkbox
              checked={todo.status === "Complete"}
              onChange={() => onToggleComplete(todo.id)}
              inputProps={{ "aria-label": "Mark Todo as Complete" }}
            />
            <TableCell sx={textStyle(todo)}>{todo.title}</TableCell>
            <TableCell sx={textStyle(todo)}>{todo.description}</TableCell>
            <TableCell sx={textStyle(todo)}>{todo.dueDate}</TableCell>
            <TableCell sx={textStyle(todo)}>{todo.status}</TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                component={Link}
                to={`/updateTodo/${todo.id}`}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => onDelete(todo.id)}
                sx={{ mr: 1 }}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoTable;
