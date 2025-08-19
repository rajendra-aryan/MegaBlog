import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    byPostId: {},
    isLoadingByPost: {},
    errorByPost: {},
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments(state, action) {
            const { postId, comments } = action.payload || {};
            if (!postId) return;
            state.byPostId[postId] = Array.isArray(comments) ? comments : [];
        },
        addComment(state, action) {
            const { postId, comment } = action.payload || {};
            if (!postId || !comment) return;
            if (!state.byPostId[postId]) state.byPostId[postId] = [];
            state.byPostId[postId].push(comment);
        },
        setLoading(state, action) {
            const { postId, isLoading } = action.payload || {};
            if (postId) state.isLoadingByPost[postId] = Boolean(isLoading);
        },
        setError(state, action) {
            const { postId, error } = action.payload || {};
            if (postId) state.errorByPost[postId] = error || null;
        },
        clearPost(state, action) {
            const postId = action.payload;
            if (!postId) return;
            delete state.byPostId[postId];
            delete state.isLoadingByPost[postId];
            delete state.errorByPost[postId];
        },
    },
});

export const { setComments, addComment, setLoading, setError, clearPost } = commentsSlice.actions;
export default commentsSlice.reducer;

