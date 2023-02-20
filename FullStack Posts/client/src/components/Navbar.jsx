import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, logout } from '../redux/auth/authSlice'

export const Navbar = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const activeStyles = {
    color: 'white',
  }
  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
  }
  return (
    <div className=' flex py-4 justify-between items-center'>
      <Link to='/' className=' flex justify-center items-center w-20 h-[30px] bg-gray-600 ml-10 text-xs text-white rounded-sm'>
        Kulob
      </Link>
      {
        isAuth && (
          <ul className=' flex gap-8'>
        <li>
          <NavLink to='/' 
          style={({isActive}) => isActive ? activeStyles : undefined}
          className=' text-xs text-gray-400 hover:text-white'>
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink to='post' 
          style={({isActive}) => isActive ? activeStyles : undefined}
          className=' text-xs text-gray-400 hover:text-white'>
            Мои посты
          </NavLink>
        </li>
        <li>
          <NavLink to='new' 
          style={({isActive}) => isActive ? activeStyles : undefined}
          className=' text-xs text-gray-400 hover:text-white'>
            Добавить пост
          </NavLink>
        </li>
      </ul>
        )
      }
      <div className=' flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {isAuth ? (<button onClick={logoutHandler}>Выйти</button>) : (
          <Link to='/login'>Войти</Link>
        )}
      </div>
    </div>
  )
}
