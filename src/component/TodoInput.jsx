import React from "react";
import styles from "../css/TodoList.module.css";

function TodoInput({ newTodo, setNewTodo, addTodo }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!newTodo.trim()) {
        alert("내용을 입력해주세요!");
        return;
      }
      addTodo();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        value={newTodo}
        placeholder="오늘 할 일을 입력해쥬!"
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.inputField}
      />
      <button onClick={addTodo} className={styles.todoButton}>
        내 맘속에 저장🤍
      </button>
    </div>
  );
}

export default TodoInput;
