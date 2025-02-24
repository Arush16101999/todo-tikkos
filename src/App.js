import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import AddTodo from "./containers/AddTodo";
import Home from "./containers/Home";

function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/addTodo" Component={AddTodo} />
          <Route path="/updateTodo/:id" Component={AddTodo} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
