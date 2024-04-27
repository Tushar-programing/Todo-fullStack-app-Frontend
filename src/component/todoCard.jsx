import axios from 'axios';
import React, { useState, useEffect } from 'react'

function todoCard(todo) {
    // console.log("todoCard", todo);
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState("");
    const [todoCom, setTodoCom] = useState();
    
    useEffect(() => {
        setTodoMsg(todo.content || ""); 
        setTodoCom(todo.complete || false)
        // console.log("todocom", todoCom);
    }, [todo]);

    const toggleCompleted = async() => {
        await axios.post(`https://todo-fullstack-app-backend.onrender.com/api/v1/todo/updateComplete/${todo._id}`, {complete: !todoCom}, {
            withCredentials: true,
        })
        setTodoCom(!todoCom);
    }

    const editTodo = async() => {
        // console.log(todo._id);
        await axios.post(`https://todo-fullstack-app-backend.onrender.com/api/v1/todo/updateContent/${todo._id}`, {content: todoMsg}, {
            withCredentials: true,
        })
        setIsTodoEditable(false)
    }

    const deleteTodo = async() => {
        // console.log("deleting todo");
        await axios.post(`https://todo-fullstack-app-backend.onrender.com/api/v1/todo/deleteTodo/${todo._id}`, {}, {
            withCredentials: true,
        })
    }


  return (
    // <div className='text-2xl text-white'>
      <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 mt-2  text-black ${
                todoCom ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todoCom}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todoCom ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.complete) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.complete}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <form onSubmit={deleteTodo}>
                <button
                    className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                    type="submit"
                    >
                    ❌
                </button>
            </form>
        </div>
    // </div>
  )
}

export default todoCard
