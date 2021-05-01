
import React, { useState, useEffect } from "react"
import "./App.css"
import APIHelper from "./api-helper"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ReactDOM from 'react-dom'
import { Priority } from "./priority";

export const Task= () => {
    const [todos, setTodos] = useState([])//task array
    const [todo, setTodo] = useState("")//
    const [updateTask,setUpdateTask]=useState("")//edit task
    const [updateTime,setUpdateTime]=useState("")//edit expected time
    
    //popup
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () =>setShow(true); 

    const [updateTaskId,setUpdateTaskId]=useState("")

    const newId=(id)=>{
     
      setUpdateTaskId(id)
     handleShow()
    }
    const [timeStamp,setTimeStamp]=useState("")
    const[expectedTime,setExpectedTime]=useState("")
    const[priorityId,setPriorityId]=useState("")
  
  
    const getAll=()=>{
      const fetchTodoAndSetTodos = async () => {
        const todos = await APIHelper.getAllTodos()
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
  
    const updateTodo = async (e, id) => {
      e.stopPropagation()
      const payload = {
        completed: !todos.find(todo => todo._id === id).completed,
      }
      const updatedTodo = await APIHelper.updateTodo(id, payload)
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
      getAll();
    }


    const updatePriority = async (id) => {
    
      const payload = {
        priority: true,
      }
      const updatedTodo = await APIHelper.updateTodo(id, payload)
      setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))
      
    }

    const updateNewTask= async (e, id) => {
   
        e.stopPropagation()
        const payload = {
          task: updateTask,
          expextedTime:updateTime,
        }
        const updatedTodo = await APIHelper.updateTodo(id, payload)
        setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)))

      }

     

   const calculateTimeLeft = () => {
       
        let difference = +new Date() - +new Date(timeStamp)
      
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
      }

   
   if(timeLeft.seconds>=expectedTime/2){
       updatePriority(priorityId);
   }
    return timeLeft;
    }  
    

    const [timeLeft, setTimeLeft] = useState({});
    
    
    // useEffect(() => {
    //   const timer=setTimeout(() => {
    //     setTimeLeft(calculateTimeLeft());
        
    //   }, 1000);
    //   // Clear timeout if the component is unmounted
    //   return () => clearTimeout(timer);
    // });
    // const timerComponents = [];

    // Object.keys(timeLeft).forEach((interval) => {
    //   if (!timeLeft[interval]) {
    //     return;
    //   }
    
    //   timerComponents.push(
    //     <span>
    //       {timeLeft[interval]} {interval}{" "}
    //     </span>
    //   );
    // });
   
    
  
    
    
    

return(

<>
<h1>Task </h1>

 
 <div>
    {" Days: "+timeLeft.days+" /Hours: "+timeLeft.hours+" /min: "+timeLeft.minutes+" /seconds: "+timeLeft.seconds}
 </div>  
 
 <Button variant="primary"  onClick={getAll}>Click To Get Task</Button>
 <br></br>

  <Table striped bordered hover variant="dark">
  <thead>
    <tr>
     
      <th>Task</th>
      <th>Creation Time</th>
      <th>Expected Time</th>
      <th>Delete Button</th>
      <th>Edit Button</th>
      <th>complete</th>
      <th>Time left</th>
      <th>Priority</th>

    </tr>
  </thead>
  <tbody>
  {todos.map(({ _id, task,priority,expextedTime,currentTime }, i) => (
  
  <tr>
  <td>{task}</td>
  <td>{currentTime}</td>
  <td>{expextedTime}</td>
  
  <td><Button variant="primary" id='delete' onClick={e => deleteTodo(e, _id)}>Delete</Button> </td>
  <td>  <Button variant="primary" id='edit' onClick={e=>newId(_id)} >Edit</Button></td>
  <td>  <Button variant="primary" id='complete' onClick={e => updateTodo(e, _id)} >complete</Button></td>
  <td>  <Button variant="primary" id='complete' onClick={e => {setTimeStamp(currentTime);setExpectedTime(expextedTime);setPriorityId(_id)
setTimeLeft( calculateTimeLeft()) }
  } >progress</Button></td>
  <td>{priority+""}</td>
 
 
 
</tr>
))

}
</tbody>
</Table>

  <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Fill updates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={e=>updateNewTask(e,updateTaskId)}>
            <Form.Group controlId="formBasicEmail" 
                    onChange={({ target }) => setUpdateTask(target.value)}>
              <Form.Label>Task</Form.Label>
              <Form.Control type="text" placeholder="Enter Task" />
              <Form.Text className="text-muted">
               Enter the task
              </Form.Text>
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword"
            onChange={({ target }) => setUpdateTime(target.value)}>
              <Form.Label>TotalHours</Form.Label>
              <Form.Control type="number" placeholder="Hours" />
            </Form.Group>
           
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>



     
 
 
 </>
 
 )


        }


       
      
      