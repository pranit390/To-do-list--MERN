import axios from "axios"

const API_URL = "http://localhost:3000/todos/"

async function createTodo(task,expextedTime,creationTime,currentTime) {
  const { data: newTodo } = await axios.post(API_URL, {
    task,
    expextedTime,
   creationTime,
   currentTime,
  });
  return newTodo
}



async function deleteTodo(id) {
  const message = await axios.delete(`${API_URL}${id}`)
  return message
}

async function updateTodo(id, payload) {
  const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload)
  return newTodo
}

async function getAllTodos() {
  const { data: todos } = await axios.get(API_URL)
  return todos
}

async function getAllCompletedTodos() {
  const { data: todos } = await axios.get("http://localhost:3000/completed/")
  return todos
}

async function getAllPriorityTodos() {
  const { data: todos } = await axios.get("http://localhost:3000/priority/")
  return todos
}

export default { createTodo, deleteTodo, updateTodo, getAllTodos,getAllCompletedTodos,getAllPriorityTodos };