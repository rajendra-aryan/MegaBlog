import React from 'react'
import { Container } from '../components'
import { Link } from 'react-router-dom'

export default function NotFound(){
    return (
        <div className='w-full py-16'>
            <Container>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold mb-2'>Page not found</h1>
                    <p className='text-gray-600 mb-6'>The page you are looking for does not exist.</p>
                    <Link to='/' className='inline-block px-6 py-3 bg-blue-600 text-white rounded'>Go home</Link>
                </div>
            </Container>
        </div>
    )
}

