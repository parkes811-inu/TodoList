import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

const TodoContainer = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getList();
  }, []);

  // 할일 목록을 서버에서 가져오는 함수
  const getList = async () => {
    try {
      const response = await fetch('http://localhost:8080/todos');
      const data = await response.json();
      setTodoList(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // 체크박스 토글 핸들러
  const onToggle = async (todo) => {
    const updatedTodo = {
      ...todo,
      status: todo.status ? 0 : 1,
    };

    try {
      await fetch('http://localhost:8080/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      getList();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // 할일 삭제 핸들러
  const onRemove = async (no) => {
    try {
      await fetch(`http://localhost:8080/todos/${no}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      getList();
    } catch (error) {
      console.error('Error removing todo:', error);
    }
  };

  // 새로운 할일 제출 핸들러
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return; // 빈 입력은 무시

    const newTodo = {
      name: input,
      status: 0,
    };

    try {
      await fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      setInput('');
      getList();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // 입력값 변경 핸들러
  const onChange = (e) => {
    setInput(e.target.value);
  };

  // 전체 완료 핸들러
  const onCompleteAll = async () => {
    try {
      await fetch('http://localhost:8080/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ no: -1 }), // 모든 todo를 완료로 표시
      });
      getList();
    } catch (error) {
      console.error('Error completing all todos:', error);
    }
  };

  // 전체 삭제 핸들러
  const onRemoveAll = async () => {
    try {
      await fetch('http://localhost:8080/todos/-1', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTodoList([]);
    } catch (error) {
      console.error('Error removing all todos:', error);
    }
  };

  return (
    <div className='container'>
      <Header /> {/* Header 컴포넌트로 수정 */}
      <Input onSubmit={onSubmit} input={input} onChange={onChange} />
      <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
      <Footer onCompleteAll={onCompleteAll} onRemoveAll={onRemoveAll} />
    </div>
  );
};

export default TodoContainer;
