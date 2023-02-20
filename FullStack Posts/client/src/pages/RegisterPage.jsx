import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, registerUser } from '../redux/auth/authSlice'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const {status} = useSelector((state)=>state.auth)
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()

  useEffect(()=>{
    if (status) {
      toast(status)
    }
    if (isAuth) {
      navigate('/')
    }
  },[status, isAuth, navigate])
  const handleSubmit = () =>{
    try {
      dispatch(registerUser({username, password}))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={e => e.preventDefault()}
    className=" w-1/4 h-60 mx-auto mt-40">
      <h1
      className=' text-white text-center text-lg'
      >Регистрация</h1>
      <label className=' text-xs text-gray-400'> 
        Username:
        <input type='text' 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder='username'
        className=' mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-8 text-xs outline-none placeholder:text-gray-700'/>
      </label>
      <label className=' text-xs text-gray-400'> 
        Password:
        <input type='password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password'
        className=' mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-8 text-xs outline-none placeholder:text-gray-700'/>
      </label>

      <div className=' flex gap-8 justify-center mt-4'>
        <button type='submit'
        onClick={handleSubmit}
        className=' flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
        >Подтвердить</button>
        <Link to='/login'
        className=' flex justify-center items-center text-white text-xs'
        >Уже зарегистирированы??</Link>
      </div>

    </form>
  )
}
