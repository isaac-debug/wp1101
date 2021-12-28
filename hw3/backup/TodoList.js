import React from 'react';
import Todo from './Todo';
import './App.css';


export default function TodoList({todos}) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} todo={todo}/>
        }
        )
        
    )
}
