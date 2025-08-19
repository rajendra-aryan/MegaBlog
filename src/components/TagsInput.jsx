import React, { useState } from 'react'

export default function TagsInput({ value, onChange, placeholder = 'Add a tag and press Enter' }){
    const [input, setInput] = useState('')
    const tags = Array.isArray(value) ? value : []

    const addTag = (t) => {
        const tag = t.trim()
        if (!tag) return
        if (tags.includes(tag)) return
        onChange?.([...tags, tag])
        setInput('')
    }

    const removeTag = (tag) => {
        onChange?.(tags.filter((x) => x !== tag))
    }

    return (
        <div>
            <div className='flex flex-wrap gap-2 mb-2'>
                {tags.map((tag) => (
                    <span key={tag} className='inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                        {tag}
                        <button type='button' className='text-blue-800 hover:text-blue-900' onClick={() => removeTag(tag)}>×</button>
                    </span>
                ))}
            </div>
            <input
                className='w-full border rounded px-3 py-2'
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        addTag(input)
                    }
                }}
            />
        </div>
    )
}

