import './App.css';
import { useState } from "react";
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([{id:1, name:'Todo1', completed: false}]);
  
  return (
      <div className = 'todo-app__root'>
        <header className="todo-app__header">
          <h1 className="todo-app__title" id = 'test'>todos</h1>
        </header>
        <section className='todo-app__main'>
          <input className='todo-app__input' placeholder='What needs to be done?'></input>
          <ul className='todo-app__List' id='todo-list'>
            <TodoList todos = {todos}/>
          </ul>
        </section>
      </div>
  );
}

export default App;

