import TodoItem from "./TodoItem";
import styles from "../css/TodoList.module.css";

// eslint-disable-next-line react/prop-types
function TodoList({ todos, toggleComplete, deleteTodo, updateTodo }) {
  return (
    <table className={styles.todoTable}>
      <thead>
        <tr>
          <th>완료</th>
          <th>오늘 나의 작업</th>
          <th>완료 시간</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id} // 고유 ID로 키 지정
            todo={todo} // 개별 할 일 객체 전달
            toggleComplete={toggleComplete} // 완료 상태 토글 함수 전달
            deleteTodo={deleteTodo} // 삭제 함수 전달
            updateTodo={updateTodo} // 수정 함수 전달
          />
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;

