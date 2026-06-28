import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//login API call - async-thunk
export const loginUser = createAsyncThunk(
    'auth/loginUser',
     async(formData) => {
          const response = await axios.post('http://localhost:5000/api/auth/login', formData)
          return response.data   //{user, token}
     }
)
//signup API call - async-thunk
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async(formData) => {
       const response = await axios.post('http://localhost:5000/api/auth/register', formData)
        return response.data   //{user, token} === action.payload
    }
   
)
//reducer Name: 'auth'
//creating slice
const authSlice = createSlice({
    name: 'auth',

    // authSlice.js — just change initialState until backend is ready
 initialState: {
  user:            { fName: "", email:null  },   //'akash@example.com'
  token:           '',
  isAuthenticated: false,   // ← goes straight to dashboard
  isLoading:       false,
  error:           null,
},
    reducers: {
        //sync only logout
        logout:(state) => {
            state.user = null
            state.token = null
            state.error = null
            state.isAuthenticated = false
        }, 
        login: (state, action) => {
            state.user = action.payload.user //Payload: { fName: DUMMY.fName, email: DUMMY.email }
            state.isAuthenticated = true
            state.token = action.payload.token
        }
    }, 
    //Async actions state update with data from API {user, token} and initialStates
    extraReducers: (builder) => {
        //Login User
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {  
            state.isLoading = false
            state.error = null
            state.user = action.payload.user
            state.token = action.payload.token
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })

        //if register user
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(registerUser.fulfilled, (state, action) => { 
 //if user reg in MongoDB will give {user, token} => response.data === action.payload
            state.isLoading = false
            state.error = null
            state.user = action.payload.user
            state.token = action.payload.token
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.error.message
            state.isLoading = false
        })
    }
})
 export const { logout, login } = authSlice.actions
 export default authSlice.reducer

 