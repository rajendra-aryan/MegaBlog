import React, {useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/notdb";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setPosts } from '../store/postsSlice'
import { SearchBar, Loader } from '../components'
import { Query } from 'appwrite'

function AllPosts() {
    const dispatch = useDispatch()
    const postsState = useSelector((state) => state.posts)
    const posts = postsState.allIds.map((id) => postsState.byId[id])
    useEffect(() => {
        let mounted = true
        dispatch(setLoading(true))
        const queries = [Query.equal("status", "active"), Query.orderDesc("$createdAt")]
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
            <SearchBar />
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

export default AllPosts