import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.value);

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editTodo(value, task.id);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={task.key}
        className="todo-input"
        placeholder="Update task"
        style={{ width: "20%" }}
        disabled
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Update task"
        style={{ width: "65%" }}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};
