import React, { useState } from "react";
import styles from "../css/TodoInput.module.css";

function TodoInput({ addTodo }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // 빈 입력 방지
    addTodo(input); // App 컴포넌트의 addTodo 함수 호출
    setInput(""); // 입력 필드 초기화
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="내용을 작성하고, Enter 눌러주세요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        내 맘속에 저장 🤍
      </button>
    </form>
  );
}

export default TodoInput;
