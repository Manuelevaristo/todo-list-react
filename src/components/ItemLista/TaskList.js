import React from "react";
import './TaskList.css'
import {Link} from "react-router-dom"
// import { tasks } from "../../mocks/tasks"




const TaskList = ({itemsList}) =>{
  

    return(

        <ul className="todo-list">
        {itemsList.map((task, index) => (
          <>
          <Link to={`/single/${task.id}`}>
            <li key={index}>{task.task} </li>
          </Link>
          </>
        ))}
      </ul>
    )
}

export default TaskList;