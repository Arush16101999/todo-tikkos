import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AddTodo = () => {
  const [todo, setTodo] = useState({
    id: null,
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      const foundTodo = storedTodos.find((t) => t.id === id);
      if (foundTodo) {
        setTodo(foundTodo);
      }
    } else {
      // Optionally load an unsaved todo from local storage (if you wish)
      const storedTodo = localStorage.getItem("todo");
      if (storedTodo) {
        setTodo(JSON.parse(storedTodo));
      }
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedTodo = { ...todo, [name]: value };
    setTodo(updatedTodo);
    localStorage.setItem("todo", JSON.stringify(updatedTodo));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!todo.title || !todo.status) {
      alert("Please fill in the required fields (Title and Status).");
      return;
    }

    // Validate due date if provided
    if (todo.dueDate) {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(todo.dueDate)) {
        alert("Please enter a valid due date in the format YYYY-MM-DD.");
        return;
      }
    }

    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

    if (!id) {
      // Create a new todo with a unique id
      const newTodo = { ...todo, id: Date.now().toString() };
      const newTodos = [...storedTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      alert("Todo Successfully Added!");
    } else {
      // Update existing todo
      const updatedTodos = storedTodos.map((t) => (t.id === id ? todo : t));
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      alert("Todo Successfully Updated!");
    }
    localStorage.removeItem("todo");
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? "Update Todo" : "Add Todo"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            required
            fullWidth
            label="Todo Title"
            name="title"
            value={todo.title}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Todo Description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            label="Due Date"
            name="dueDate"
            type="date"
            value={todo.dueDate}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth required margin="normal">
            <InputLabel id="status-label">Todo Status</InputLabel>
            <Select
              labelId="status-label"
              label="Todo Status"
              name="status"
              value={todo.status}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>z
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              {id ? "Update Todo" : "Add Todo"}
            </Button>
            <Button variant="outlined" sx={{ ml: 2 }} component={Link} to="/">
              Go Back
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AddTodo;
