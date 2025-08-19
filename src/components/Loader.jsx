import React from 'react'

export default function Loader({ label = 'Loading...' }) {
    return (
        <div className="w-full flex items-center justify-center py-10">
            <div className="flex items-center gap-3 text-gray-600">
                <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>{label}</span>
            </div>
        </div>
    )
}

