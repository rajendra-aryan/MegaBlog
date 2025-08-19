import React from 'react'
import appwriteService from "../appwrite/notdb"
import {Link} from 'react-router-dom'
import {Img} from "react-image"

function PostCard({$id, title, featuredImage}) {
  const imgUrl = appwriteService.getFileView(featuredImage)
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 shadow-sm hover:shadow transition-shadow duration-200 border border-gray-100'>
            <div className='w-full justify-center mb-4 aspect-video overflow-hidden rounded-lg bg-gray-50'>
                <img 
                src={imgUrl}
                loader={<div>Loading...</div>} 
                alt={title}
                className='w-full h-full object-cover' />

            </div>
            <h2
            className='text-lg font-semibold text-gray-900'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard