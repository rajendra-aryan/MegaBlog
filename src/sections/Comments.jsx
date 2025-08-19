import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToast } from '../store/notificationsSlice'
import { setComments, addComment, setLoading, setError } from '../store/commentsSlice'

// Placeholder local service until Appwrite collection for comments is added
// You should replace these with Appwrite Databases documents calls
const fakeApi = {
    async list(postId){
        const key = `comments:${postId}`
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : []
    },
    async create(postId, payload){
        const key = `comments:${postId}`
        const list = await this.list(postId)
        const created = { id: String(Date.now()), createdAt: Date.now(), ...payload }
        const next = [...list, created]
        localStorage.setItem(key, JSON.stringify(next))
        return created
    }
}

export default function Comments({ postId }){
    const dispatch = useDispatch()
    const user = useSelector((s) => s.auth.userData)
    const comments = useSelector((s) => s.comments.byPostId[postId]) || []
    const isLoading = useSelector((s) => s.comments.isLoadingByPost[postId])
    const [text, setText] = useState("")

    useEffect(() => {
        let mounted = true
        dispatch(setLoading({ postId, isLoading: true }))
        fakeApi.list(postId)
            .then((list) => { if (mounted) dispatch(setComments({ postId, comments: list })) })
            .catch((e) => dispatch(setError({ postId, error: e?.message || 'Failed to load comments' })))
            .finally(() => mounted && dispatch(setLoading({ postId, isLoading: false })))
        return () => { mounted = false }
    }, [dispatch, postId])

    const submit = async (e) => {
        e.preventDefault()
        if (!user) {
            dispatch(addToast({ type: 'warning', message: 'Login to comment' }))
            return
        }
        if (!text.trim()) return
        const created = await fakeApi.create(postId, { text: text.trim(), authorId: user.$id, authorName: user.name })
        dispatch(addComment({ postId, comment: created }))
        setText("")
        dispatch(addToast({ type: 'success', message: 'Comment added' }))
    }

    return (
        <div className='max-w-3xl mx-auto mt-10'>
            <h2 className='text-xl font-bold mb-3'>Comments</h2>
            <form onSubmit={submit} className='mb-4 flex gap-2'>
                <input
                    className='flex-1 border rounded px-3 py-2'
                    placeholder='Write a comment...'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded'>Post</button>
            </form>
            {isLoading ? (
                <div className='text-gray-500'>Loading comments...</div>
            ) : comments.length === 0 ? (
                <div className='text-gray-500'>No comments yet.</div>
            ) : (
                <ul className='space-y-3'>
                    {comments.map((c) => (
                        <li key={c.id} className='bg-gray-100 rounded p-3'>
                            <div className='text-sm text-gray-600 mb-1'>{c.authorName} • {new Date(c.createdAt).toLocaleString()}</div>
                            <div>{c.text}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

