import React, { useState } from 'react'
import image from './image/form.png';
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout as log } from "../store/authslice.js"
import img1 from './image/account.png'
import '../App.css'

import axios from 'axios';
// import  {Logoutbtn}  from '../index';
// import '../signup.css';

function header() {
    const [value, setValue] = useState()
    const [main, setMain] = useState([])
    // const dispatch = useDispatch();
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const addtodo = () => {
        if(value=== ""){
            alert("first add somthing");
        }else {
            setMain([...main, value]);
            setValue("");
        }
    }

    const logout = async() => {
        try {
            await axios.post("https://todo-fullstack-app-backend.onrender.com/api/v1/users/logout", {}, {
            withCredentials: true
            })
        dispatch(log())
        navigate("/login")
        } catch (error) {
            console.log(error.response.data.message)
        }   
    }

    const active = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData);
    // console.log("header", userData);

    const navitem= [
        {
            name:"My todo",
            url: "/",
            status: true
        },
        {
            name:" Login ",
            url: "/login",
            status: !active
        },
        {
            name:" signup ",
            url: "/signup",
            status: !active
        },
    ]
  return (
    <>
        <div className='w-full py-4 pl-4 bg-[#264573] flex'>
            <Link to="/"><img src={image} width="50" alt="logo" className='sm:ml-2  xl:ml-20' /></Link>

            <ul className='flex ml-auto'>
            {navitem.map((item) =>
                item.status ? (
                    <li key={item.name}>
                        <button id={item.name} onClick={() => navigate(item.url)}
                        className={` inline-block sm:mx-0 fancy-underline  sm:px-1 py-2 duration-200 sm:text-lg lg:text-xl sm:mr-10 mr-5 lg:mr-20 font-serif text-white rounded-full`}
                        >
                            {item.name}
                        </button>
                    </li>
                ) : null
            )}
            {active &&
                <li>
                    <button onClick={logout}
                        className='inline-block sm:mx-5 mx-0 sm:px-6 px-3 py-2 duration-200 sm:text-xl  sm:mr-20 mr-2 font-serif text-white rounded-full'
                        >
                            Logout
                    </button>
                </li>
                
            }
            {active &&
                <li>
                    <img className='sm:w-9 w-8 sm:ml-6 sm:mt-0 mt-1 ml-5' src={img1}/>
                    <div className=' sm:mr-8 mr-2'>
                        <h1 className='font-serif text-white sm:text-lg text-xs sm:mt-0 mt-1 sm:block hidden'>Tushar saini</h1>
                    </div>
                </li>
            }
            </ul>
        </div>
    </>

// { userData &&   //{userData.fullName}
    
  )
}

export default header

