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
  const handleKeyDown = (e) =>{
    if ( e.key === 'Enter') handleAdd();
  };
}


export default TodoInput;
