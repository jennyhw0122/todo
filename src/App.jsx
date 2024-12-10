import { useState, useEffect } from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import styles from "./css/App.module.css"; // CSS 파일 import
import { SearchOutlined } from "@ant-design/icons";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [searchQuery, setSearchQuery] = useState(""); // 검색 상태
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (searchQuery) return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) =>
    setTodos([...todos, { id: Date.now(), text, completed: false, completedTime: "-" }]);

  const toggleComplete = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedTime: !todo.completed
                ? new Date().toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-", // 완료 시 시간 추가, 미완료 시 "-"
            }
          : todo
      )
    );

  const updateTodo = (id, updatedText) =>
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: updatedText } : todo)));

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  return (
    <div className={styles.app}>
      <h1>Jenny의 Todo List</h1>

      {/* 필터 버튼 */}
      <div className={styles.filterButtons}>
        <button onClick={() => setFilter("all")} className={styles.filterButton}>
          전체
        </button>
        <button onClick={() => setFilter("completed")} className={styles.filterButton}>
          완료
        </button>
        <button onClick={() => setFilter("incomplete")} className={styles.filterButton}>
          미완료
        </button>
      </div>

      {/* TodoInput */}
      <TodoInput addTodo={addTodo} />

      {/* TodoList */}
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />

      {/* 검색창 */}
      <div className={styles.searchInput}>
        <SearchOutlined className={styles.ico} />
        <input
          type="search"
          placeholder="할 일을 검색할 수 있어요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;