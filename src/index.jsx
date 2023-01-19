import React from "react";
import ReactDOM from "react-dom/client";
import SinglePage from "./components/singlePage/SinglePage";
import Todo from "./components/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Todo /> */}
    <Router>
      <Routes>
        <Route path="/" element={<Todo />} exat />
        <Route path="/single/:id" element={<SinglePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
