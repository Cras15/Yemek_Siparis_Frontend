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
            state.snackbar.open = true;
        },
        closeSnackbar(state) {
            state.snackbar = { ...state.snackbar, open: false };
        },
    }
});

export const { setSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;