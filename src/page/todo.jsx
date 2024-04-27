import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux'

import TodoCard from '../component/todoCard';


function todo() {
    const [tod, setTodo] = useState([]);
    const [map, setMap] = useState("");
    // console.log("todo page", tod);

    const active = useSelector(state => state.auth.status)

    useEffect(() => {
        axios.post('https://todo-fullstack-app-backend.onrender.com/api/v1/todo/getTodo', {}, {
            withCredentials: true,
        })
        .then((todos) => setTodo(todos.data.data))
    }, [])

    const add = async(e) => {
      e.preventDefault()
      
      await axios.post('https://todo-fullstack-app-backend.onrender.com/api/v1/todo/createTodo', {content: map, complete: false}, {
        withCredentials: true,
      })

      window.location.reload()

    }

  return (
    <div className='mx-52 bg-[#172842]  mt-10 pb-10'>
      <div className='mx-72'>
        <div className='text-white text-2xl font-semibold flex justify-center pt-8'>Your Todo's</div>
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border text-white border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 mt-8"
                value={map}
                onChange={(e) => setMap(e.target.value)}
            />
            <button type='submit' className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 mt-8">
                Add
            </button>
        </form>
        <div>
            {tod.length > 0 && tod.map((todo) => (
                <div key={todo._id} >
                    <TodoCard {...todo} />
                </div>
        ))}
        {!active && <div className='text-white text-xl mt-10'>First Login to access your todos...</div>}
        </div>
      </div>
    </div>
  )
}

export default todo
