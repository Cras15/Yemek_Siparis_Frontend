import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../components/Status";
import { useSelector } from "react-redux";

export const userLogin = createAsyncThunk("auth/login", async (data) => {
    console.log(data);
    const res = await axios.post("/auth/login", {
        username: data.username,
        password: data.password
    }).then(function (response) {
        return response;
    })
    return res;
});

export const userRegister = createAsyncThunk("auth/register", async (data) => {
    const res = await axios.post("/auth/register", data).then(function (response) {
        return response;
    })
    return res;
});

export const getUserProfile = createAsyncThunk("auth/user/profile", async (data, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    const res = await axios.get("/auth/user/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(function (response) {
        return response;
    })
    return res;
});


const userSlice = createSlice({
    name: "user",
    initialState: {
        error: null,
        status: "",
        statusCode: null,
        errorMessage: "",
        user: [],
        token: '',
        expireDate: '',
    },
    reducers: {
        userLogout(state, action) {
            state.user = [];
            state.token = '';
            state.expireDate = '';
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = STATUS.COMPLETED;
                state.token = action.payload.data;
                state.expireDate = new Date().getTime() + 1000 * 60 * 60 * 24;
                console.log("act", action.payload)
                console.log("token", state.token)
                console.log("expireDate", state.expireDate)
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = STATUS.ERROR;
                console.log(action.error);
            });
        builder
            .addCase(userRegister.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.status = "completed";
                console.log(action)
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.status = "error";
                console.log(action.error);
            });
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.status = "completed";
                state.user = action.payload.data;
                console.log(action.payload.data)
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.status = "error";
                console.log(action.error);
            });
    },
});

export const selectUserToken = (state) => state.user.token;

export const { userLogout } = userSlice.actions
export default userSlice.reducer;