import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../API/axiosInstance";

//login API call - async-thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
     //data = Invalid email or password
    }
  },
);
//signup API call - async-thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData) => {
    const response = await axiosInstance.post("/auth/register", formData);
    return response.data; //{user, token} === action.payload
  },
  //HTTP is state-less and need to verify each time so we use token just compare with the token in MongoDB
);

export const getMe = createAsyncThunk("auth/getMe", async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data; // { user }
});
//reducer Name: 'auth'
//creating slice
const authSlice = createSlice({
  name: "auth",

  // authSlice.js — just change initialState until backend is ready
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: false, // ← goes straight to dashboard
    isLoading: false,
    error: null,
  },
  reducers: {
    //sync only logout
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  //Async actions state update with data from API {user, token} and initialStates
  extraReducers: (builder) => {
    //get User
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
      state.token = null;
      localStorage.removeItem("token");
    });

    //Login User
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.message || action.error.message;
    });

    //if register user
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      //if user reg in MongoDB will give {user, token} => response.data === action.payload
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
