import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditTodoForm } from "./EditTodoForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  const addSpecification = () => {
    if (key == "") {
      toast.error("Please complete all information", { position: "top-right" });
    } else {
      const isDuplicateKey = todos.some((todo) => todo.key === key);

      if (isDuplicateKey) {
        toast.error("Duplicate key found!", { position: "top-right" });
      } else {
        setTodos([...todos, { key, value, isEditing: false }]);
        toast.success("Successfully", { position: "top-right" });
      }
    }
    setKey("");
    setValue("");
    console.log(todos);
  };

  const generatePDF = () => {
    const input = document.getElementById("my-table");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("table.pdf");
    });
  };

  const deleteTodo = (key) => {
    setTodos(todos.filter((todo) => todo.key !== key));
    toast.success("Deleted successfully", { position: "top-right" });
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.key === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, value: task, isEditing: !todo.isEditing }
          : todo
      )
    );
  };
  return (
    <>
      <div className="TodoWrapper">
        <h1>Customize Specification</h1>
        <div className="todo-form">
          <input
            style={{ width: "20%" }}
            type="text"
            placeholder="Type"
            name="key"
            value={key}
            className="todo-input"
            onChange={(e) => setKey(e.target.value)}
          />
          <input
            style={{ width: "60%" }}
            type="text"
            placeholder="Value"
            name="value"
            value={value}
            className="todo-input"
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            style={{ width: "20%" }}
            className="todo-btn"
            onClick={addSpecification}
          >
            Add Specification
          </button>
        </div>
        {todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <div className="Todo">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "90%",
                }}
              >
                <p>{todo.key}</p>
                <p>{todo.value}</p>
              </div>
              <div>
                <FontAwesomeIcon
                  className="edit-icon"
                  icon={faPenToSquare}
                  onClick={() => editTodo(todo.key)}
                />
                <FontAwesomeIcon
                  className="delete-icon"
                  icon={faTrash}
                  onClick={() => deleteTodo(todo.key)}
                />
              </div>
            </div>
          )
        )}

        {todos.length === 0 ? null : (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <button
              className="todo-btn"
              style={{ background: "blue" }}
              onClick={() => setIsActive(!isActive)}
            >
              Preview
            </button>
            <button
              className="todo-btn"
              style={{ background: "red" }}
              onClick={generatePDF}
            >
              Export PDF
            </button>
          </div>
        )}
      </div>
      {isActive && todos.length > 0 && (
        <table id="my-table">
          <thead>
            <tr>
              <h2 style={{ float: "left", marginTop: "20px" }}>
                Specification
              </h2>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr>
                  <td>{todo.key}</td>
                  <td>{todo.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
