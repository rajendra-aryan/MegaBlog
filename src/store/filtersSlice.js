import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    category: "",
    tags: [],
};

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload || "";
        },
        setCategory(state, action) {
            state.category = action.payload || "";
        },
        setTags(state, action) {
            const next = action.payload;
            state.tags = Array.isArray(next) ? next : [];
        },
        resetFilters() {
            return { ...initialState };
        },
    },
});

export const { setSearchTerm, setCategory, setTags, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;