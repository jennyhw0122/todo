import React from "react";
import styles from "../css/TodoItem.module.css";

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className={styles.item}>
      <span
        onClick={() => toggleComplete(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className={styles.deleteButton}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
