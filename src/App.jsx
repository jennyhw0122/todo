import { useState, useEffect } from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import styles from "./css/App.module.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null); // 현재 수정 중인 ID
  const [editText, setEditText] = useState(""); // 수정 중인 텍스트

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) {
      alert("내용을 입력해쥬!");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      completedAt: null,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed
                ? `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                : null,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, currentText) => {
    setEditingId(id); // 수정 중인 ID 설정
    setEditText(currentText); // 현재 텍스트를 수정 텍스트로 설정
  };

  const saveEdit = (id) => {
    if (!editText.trim()) {
      alert("수정할 내용을 입력해주세요!");
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText.trim() } : todo
      )
    );
    setEditingId(null); // 수정 모드 종료
    setEditText(""); // 수정 텍스트 초기화
  };

  return (
    <div className={styles.app}>
      <h1>Jenny의 Todo List</h1>
      <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        startEditing={startEditing}
        saveEdit={saveEdit}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
      />
    </div>
  );
}

export default App;
