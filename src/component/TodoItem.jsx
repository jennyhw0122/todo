/* eslint-disable react/prop-types */
import { useState } from "react";
import style from "../css/TodoItem.module.css";

const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false); // 수정 상태 여부
  const [editText, setEditText] = useState(todo.text); // 기존 텍스트를 초기값으로 설정

  // 할 일 수정 함수
  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      // 수정 상태에서 입력값이 유효하면 updateTodo 실행
      updateTodo(todo.id, editText);
    }
    setIsEditing(!isEditing); // 수정 상태 토글
  };

  // Enter 키 입력 감지
  const handleKeyDown = (e) => {
    if (e.keyCode === 229) return; // 한글 입력 중복 호출 방지
    if (e.key === "Enter") handleEdit(); // Enter 입력 시 수정 함수 호출
  };

  return (
    <tr className={style.todoRow}>
      {/* 체크박스: 완료 상태 토글 */}
      <td>
        <input
          type="checkbox"
          checked={todo.completed} // 완료 상태
          onChange={() => toggleComplete(todo.id)} // 상태 변경 함수 호출
        />
      </td>

      {/* 텍스트: 수정 상태라면 input, 아니면 span */}
      <td
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={!isEditing ? () => toggleComplete(todo.id) : undefined} // 수정 중이 아닐 때만 클릭으로 토글 가능
      >
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)} // 수정 텍스트 업데이트
            onKeyDown={handleKeyDown} // Enter 입력 감지
            className={style.editInput}
          />
        ) : (
          <span>{todo.text}</span>
        )}
      </td>

      {/* 완료 시간 */}
      <td>{todo.completed ? todo.completedAt : ""}</td>

      {/* 수정 및 삭제 버튼 */}
      <td>
        <button onClick={handleEdit} className={style.editButton}>
          {isEditing ? "수정 완료" : "수정"}
        </button>
        <button onClick={() => deleteTodo(todo.id)} className={style.deleteButton}>
          삭제
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
