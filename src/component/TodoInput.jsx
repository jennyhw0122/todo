import PropTypes from "prop-types";
import styles from "../css/TodoInput.module.css";
// Ant Design Icons
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

function TodoInput({ newTodo, setNewTodo, addTodo }) {
  /**
   * Enter 키를 눌렀을 때 처리
   * - 입력값이 있으면 할 일을 추가
   * - 입력값이 없으면 경고 표시
   */
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
      {/* 입력 필드 */}
      <input
        type="text"
        value={newTodo} // 부모 컴포넌트로부터 받은 상태값
        onChange={(e) => setNewTodo(e.target.value)} // 상태 업데이트
        onKeyDown={handleKeyDown} // Enter 키 이벤트 처리
        placeholder="오늘 해야 할 일을 입력하세요!"
        className={styles.todoInput}
      />
      {/* 추가 버튼 */}
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
        <PlusOutlined className={styles.addIcon} /> {/* 추가 아이콘 */}
        등록
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  newTodo: PropTypes.string.isRequired, // 입력된 할 일 값
  setNewTodo: PropTypes.func.isRequired, // 입력 값을 업데이트하는 함수
  addTodo: PropTypes.func.isRequired, // 할 일을 추가하는 함수
};

export default TodoInput;
