import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Header from './component/header'
// import { login } from './store/authslice'
import { login, logout } from './store/authslice.js'

// import { logout } from './store/authslice'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

    const [todo, setTodo] = useState();

    useEffect(() => {
        axios.post('https://todo-fullstack-app-backend.onrender.com/api/v1/users/getCurrentUser', {}, {
          withCredentials: true,
        }).then((userDat) => {
            const userData = userDat.data.data;
            // console.log("this is userData", userData);
            if (userData) {
              dispatch(login({userData}))
            } else {
              dispatch(logout())
            }
        })
    }, [])

  return (
    <>
    <Header />
    <main>
    <Outlet />
    </main>
    </>
  )
}

export default App
