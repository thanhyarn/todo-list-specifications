import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ keyVal, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div>
      <div className="Todo">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <p>{keyVal.key}</p>
          <p
            style={{ float: "right" }}
            onClick={() => toggleComplete(keyVal.id)}
          >
            {keyVal.value}
          </p>
        </div>
        <div>
          <FontAwesomeIcon
            className="edit-icon"
            icon={faPenToSquare}
            onClick={() => editTodo(keyVal.id)}
          />
          <FontAwesomeIcon
            className="delete-icon"
            icon={faTrash}
            onClick={() => deleteTodo(keyVal.id)}
          />
        </div>
      </div>
    </div>
  );
};
