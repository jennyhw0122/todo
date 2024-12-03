// TodoInput.jsx

import { useState } from 'react';

const TodoInput = ({addTodo}) =>  {
  const[ input,setInput ] = useState('');

  //할 일 추가하기
  const handleAdd = () => {
    if ( input.trim()) {
      addTodo(input);
      setInput('');
    }
  }
  //Enter 키 입력
  const handleKeyDown = (e) => {
    console.log("Pressed key:", e.key); //이벤트 객체에 대해 정리하기
    if (e.key === "Enter") {
      console.log("Enter key was pressed");
    }
  };
  
  return (
    <input type="text" onKeyDown={handleKeyDown} placeholder="Press any key" />
  );
  
}


export default TodoInput;
