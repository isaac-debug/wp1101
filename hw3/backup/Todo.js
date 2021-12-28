import React from 'react';
import './App.css';

export default function Todo({todo}) {
    return (
        <li className='todo-app__item'>
            <div className='todo-app__checkbox'>
                <div id ={todo.id}></div>
                <label id={todo.id}></label>
            </div>
            <h1 className='todo-app__item-detail'>
                {todo.name}
            </h1>
            <img src='./img/x.png' className='todo-app__item-x'></img>
        </li>
    )
}
