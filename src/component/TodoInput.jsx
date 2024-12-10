// TodoInput.jsx
/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from "../css/TodoInput.module.css";
import { PlusOutlined } from '@ant-design/icons';

const TodoInput = ({ addTodo }) => {
  const [input, setInput] = useState('');

  /**
   * 입력값을 추가하는 함수
   * - 입력값이 없으면 경고 메시지 표시
   * - 입력값이 있으면 addTodo 호출 후 입력 필드 초기화
   */
  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input); // 부모 컴포넌트로 입력값 전달
      setInput(''); // 입력 필드 초기화
    } else {
      alert("할 일을 입력해 주세요!"); // 입력값이 없으면 경고 표시
    }
  };

  /**
   * Enter 키 입력 감지
   * - MacOS에서 한글 입력 중 Enter 입력 처리 방지 (229 키코드)
   * - Enter 입력 시 handleAdd 호출
   */
  const handleKeyDown = (e) => {
    if (e.keyCode === 229) return; // 한글 입력 중 중복 호출 방지
    if (e.key === 'Enter') handleAdd(); // Enter 키 입력 시 추가
  };

  return (
    <div className={styles.container}>
      {/* 입력 필드 */}
      <input
        type="text"
        value={input} // 입력값 상태
        onChange={(e) => setInput(e.target.value)} // 상태 업데이트
        onKeyDown={handleKeyDown} // Enter 키 입력 감지
        placeholder="오늘 해야 할 일을 입력해주세요 💬" // 안내 텍스트
        className={styles.todoInput}
      />
      {/* 추가 버튼 */}
      <button onClick={handleAdd} className={styles.addButton}>
        <PlusOutlined className={styles.addIcon} aria-label="Add Todo" /> {/* 아이콘 추가 */}
      </button>
    </div>
  );
};

export default TodoInput;
