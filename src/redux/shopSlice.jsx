import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        selectedShop: null,
        status: "",
    },
    reducers: {
        setSelectedShop: (state, action) => {
            state.selectedShop = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
});

export const { setSelectedShop, setStatus } = shopSlice.actions;
export default shopSlice.reducer;