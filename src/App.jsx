import React, { useState, useEffect, useReducer } from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import styles from "./css/App.module.css";

// 리듀서 함수 정의
const todoReducer = (state, action) => {
  const dayOption = {
    year: "2-digit",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          time: new Date().toLocaleString("ko-KR", dayOption),
          text: action.payload,
          completed: false,
          completedAt: null,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed
                ? new Date().toLocaleString("ko-KR", { hour: "2-digit", minute: "2-digit" })
                : null,
            }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText }
          : todo
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function App() {
  const getInitialTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const [todos, dispatch] = useReducer(todoReducer, getInitialTodos());
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) {
      alert("할 일을 입력해쥬~!");
      return;
    }
    dispatch({ type: "ADD_TODO", payload: newTodo });
    setNewTodo("");
  };

  const toggleComplete = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const updateTodo = (id, newText) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, newText } });
  };

  return (
    <div className={styles.app}>
      {/* 최상위 컨테이너에 styles.app 클래스 적용 */}
      <h1 className={styles.title}>Jenny의 Todo List</h1>

      {/* 필터 버튼 */}
      <div className={styles.filterButtons}>
        <button
          onClick={() => setFilter("all")}
          className={styles.filterButton}
        >
          전체
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={styles.filterButton}
        >
          완료
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={styles.filterButton}
        >
          미완료
        </button>
      </div>

      {/* TodoInput 컴포넌트 */}
      <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />

      {/* TodoList 컴포넌트 */}
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
