import React, {useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/notdb";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setPosts, appendPosts } from '../store/postsSlice'
import { SearchBar, Loader } from '../components'
import { Query } from 'appwrite'

function AllPosts() {
    const dispatch = useDispatch()
    const postsState = useSelector((state) => state.posts)
    const posts = postsState.allIds.map((id) => postsState.byId[id])
    const filters = useSelector((state) => state.filters)

    useEffect(() => {
        let mounted = true
        dispatch(setLoading(true))
        const queries = [Query.equal("status", "active"), Query.orderDesc("$createdAt")]
        if (filters.category) queries.push(Query.equal("category", filters.category))
        if (filters.searchTerm) queries.push(Query.search("title", filters.searchTerm))
        if (filters.tags && filters.tags.length > 0) queries.push(Query.contains("tags", filters.tags))
        appwriteService.getPosts(queries).then((res) => {
            if (!mounted) return
            if (res && res.documents) {
                dispatch(setPosts(res.documents))
            }
        }).finally(() => mounted && dispatch(setLoading(false)))
        return () => { mounted = false }
    }, [dispatch, filters])
    
  if (postsState.isLoading) {
    return (
      <div className='w-full py-8'>
        <Container>
          <Loader />
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
            {posts.length > 0 && (
                <div className='w-full flex justify-center mt-6'>
                    <button
                        onClick={async () => {
                            const last = posts[posts.length - 1]
                            const queries = [Query.equal("status", "active"), Query.orderDesc("$createdAt")]
                            if (filters.category) queries.push(Query.equal("category", filters.category))
                            if (filters.searchTerm) queries.push(Query.search("title", filters.searchTerm))
                            if (filters.tags && filters.tags.length > 0) queries.push(Query.contains("tags", filters.tags))
                            if (last) queries.push(Query.cursorAfter(last.$id))
                            const res = await appwriteService.getPosts(queries)
                            if (res && res.documents && res.documents.length > 0) {
                                dispatch(appendPosts(res.documents))
                            }
                        }}
                        className='px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700'
                    >Load more</button>
                </div>
            )}
            </Container>
    </div>
  )
}

export default AllPosts