import React, { useReducer, useState, useEffect } from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import styles from "./css/App.module.css";
import { SearchOutlined } from "@ant-design/icons";

/**
 * Reducer 함수
 * - todos 상태를 업데이트하는 로직을 한 곳에서 관리
 * - action.type에 따라 상태(state)를 업데이트
 */
const todoReducer = (state, action) => {
  switch (action.type) {
    case "addTodo": // 새로운 todo를 추가하는 경우
      return [
        ...state, // 기존 todos 배열 유지
        {
          id: Date.now(), // 고유 ID (현재 시간을 기반으로 생성)
          text: action.payload, // 입력된 텍스트를 할 일로 설정
          completed: false, // 초기 상태는 완료되지 않음
        },
      ];
    case "toggleTodo": // 완료 여부를 토글
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed } // 완료 상태를 반전
          : todo // 조건에 맞지 않으면 그대로 유지
      );
    case "updateTodo": // todo 텍스트 수정
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText } // 텍스트만 업데이트
          : todo
      );
    case "deleteTodo": // 특정 todo 삭제
      return state.filter((todo) => todo.id !== action.payload); // 해당 ID를 제외한 todos 반환
    default:
      throw new Error(`Unhandled action type: ${action.type}`); // 예외 처리
  }
};

function App() {
  /**
   * 초기 todos 상태 가져오기
   * - 로컬스토리지에 저장된 todos 데이터를 불러옴
   * - 로컬스토리지에 없으면 빈 배열로 초기화
   */
  const getInitialTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const [todos, dispatch] = useReducer(todoReducer, getInitialTodos()); // todos 상태와 리듀서 연결
  const [searchQuery, setSearchQuery] = useState(""); // 검색창 상태
  const [filter, setFilter] = useState("all"); // 필터 상태: 전체, 완료, 미완료 중 하나

  /**
   * 필터링된 todos 리스트 계산
   * - 검색어와 필터 상태에 따라 todos 배열을 필터링
   */
  const filteredTodos = todos.filter((todo) => {
    if (searchQuery) {
      // 검색어가 있을 때
      return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if (filter === "completed") return todo.completed; // 완료된 항목만
    if (filter === "incomplete") return !todo.completed; // 미완료 항목만
    return true; // 검색어나 필터 조건이 없으면 전체 반환
  });

  /**
   * 로컬스토리지 업데이트
   * - todos 상태가 변경될 때마다 로컬스토리지에 저장
   */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /**
   * 새로운 todo 추가 핸들러
   * - 사용자가 입력한 텍스트를 todos에 추가
   */
  const addTodo = (text) => {
    if (!text.trim()) {
      alert("할 일을 입력해주세요!"); // 빈 입력 방지
      return;
    }
    dispatch({ type: "addTodo", payload: text });
  };

  /**
   * todo 텍스트 수정 핸들러
   * - 특정 todo의 텍스트를 업데이트
   */
  const updateTodo = (id, newText) => {
    dispatch({ type: "updateTodo", payload: { id, newText } });
  };

  /**
   * 완료 여부 토글 핸들러
   * - 특정 todo의 완료 상태를 반전
   */
  const toggleComplete = (id) => {
    dispatch({ type: "toggleTodo", payload: id });
  };

  /**
   * todo 삭제 핸들러
   * - 특정 todo를 todos 배열에서 제거
   */
  const deleteTodo = (id) => {
    dispatch({ type: "deleteTodo", payload: id });
  };

  return (
    <div className={styles.app}>
      <h1>Jenny의 Todo List</h1>

      {/* 검색창 UI */}
      <div className={styles.searchInput}>
        <SearchOutlined className={styles.ico} />
        <input
          type="search"
          placeholder="할 일을 검색할 수 있어요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
        />
      </div>

      {/* 필터 버튼들 */}
      <div className={styles.filterButtons}>
        <button onClick={() => setFilter("all")} className={styles.filterButton}>
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
      <TodoInput addTodo={addTodo} />

      {/* TodoList 컴포넌트 */}
      <TodoList
        todos={filteredTodos} 
        updateTodo={updateTodo} 
        toggleComplete={toggleComplete} 
        deleteTodo={deleteTodo} 
      />
    </div>
  );
}

export default App;
