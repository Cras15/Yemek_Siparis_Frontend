import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: {
        snackbar: null,
    },
    reducers: {
        setSnackbar(state, action) {
            console.log(action.payload);
            state.snackbar = action.payload;
        },
    }
});

export const { setSnackbar} = snackbarSlice.actions;
export default snackbarSlice.reducer;