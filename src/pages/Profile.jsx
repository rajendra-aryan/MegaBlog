import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../components'

export default function Profile(){
    const user = useSelector((state) => state.auth.userData)
    if (!user) return null
    return (
        <div className='w-full py-10'>
            <Container>
                <div className='max-w-xl mx-auto bg-gray-100 rounded-xl p-6'>
                    <h1 className='text-2xl font-bold mb-4'>Your Profile</h1>
                    <div className='space-y-2'>
                        <div><span className='font-semibold'>Name:</span> {user.name}</div>
                        <div><span className='font-semibold'>Email:</span> {user.email}</div>
                        <div><span className='font-semibold'>User ID:</span> {user.$id}</div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

