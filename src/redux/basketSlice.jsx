import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { selectUserToken } from "./userSlice";
import { STATUS } from "../components/Status";
import axios from "axios";



export const addBasketItem = createAsyncThunk("basket/add", async (data, {  getState }) => {
    const token = selectUserToken(getState());
    const res = await axios.post(`/basket/add/${data.productsId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(function (response) {
        return response;
    }).catch(function (error) {
        return error.message;
    });
    return res;
});

export const removeBasketItem = createAsyncThunk("basket/remove", async (data, { dispatch, getState }) => {
    const token = selectUserToken(getState());
    const res = await axios.post(`/basket/remove/${data.productsId}`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(function (response) {
        dispatch(setSnackbar({ children: response.data, color: response.status == 200 ? 'success' : 'danger' }))
        return response;
    })
    return res;
});


export const getBasket = createAsyncThunk("basket/getMyBasket", async (data, { getState }) => {
    const token = selectUserToken(getState());
    const res = await axios.get("/basket/getMyBasket", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(function (response) {
        return response;
    })
    return res;
});

const basketSlice = createSlice({
    name: "basket",
    initialState: {
        baskets: [],
        status: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBasketItem.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(addBasketItem.fulfilled, (state, action) => {
                state.status = STATUS.COMPLETED;
            })
            .addCase(addBasketItem.rejected, (state, action) => {
                state.status = STATUS.ERROR;
            });
        builder
            .addCase(removeBasketItem.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(removeBasketItem.fulfilled, (state, action) => {
                state.status = STATUS.COMPLETED;
                console.log(action)
            })
            .addCase(removeBasketItem.rejected, (state, action) => {
                state.status = STATUS.ERROR;
            });
        builder
            .addCase(getBasket.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(getBasket.fulfilled, (state, action) => {
                state.status = STATUS.COMPLETED;
                state.baskets = action.payload.data;
            })
            .addCase(getBasket.rejected, (state, action) => {
                state.status = STATUS.ERROR;
            });
    },
});

export const { addBasket, removeBasket, removeAllBasket } = basketSlice.actions
export default basketSlice.reducer;