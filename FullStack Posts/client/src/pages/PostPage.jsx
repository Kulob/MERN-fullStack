import axios from '../utills/axios';
import React from 'react'
import { useCallback } from 'react';
import { AiFillEye, AiOutlineMessage,AiFillDelete, AiTwotoneEdit  } from "react-icons/ai";
import Moment from 'react-moment'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { removePost } from '../redux/auth/postSlice';
import { toast } from 'react-toastify';
import { createComment } from '../redux/auth/commentSlice';
import { CommentItem } from "../components/CommentItem";
import { getPostComments } from "../redux/auth/commentSlice";

export const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')

  const params = useParams()
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const commentPost = useSelector((state) => state.comments.comment)

  const fetchPost = useCallback (async () =>{
    const {data} = await axios.get(`/posts/${params.id}`)
    setPost(data)
  },[params.id])

  useEffect(() => {
    fetchPost()
  },[fetchPost])

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      toast('Пост был удален!')
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = () => {
    try {
        const postId = params.id
        dispatch(createComment({ postId, comment }))
        setComment('')
    } catch (error) {
        console.log(error)
    }
}

  const fetchComments = useCallback(async () => {
    try {
        dispatch(getPostComments(params.id))
    } catch (error) {
        console.log(error)
    }
}, [params.id, dispatch])

useEffect(() => {
  fetchComments()
}, [fetchComments])
  if (!post) {
    return (
      <div className=' text-white text-center py-18'>
        LOADING...
      </div>
    )
  }

  return (
    <div>
    <button className='flex justify-center items-center ml-10 bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
      <Link className='flex' to={'/'}>
         Назад
      </Link>
    </button>
    <div className=' flex gap-10 py-8'>
      <div className=' w-2/3'>
      <div className=' flex flex-col basis-1/4 flex-grow'>
      <div className={
        post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
      }>
        {post.imgUrl && (
          <img src={`http://localhost:5001/${post.imgUrl}`}
          alt='img'
          className=' w-full object-cover'/>
        )}
      </div>
      <div className=' flex justify-between items-center pt-2'>
        <div className=' text-xs text-white opacity-50'>
          {post.username}
          </div>
        <div className=' text-xs text-white opacity-50'>
          <Moment data={post.createdAt} format='D MMM YYYY'/>
          </div>
      </div>
      <div className=' text-white text-xl'>{post.title}</div>
      <p className=' text-white opacity-60'>{post.text}</p>
      <div className=' flex items-center gap-3 mt-2 justify-between'>
        <div>
        <button className=' flex text-white justify-center gap-2 text-xs opacity-50'>
          <AiFillEye/><span>{post.views}</span>
        </button>
        <button className=' flex text-white justify-center gap-2 text-xs opacity-50'>
          <AiOutlineMessage/><span>{post.comments?.lenght || 0}</span>
        </button>
        </div>
        <div className=' flex gap-3'>
          
        <button className=' flex text-white justify-center gap-2 text-lg opacity-50'>
        <Link to={`/${params.id}/edit`}>
          <AiTwotoneEdit />
        </Link>
        </button>
        <button onClick={removePostHandler} className=' flex text-white text-lg justify-center gap-2 opacity-50'>
          <AiFillDelete />
        </button>
        </div>
      </div>
    </div>
      </div>
      <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
                    <form
                        className='flex gap-2'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Comment'
                            className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
                        />
                        <button
                            type='submit'
                            onClick={handleSubmit}
                            className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
                        >
                            Отправить
                        </button>
                    </form>

                    {commentPost?.map((cmt) => (
                        <CommentItem key={cmt._id} cmt={cmt} />
                    ))}
                </div>
    </div>
    </div>
  )
}
