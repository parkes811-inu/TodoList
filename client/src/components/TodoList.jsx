import React from 'react'
import Item from './Item';

const TodoList = ({todoList, onToggle, onRemove}) => {
  return (
    <ul className='todoList'>
      {todoList.map((todo) => {
        return (
          <Item todo={todo} onToggle={onToggle} onRemove={onRemove} />
        )
      })}
    </ul>
  )
}

export default TodoList