import './App.css';
import { useState, useRef } from "react";
//import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [finish_num, setFinNum] = useState(0);
  const [todo_cnt, setTodo_cnt] = useState(0);
  const todoNameRef= useRef();
  
  function Todo({todo}) {
    
    function check_switch(){
      let todos_array = todos;
      let finish = finish_num;
      if(todos_array[todo.id].completed === true){
        todos_array[todo.id].completed = false;
        finish -= 1;
      }
      else{
        todos_array[todo.id].completed = true;
        finish += 1;
        alert("I am sorry... I don't know why this can't work...");
        alert("whe I treid to set my 'finish count' state, my page just went blank")
      }
      // renew
      setTodos(todos=>todos_array);
      //setFinNum(finish_num=>finish);
    }

    function remove_todo(){
      
    }

    function Item_text({todo}){
      let item_detail
      if (todo.completed) {
        return item_detail = 
        <h1 className='todo-app__item-detail' style='text-decoration: line-through; opacity: 0.5;'>
            {todo.name}
        </h1>
      }
      else{
        return item_detail = 
        <h1 className='todo-app__item-detail'>
            {todo.name}
        </h1>
      }
    }
    // define
    return (
        <li className='todo-app__item'>
            <div className='todo-app__checkbox'>
                <input id ={todo.id} type='checkbox' onClick={check_switch}></input>
                <label for={todo.id}></label>
            </div>
            <Item_text todo={todo}/>
            <img src=".\img\x.png" alt='close' className='todo-app__item-x'></img>
        </li>
    )
  }

  function TodoList({todos}) {
    return (
          todos.map(todo => {
            return <Todo key={todo.id} todo={todo}/>}
        )
    )
  }

  function addTodo(e){
    if(e.keyCode == 13){
      const name = todoNameRef.current.value;
      setTodo_cnt(todo_cnt => todo_cnt + 1);
      setTodos(prevTodos => {
        return [...prevTodos, {id:todo_cnt, name: name, completed: false}]
      })
      todoNameRef.current.value = null;
    }
  }

  function Controller(){
    if(todo_cnt > 0){
      return(
      <footer className='todo-app__footer' id='todo-footer'>
        <div className='todo-app__total'>
            {todo_cnt - finish_num} left
        </div>
        <ul className='todo-app__view-buttons'>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </ul>
        <div className='todo-app__clean'>
          <button>Clear completed</button>
        </div>
      </footer>
      );
    }
    else{
      return null;
    }
  }

  return (
      <div className = 'todo-app__root'>
        <header className="todo-app__header">
          <h1 className="todo-app__title" id = 'test'>todos</h1>
        </header>
        <section className='todo-app__main'>
          <input className='todo-app__input' placeholder='What needs to be done?'
          onKeyDown={addTodo} ref={todoNameRef} type='text'></input>
          <ul className='todo-app__list' id='todo-list'>
            <TodoList todos = {todos}/>
          </ul>
        </section>
        <Controller todos = {todos} todo_cnt = {todo_cnt}/>
      </div>
  );
}

export default App;

