import "./index.css";
import React, { useState, useEffect } from "react";
import TaskList from "../ItemLista/TaskList";
import axios from "axios";

function Todo() {
  const [taskInput, setTaskInput] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [itemObject, setItemObject] = useState({});

  console.log(itemObject)

  //pegar
  const getTasks = async () => {
    try{
      const res = await axios.get("http://localhost:3000/todos")
      setItemsList(res.data)
    }catch(err){
      alert(err)
    }
  }

  //cadastrar tarefa
  const addTasks = async (e) => {
    e.preventDefault();
  
    try{
      const res = await axios.post("http://localhost:3000/todos", {
        task: taskInput
      })
      setItemObject(res.data)
      setTaskInput("")
      if(res.data){
        setItemsList([ itemObject, ...itemsList])

      }
    }catch(err){
      alert(err)
    }
  }

  useEffect(() => {
    getTasks();
  }, [itemObject])

  return (
    <div className="todo-container">
      <h1 className="title">ToDo List</h1>
      <form onSubmit={addTasks}>
        <input
          type="text"
          placeholder="Adicione uma tarefa"
          onChange={(e)=>setTaskInput(e.target.value)}
          value={taskInput}
          minLength="3"
          required
        />

        <button className="adicionar" type="submit">Adicionar</button>
      </form>

        <TaskList itemsList={itemsList}/>
    <div>
  
    </div>
    </div>

  );
}

export default Todo;
