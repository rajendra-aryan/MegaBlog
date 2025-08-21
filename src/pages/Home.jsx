import React, {useEffect} from 'react'
import appwriteService from "../appwrite/notdb";
import {Container, PostCard, SearchBar, Loader} from '../components'
import { setSearchTerm } from '../store/filtersSlice'
import { Query } from 'appwrite'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setPosts } from '../store/postsSlice'

function Home() {
    const dispatch = useDispatch()
    const postsState = useSelector((state) => state.posts)
    const posts = postsState.allIds.map((id) => postsState.byId[id])

    useEffect(() => {
        let mounted = true
        dispatch(setLoading(true))
        const queries = [Query.equal("status", "active")]
        appwriteService.getPosts(queries).then((res) => {
            if (!mounted) return
            if (res && res.documents) {
                dispatch(setPosts(res.documents))
            }
        }).finally(() => mounted && dispatch(setLoading(false)))
        return () => { mounted = false }
    }, [dispatch])
  
    if (postsState.isLoading) {
        return (
            <div className='w-full py-8 mt-4'>
                <Container>
                    <Loader />
                </Container>
            </div>
        )
    }
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center">
                        <SearchBar />
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <SearchBar/>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home