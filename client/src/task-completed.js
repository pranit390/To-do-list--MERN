import React, { useState, useEffect } from "react"
import "./App.css"
import APIHelper from "./api-helper"
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


export const CompletedTask= () => {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
  
    const getAll=()=>{
      const fetchTodoAndSetTodos = async () => {
        const todos = await APIHelper.getAllCompletedTodos()
        setTodos(todos)
      }
      fetchTodoAndSetTodos()
    }

    const deleteTodo = async (e, id) => {
      try {
       
        e.stopPropagation()
        await APIHelper.deleteTodo(id)
        setTodos(todos.filter(({ _id: i }) => id !== i))
      } catch (err) {}
    }
    
return(
 <>
 <h1>Task </h1>
 <Button variant="primary"  onClick={getAll}>Click To Get Task</Button>
 <br></br>

 <Table striped bordered hover variant="dark">
  <thead>
    <tr>
     
      <th>Task</th>
      <th>Creation Time</th>
      <th>Expected Time</th>
      <th>Delete Button</th>
    </tr>
  </thead>
  <tbody>
  {todos.map(({ _id, task, currentTime,expextedTime }, i) => (
  
  <tr>
  <td>{task}</td>
  <td>{currentTime}</td>
  <td>{expextedTime}</td>
  <td><Button variant="primary" id='delete' onClick={e => deleteTodo(e, _id)}>Delete</Button> </td>
 
</tr>
))

}
  
   
  </tbody>
</Table>


 </>)
 

        }