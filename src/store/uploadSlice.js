import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    progressById: {},
    isUploading: false,
};

const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {
        startUpload(state, action) {
            const id = action.payload;
            state.progressById[id] = 0;
            state.isUploading = true;
        },
        setUploadProgress(state, action) {
            const { id, progress } = action.payload || {};
            if (typeof id === "string") {
                state.progressById[id] = progress;
            }
            state.isUploading = Object.values(state.progressById).some((p) => p < 100);
        },
        finishUpload(state, action) {
            const id = action.payload;
            state.progressById[id] = 100;
            state.isUploading = Object.values(state.progressById).some((p) => p < 100);
        },
        clearUpload(state, action) {
            const id = action.payload;
            if (id) {
                delete state.progressById[id];
            } else {
                state.progressById = {};
            }
            state.isUploading = Object.keys(state.progressById).length > 0;
        },
    },
});

export const { startUpload, setUploadProgress, finishUpload, clearUpload } = uploadSlice.actions;
export default uploadSlice.reducer;

