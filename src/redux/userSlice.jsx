import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../components/Status";

export const userLogin = createAsyncThunk("auth/login", async (data) => {
    console.log(data);
    const res = await axios.post("/auth/login", {
        username: data.username,
        password: data.password
    }).then(function (response) {
        localStorage.setItem('token', response.data);
        return response;
    })
    return res;
});

export const userRegister = createAsyncThunk("auth/register", async (data) => {
    const res = await axios.post("/auth/register", data).then(function (response) {
        console.log(response)
        return response;
    })
    return res;
});

export const getUserProfile = createAsyncThunk("auth/user/profile", async (data) => {
    const res = await axios.get("/auth/user/profile", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(function (response) {
        console.log(response)
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
    },
    reducers: {
        userLogout(state, action) {
            state.user = [];
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = STATUS.LOADING;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = STATUS.COMPLETED;
                console.log(action)
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

export const { userLogout } = userSlice.actions
export default userSlice.reducer;