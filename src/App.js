import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import React from "react";
import {AiOutlineDelete} from "react-icons/ai"
import { FaCheck } from 'react-icons/fa';

function App() {
  const[isCompleteScreen,setIsCompleteScreen] = useState(false)
  const [allTodos,setTodos] = useState([]);
  const[newTitle,setNewTitle] = useState([""]);
  const [newDescription,setNewDescription] = useState("");
  const[completedTodos, setCompletedTodos] = useState([]);
  const handleAddTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      description:newDescription
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };
  const handleDeleteTodo=(index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));

    setTodos(reducedTodo);
  };
  const handleComplete= (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completeOn = dd+'-'+mm+'-'+yyyy+'at'+h+':'+m+':'+s;
    let filteredItem = {
      ...allTodos[index],
      completOn:completeOn
    }
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
  }
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodo){
      setTodos(savedTodo);
    }

  },[])
  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}placeholder="Wnat's the task description?"/>
          </div>
        <div className="todo-input-item">
          <button type="button" onClick={handleAddTodo}className="primaryBtn">Add</button>
        </div>
      </div>
      <div className="btn-area">
        <button className={`secondaryBtn ${isCompleteScreen===false &&'active'}`}onClick={()=>setIsCompleteScreen(false)}>Todo</button>
        <button className={`secondaryBtn ${isCompleteScreen===true &&'active'}`}onClick={()=>setIsCompleteScreen(true)}>Completed</button>

      </div>

      <div className="todo-list">
      {isCompleteScreen===false && allTodos.map((item, index) => {
  return (
    <div className="todo-list-item" key={index}>
      <div>
        <h3>{item.title}</h3>
        <p>{item.Description}</p>
      </div>
      <div>
        <AiOutlineDelete className="icon"onClick={()=>handleDeleteTodo(index)} />
        <FaCheck className="check-icon"onClick={()=>handleComplete(index)} />
      </div>
    </div>
  );
})}
{isCompleteScreen===true && completedTodos.map((item, index) => {
  return (
    <div className="todo-list-item" key={index}>
      <div>
        <h3>{item.title}</h3>
        <p>{item.Description}</p>
        <p><small>Completed on: {item.completOn}</small></p>
      </div>
      <div>
        <AiOutlineDelete className="icon"onClick={()=>handleDeleteTodo(index)} />
        
      </div>
    </div>
  );
})}


      
    </div></div></div>
  );
}

export default App;
