import React, { useEffect, useState } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import StatusSelect from "../../components/StatusSelect";
import TodoTable from "../../components/TodoTable";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    alert("Successfully Deleted!");
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          status: todo.status === "Complete" ? "Active" : "Complete",
        };
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.status.toLowerCase().includes(filterStatus.toLowerCase())
  );

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };
  //   const textStyle = (todo) =>
  //     todo.status === "Complete" ? { textDecoration: "line-through" } : {};

  const statusOptions = [
    { value: "", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Complete", label: "Complete" },
    { value: "Pending", label: "Pending" },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">TODO Management System</Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/addTodo"
            sx={{ mr: 2 }}
          >
            Add Todo
          </Button>
          <StatusSelect
            label="Status"
            value={filterStatus}
            onChange={handleFilterChange}
            options={statusOptions}
            sx={{ minWidth: 120 }}
          />
        </Box>
      </Box>
      <TodoTable
        todos={filteredTodos}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
    </Container>
  );
};

export default Home;
