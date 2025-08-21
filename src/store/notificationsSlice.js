import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    toasts: [],
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addToast: {
            reducer(state, action) {
                state.toasts.push(action.payload);
            },
            prepare({ message, type = "info", timeoutMs = 3000 }) {
                return {
                    payload: {
                        id: nanoid(),
                        message,
                        type,
                        timeoutMs,
                        createdAt: Date.now(),
                    },
                };
            },
        },
        removeToast(state, action) {
            const id = action.payload;
            state.toasts = state.toasts.filter((t) => t.id !== id);
        },
        clearToasts(state) {
            state.toasts = [];
        },
    },
});

export const { addToast, removeToast, clearToasts } = notificationsSlice.actions;
export default notificationsSlice.reducer;