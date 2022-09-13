import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Item from "./component/Item";
import { FcPlus } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";


function App() {

  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");


  //Create a function to fetch all todo items from database
  useEffect(() => {
    axios.get("/get-task")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  })


  //Create a function to add new todo item to database
  const addAndUpdateTask = async () => {
    if (isUpdating === "") {
      try {
        const res = await axios.post('/save-task', { text: text })

        console.log(res);
        //! after submit clear input box
        setText("");
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.post('/update-task', { id: isUpdating, text: text })

        console.log(res.data);
        //! after submit clear input box
        setText("");
        setUpdating("");

      } catch (err) {
        console.log(err);
      }
    }
  }

  //Create a function to Delete item when click on delete
  const deleteTask = async (id) => {
    try {
      const res = await axios.post(`/delete-task`, { id: id })
      
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const updateTask = (id, text) => {
    setUpdating(id);
    setText(text);
  }

  return (
    <div className="container">
      <div className="todo_header">
        <h1>What are you going to do today <FcAssistant size={30}/></h1>
        <div className="top">
          <input type="text" placeholder="Add Task ..." value={text} onChange={(e) => { setText(e.target.value) }} />

          <div className="button"
            onClick={addAndUpdateTask}>{isUpdating ? "Update" : "Add"}
            <FcPlus size={20} />
          </div>
        </div>
      </div>

      <div className="list">
        {todo.map((item) => (
          <Item
            key={item._id}
            text={item.text}
            remove={() => deleteTask(item._id)}
            update={() => updateTask(item._id, item.text)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
