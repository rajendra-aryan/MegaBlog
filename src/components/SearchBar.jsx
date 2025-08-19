import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm, setCategory, setTags } from '../store/filtersSlice'
import TagsInput from './TagsInput'

const CATEGORIES = ["", "Tech", "Lifestyle", "News", "Tutorials"]

export default function SearchBar(){
    const dispatch = useDispatch()
    const { searchTerm, category } = useSelector((s) => s.filters)

    return (
        <div className='w-full flex flex-wrap items-center gap-3 mb-6'>
            <input
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className='flex-1 min-w-[200px] border rounded px-3 py-2'
                placeholder='Search posts...'
            />
            <select
                value={category}
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className='border rounded px-3 py-2'
            >
                {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c === '' ? 'All Categories' : c}</option>
                ))}
            </select>
            <div className='min-w-[240px] flex-1'>
                <TagsInput
                    value={useSelector((s) => s.filters.tags)}
                    onChange={(tags) => dispatch(setTags(tags))}
                    placeholder='Filter tags (press Enter)'
                />
            </div>
        </div>
    )
}

