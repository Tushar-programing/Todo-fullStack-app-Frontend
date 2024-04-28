import React, {useEffect, useState, useCallback} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import axios from "axios"
import { login } from '../store/authslice';
import  Input from  '../component/input'
import Button from '../component/button'
// import './signup.css'

function signup() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate();
  const [error, setError] = useState("") //Ther user does exist with this email
  const  dispatch = useDispatch()

  const create = async(data) => {
    setError("")
    try {
      // console.log("complete 1");
      const userData = await axios.post('https://todo-fullstack-app-backend.onrender.com/api/v1/users/register', data, {
        withCredentials: true
      })
      // console.log("complete 1");
      if(userData) {
        navigate("/login")
      }
    } catch (error) {
      if(error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Network Error")
      }
    }
  }
  
  return (
    <div>
      <div className=''>
        <h1 className='sm:text-2xl text-xl text-gray-800 font-semibold mt-5 ml-24 '>Register Account</h1>
        <div className='sm:w-48 w-40 ml-24 bg-gray-600 sm:mt-2 mt-0 h-0.5 sm:mb-0 mb-9'></div>
      </div>
      
      <div className='flex justify-center sm:mx-0 mx-7'>
        <form onSubmit={handleSubmit(create)} id='form' >
         
          <div className={` ${error? 'mb-5': 'mb-10'} font-semibold sm:text-lg  justify-center sm:flex hidden`}>
            Your Personal Detail
          </div>

          <div>{error && <p className='text-red-600 sm:mt-4 mt-0 sm:mb-4 mb-2 text-center'>{error}</p>}</div>
          <Input 
            label="Full Name: "
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Enter your Full Name'
            {...register("fullName", {     //here name is keyword
                required: true,
            })}
          />
          <Input 
            label="E-mail :"
            type="email"
            className1=" mb-5"
            className2=" mb-8"
            placeholder='Enter your E-mail'
            {...register("email", {     //here name is keyword
            required: true,
            validate: {
              matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Email address must be a valid address",
            }
            })}
          />
          <div className='mb-4 font-semibold text-lg justify-center sm:flex hidden'>
            Your Password
          </div>
          <Input 
            label="Password: "
            type="password"
            className1=" mb-5"
            className2=" mb-5"
            placeholder='Enter your password'
            {...register("password", {     //here name is keyword
                required: true,
            })}
          />
          <div className='flex justify-center mt-2 mb-7'><p className='text-xl font-normal'>Already have an Account? <Link className='font-semibold' to="/login">Sign in</Link></p></div>
          <Button className={`sm:w-full w-40 sm:ml-0 ml-20 ${error? 'mt-2' : 'mt-4'} mb-10 text-lg hover:bg-blue-600`} type="submit">Create Account</Button>
          
        </form>
      </div>
      
    </div>
  )
}

export default signup;
