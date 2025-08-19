import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byId: {},
    allIds: [],
    isLoading: false,
    errorMessage: null,
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = Boolean(action.payload);
        },
        setError(state, action) {
            state.errorMessage = action.payload || null;
        },
        setPosts(state, action) {
            const posts = Array.isArray(action.payload) ? action.payload : [];
            state.byId = {};
            state.allIds = [];
            for (const post of posts) {
                state.byId[post.$id] = post;
                state.allIds.push(post.$id);
            }
        },
        appendPosts(state, action) {
            const posts = Array.isArray(action.payload) ? action.payload : [];
            for (const post of posts) {
                if (!state.byId[post.$id]) {
                    state.allIds.push(post.$id);
                }
                state.byId[post.$id] = post;
            }
        },
        addPost(state, action) {
            const post = action.payload;
            if (!post || !post.$id) return;
            if (!state.byId[post.$id]) {
                state.allIds.unshift(post.$id);
            }
            state.byId[post.$id] = post;
        },
        updatePost(state, action) {
            const post = action.payload;
            if (!post || !post.$id) return;
            if (state.byId[post.$id]) {
                state.byId[post.$id] = { ...state.byId[post.$id], ...post };
            }
        },
        removePost(state, action) {
            const postId = action.payload;
            if (!postId) return;
            if (state.byId[postId]) {
                delete state.byId[postId];
                state.allIds = state.allIds.filter((id) => id !== postId);
            }
        },
        clear(state) {
            state.byId = {};
            state.allIds = [];
            state.isLoading = false;
            state.errorMessage = null;
        },
    },
});

export const {
    setLoading,
    setError,
    setPosts,
    appendPosts,
    addPost,
    updatePost,
    removePost,
    clear,
} = postsSlice.actions;

export default postsSlice.reducer;

