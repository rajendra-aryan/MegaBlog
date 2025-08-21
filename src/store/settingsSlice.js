import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "light",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme(state, action) {
            const next = action.payload;
            if (next === "light" || next === "dark") {
                state.theme = next;
            }
        },
    },
});

export const { setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;