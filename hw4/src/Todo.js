import React from 'react';
import './App.css';

export default function Todo({todo}) {
    
    let item_detail
    if (todo.completed) {
        item_detail = 
        <h1 className='todo-app__item-detail' style='text-decoration: line-through; opacity: 0.5;'>
            {todo.name}
        </h1>
    }
    else{
        item_detail = 
        <h1 className='todo-app__item-detail'>
            {todo.name}
        </h1>
    }
    return (
        <li className='todo-app__item'>
            <div className='todo-app__checkbox'>
                <input id ={todo.id} type='checkbox' ref={checkRef}></input>
                <label for={todo.id}></label>
            </div>
            {item_detail}
            <img src=".\img\x.png" alt='close' className='todo-app__item-x'></img>
        </li>
    )
  }
