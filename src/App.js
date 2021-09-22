import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Input from "./components/input"
import Todo from './components/todo';

function App() {

  const baseurl = "http://localhost:8080"

  // set이 붙는 것은 앞에 것을 수정할 수 있게 해주는 것
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    await axios.get(baseurl + "/todo")
               .then((Response) => {
                 console.log(Response.data)
                 setTodos(Response.data);
                })
                .catch((error) => {
                  console.error(error);
                })
  } // getTodos() 끝

  function insertTodo(e) {
    // 새로 고침을 막는 부분
    e.preventDefault();

    const insertTodo = async () => {
      // postMethod로 localhost:8080에 todo를 붙이고, todoName 객체를 URI에 붙혀서 보내는데, input으로 보낸다.
      await axios.post(baseurl + "/todo", {todoName : input})
                 .then((Response) => {
                   console.log(Response.data)
                   setInput("");
                   getTodos();
                 })
                 .catch((error) => {
                   console.error(error);
                 })
    }

    insertTodo();
    alert("할일이 정상적으로 추가 되었습니다!");
  }

  function updateTodo(id) {
    const updateTodo = async () => {
      await axios.put(baseurl + "/todo/" + id, {})
                 .then((response) =>{
                   setTodos(todos.map((todo) => 
                    todo.id === id ? { ...todo, completed: !todo.completed} : todo
                   )
                  )
                   //화면에서만 바꿔주게 한다. DB까지 접근하지 않는다.
                 })
                 .catch((error) => {
                   console.error(error);
                 })
    }
    updateTodo();
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios.delete(baseurl + "/todo/" + id, {})
                 .then((response) =>{
                   setTodos(
                     todos.filter((todo) => todo.id !== id) 
                   )  
                 })
                 .catch((error) => {
                   console.error(error);
                 })
    }
    deleteTodo();
  }

  function inputText(e) {
    // 새로 고침을 막는 부분
    e.preventDefault();
    // useState가 공백으로 설정되어 있는데, 아래 input에 value가 input이다 보니 
    // Text를 넣어도 Value가 바뀌지 않는다.
    setInput(e.target.value)
  }

  return ( // 화면이 실제 보이는 부분
    <div className="App">
      <h1>TODO List</h1>
      <Input handleSumit={insertTodo} input={input} handleInput={inputText} />

      {/* 리엑트 반복문 */}
      {/* 삼항 연산자로 tods에 값이 있으면 map()을 통해 todo를 전달하여 todo안에 todoName을 반환한다. */}
      {
        todos ? todos.map((todo) => {
          return (
            <Todo key={todo.id} todo={todo} handleUpdate={() => 
              updateTodo(todo.id)} 
              handleDelte={() => 
                deleteTodo(todo.id)}/>
          )
        }) : null
      }

    </div>
  );
}

export default App;
