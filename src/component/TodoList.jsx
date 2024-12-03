import React from "react";
import TodoItem from "./TodoItem";
import styles from "../css/TodoList.module.css";

function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
