import React, { useState } from "react";
import style from "../css/TodoItem.module.css";
import { Checkbox } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

const TodoItem = ({ todo, updateTodo, toggleComplete, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      updateTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <tr className={style.todoRow}>
      {/* 완료 여부 체크박스 */}
      <td>
        <Checkbox
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
      </td>

      {/* 텍스트 수정 및 표시 */}
      <td>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className={style.editInput}
          />
        ) : (
          <span className={todo.completed ? style.completedText : ""}>
            {todo.text}
          </span>
        )}
      </td>

      {/* 완료 시간 표시 */}
      <td>{todo.completed ? todo.completedTime : "-"}</td>

      {/* 작업 버튼 */}
      <td>
        <button onClick={handleEdit} className={style.editButton}>
          {isEditing ? "완료" : <EditTwoTone />}
        </button>
        <button onClick={() => deleteTodo(todo.id)} className={style.deleteButton}>
          <DeleteTwoTone />
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
;