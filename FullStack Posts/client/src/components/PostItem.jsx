import React from 'react'
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from 'react-moment'
import { Link } from 'react-router-dom';

export const PostItem = ({post}) => {
  if (!post) {
    return(
      <div className=' text-white text-center'>
        LOADING...
      </div>
    )
  }
  return (
    <Link to={`/${post._id}`}>
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
      <div className=' flex items-center gap-3 mt-2'>
        <button className=' flex text-white justify-center gap-2 text-xs opacity-50'>
          <AiFillEye/><span>{post.views}</span>
        </button>
        <button className=' flex text-white justify-center gap-2 text-xs opacity-50'>
          <AiOutlineMessage/><span>{post.comments?.lenght || 0}</span>
        </button>
      </div>
    </div>
    </Link>
  )
}
