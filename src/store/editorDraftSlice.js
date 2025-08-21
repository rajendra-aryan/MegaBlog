import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "",
    slug: "",
    content: "",
    status: "active",
    featuredImageFile: null,
};

const editorDraftSlice = createSlice({
    name: "editorDraft",
    initialState,
    reducers: {
        setDraftField(state, action) {
            const { field, value } = action.payload || {};
            if (field in state) {
                state[field] = value;
            }
        },
        resetDraft() {
            return { ...initialState };
        },
        loadDraft(state, action) {
            const next = action.payload || {};
            return { ...state, ...next };
        },
    },
});

export const { setDraftField, resetDraft, loadDraft } = editorDraftSlice.actions;
export default editorDraftSlice.reducer;