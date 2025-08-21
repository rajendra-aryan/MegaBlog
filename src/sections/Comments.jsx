import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToast } from '../store/notificationsSlice'
import { setComments, addComment, setLoading, setError } from '../store/commentsSlice'
import commentsService from '../appwrite/comments'
import config from '../config/config'

export default function Comments({ postId }){
    const dispatch = useDispatch()
    const user = useSelector((s) => s.auth.userData)
    const comments = useSelector((s) => s.comments.byPostId[postId]) || []
    const isLoading = useSelector((s) => s.comments.isLoadingByPost[postId])
    const [text, setText] = useState("")

    useEffect(() => {
        let mounted = true
        if (!config.AppWriteCommentsCollectionId) {
            dispatch(setLoading({ postId, isLoading: false }))
            return
        }
        dispatch(setLoading({ postId, isLoading: true }))
        commentsService.listComments(postId, { limit: 10 })
            .then((res) => { if (mounted) dispatch(setComments({ postId, comments: res?.documents || [] })) })
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
        if (!config.AppWriteCommentsCollectionId) {
            dispatch(addToast({ type: 'warning', message: 'Comments backend not configured yet' }))
            return
        }
        const created = await commentsService.createComment({ postId, text: text.trim(), authorId: user.$id, authorName: user.name })
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