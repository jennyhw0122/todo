import React from "react";
import PropTypes from "prop-types";
import styles from "../css/TodoInput.module.css";

function TodoInput({ newTodo, setNewTodo, addTodo }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 Enter 동작 방지
      if (newTodo.trim()) {
        addTodo(); // 입력값이 있으면 추가
      } else {
        alert("할 일을 입력해 주세요!"); // 입력값이 없으면 알림
      }
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
        placeholder="오늘 해야 할 일을 입력하세요!"
        className={styles.todoInput}
      />
      <button
        onClick={() => {
          if (newTodo.trim()) {
            addTodo(); // 입력값이 있으면 추가
          } else {
            alert("할 일을 입력해 주세요!"); // 입력값이 없으면 알림
          }
        }}
        className={styles.addButton}
      >
        할 일 등록
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  newTodo: PropTypes.string.isRequired,
  setNewTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default TodoInput;
