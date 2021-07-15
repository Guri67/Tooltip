import React, { useState, useRef, useEffect} from 'react';
import { v4 } from 'uuid';
import ToDoList from './ToDoList';
import uuidv4 from 'uuid/v4'
import './index.css';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Pie from './Pie';


const LOCAL_STORAGE_KEY = 'todoApp.todos'



function App() {
  const [todos, setTodos] = useState([]) 
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem
      (LOCAL_STORAGE_KEY))
      if (storedTodos) setTodos(storedTodos)
    
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]) 

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {    //take an event property
   const name = todoNameRef.current.value 
   if (name === '') return
   setTodos(prevTodos => {
     return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
   })

   todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  const mouseEnter = () => {
    
    var c = 8;
  }
  return (
   <> 
    <ToDoList todos={todos} toggleTodo = {toggleTodo}/>
    <Pie />
    <input ref ={todoNameRef} type="text" />
    <button onClick= {handleAddTodo}>Add Todo </button>
    <button onClick={handleClearTodos}>Clear completed toDos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to Do</div>
    <div className='my-container'>
      <Tippy content= 'HEY I am tooltip, you can get info while hovering over me'>
        <button>Hover Me</button>
      </Tippy>
      
      {/* <Tooltip text="Helo guyz">
            <button onMouseEnter={mouseEnter}>hover</button>
      </Tooltip>
        <button onMouseEnter={mouseEnter}>hover</button>
       */}
    </div>
   </> 
  )
}

export default App;
