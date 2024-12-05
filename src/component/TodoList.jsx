import React from "react";
import styles from "../css/TodoList.module.css";

function TodoList({
  todos,
  toggleComplete,
  deleteTodo,
  startEditing,
  saveEdit,
  editingId,
  editText,
  setEditText,
}) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={styles.listItem}>
          {editingId === todo.id ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={styles.inputField}
              />
              <button onClick={() => saveEdit(todo.id)} className={styles.todoButton}>
                저장
              </button>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className={styles.checkbox}
              />
              <span
                className={styles.todoText}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              {todo.completed && todo.completedAt && (
                <span className={styles.completedAt}>
                  완료: {todo.completedAt}
                </span>
              )}
              <button
                onClick={() => startEditing(todo.id, todo.text)}
                className={styles.todoButton}
              >
                수정
              </button>
              <button onClick={() => deleteTodo(todo.id)} className={styles.todoButton}>
                삭제
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
