import React, { useState, useEffect } from "react"
import "./App.css"
import APIHelper from "./api-helper"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


export const Priority= () => {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
  
    const getAll=()=>{
      const fetchTodoAndSetTodos = async () => {
        const todos = await APIHelper.getAllPriorityTodos()
        setTodos(todos)
      }
      fetchTodoAndSetTodos()
    }


    
return(
 <>
 <h1>Task </h1>
 <Button variant="primary"  onClick={getAll}>Click To Get Priority Task</Button>
 <br></br>

 <Table striped bordered hover variant="dark">
  <thead>
    <tr>
     
      <th>Task</th>
      <th>Priority</th>
      <th>Expected Time</th>
    </tr>
  </thead>
  <tbody>
  {todos.map(({ _id, task,priority,expextedTime }, i) => (
  
  <tr>
  <td>{task}</td>
  <td>{priority+""}</td>
  <td>{expextedTime}</td>
 
</tr>
))

}
  
   
  </tbody>
</Table>


 </>)
 

        }