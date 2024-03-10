import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [key, setKey] = useState("");

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();

    if (value) {
      // add todo
      addTodo(key, value);
      // clear form after submission
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="todo-input-type"
        placeholder="Key"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Value"
      />

      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
