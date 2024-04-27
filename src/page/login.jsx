import React, { useState } from 'react'
import Input from '../component/input'
import Button from '../component/button'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { login as authlogin } from '../store/authslice.js';
import axios from 'axios'
// import './signup.css'

function login() {
    const[error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} =  useForm()

    const already = async(data) => {

        // console.log(data.email, data.password);
        setError("")
        try {
            // console.log("hogaya");
            const response = await axios.post('https://todo-fullstack-app-backend.onrender.com/api/v1/users/login', data, {
              withCredentials: true
          });
            
            if (response) {
              await axios.post('https://todo-fullstack-app-backend.onrender.com/api/v1/users/getCurrentUser', {}, {
                withCredentials: true,
              }).then((userDat) => {
                if (userDat) {
                  const userData = userDat.data.data
                  dispatch(authlogin({userData}))
                }
                // console.log(userDat.data.data)
                navigate("/")
              })
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

  return (
    <>
    <div className='text-2xl text-gray-800 font-semibold mt-5 ml-24 '>Login account</div>
    <div className='w-48 ml-24 bg-gray-600 mt-2 h-0.5'></div>
    <div  className='flex justify-center mt-16'>

      <form onSubmit={handleSubmit(already)} id='form'>
      <div>{error && <p className='text-red-600 mb-5 text-center'>{error}</p>}</div>
        <div className=''></div>
        <Input 
        className1=" mb-5"
        className2=" mb-8"
        type="email"
        label="Enter e-mail: "
        placeholder="Email address"
        {...register("email", {
        required: true,
        validate: {
            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            "Email address must be a valid address",
        }
        })}
        />
        <Input 
        type="password"
        label="Password:"
        placeholder="*************"
        className1=" mb-5"
        className2=" mb-8"
        {...register("password", {
            required: true,
        })}
        />
        <div className='flex justify-center mt-2 mb-7'><p className='text-xl font-normal'>Don't have an Account? <Link className='font-semibold' to="/signup">Sign up</Link></p></div>
        <Button
        type='submit'
        className='w-full mb-16 mt-8 hover:bg-blue-600'
        >Sign in</Button>
      </form>
    </div>
    </>
  )
}

export default login

