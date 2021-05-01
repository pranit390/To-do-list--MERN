import React, { useState, useEffect } from "react"
import "./App.css"
import APIHelper from "./api-helper"
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';


export const Home=()=>{


    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [time,setTime]=useState("")
  
   

    useEffect(() => {
      const fetchTodoAndSetTodos = async () => {
        const todos = await APIHelper.getAllTodos()
        setTodos(todos)
      }
      fetchTodoAndSetTodos()
    }, [])

    const createTodo = async e => {

        var d = new Date();
        var currentHours = d.getHours();
      
      e.preventDefault()
      if (!todo) {
        alert("please enter something")
        return
      }
      if (todos.some(({ task }) => task === todo)) {
        alert(`Task: ${todo} already exists`)
        return
      }
      const newTodo = await APIHelper.createTodo(todo,time,currentHours,d)
     
      setTodos([...todos, newTodo])

    
    }

  

    return(
<>
<Form onSubmit={createTodo}>
  <Form.Group 
          onChange={({ target }) => setTodo(target.value)}>
    <Form.Label>Task</Form.Label>
    <Form.Control type="text" placeholder="Enter Task" />
    <Form.Text className="text-muted">
     Enter the task
    </Form.Text>
  </Form.Group>

  <Form.Group 
  onChange={({ target }) => setTime(target.value)}>
    <Form.Label>TotalTimeSeconds</Form.Label>
    <Form.Control type="number" placeholder="Hours" />
  </Form.Group>
 
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
 </>
    )
}