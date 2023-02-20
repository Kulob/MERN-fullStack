import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/auth/postSlice'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('') 
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.warn(error, 'submitHandler in AddPostPage');
    }
  }

  const clearSubmitHandler = () => {
    setTitle('')
    setText('')
  }
  return (
    <form
    className='w-1/3 mx-auto py-10'
    onSubmit={(e) => e.preventDefault()}>
      <label className=' text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer '>
        Прикрепить изображение:
        <input type='file' className=' hidden'
        onChange={(e) => setImage(e.target.files[0])}/>
      </label>
      <div className='flex object-cover py-2'>
        {
          image && (
           <img src={URL.createObjectURL(image)} alt={image.name} /> 
          )
        }
      </div>
      <label className=' text-xs text-white opacity-70'>
        Заголовок поста: 
        <input type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Заголовок поста'
        className=' mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-600'/>
      </label>
      <label className=' text-xs text-white opacity-70'>
        Текст поста: 
        <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Текст поста'
        className=' mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none h-40 resize-none placeholder:text-gray-600'/>
      </label>
      <div className=' flex justify-center items-center gap-5 mt-4'>
        <button
        onClick={submitHandler}
        className=' flex justify-center items-center bg-gray-500 text-xs text-white py-2 px-4 rounded-[5px] border border-double'>
          Добавить
        </button>
        <button 
        onClick={clearSubmitHandler}
        className=' flex justify-center items-center bg-red-500 text-xs text-white py-2 px-4 rounded-[5px] border border-double'>
          Отменить
        </button>
      </div>
    </form>
  )
}
