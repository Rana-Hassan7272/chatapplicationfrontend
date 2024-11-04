// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import  { adminLogin,adminGet, adminLogOut } from "./api/admin.js";
import toast from "react-hot-toast";

const initialState = {
  isAdmin: false,
  user: null,
  loader: true, // Loader to indicate loading state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.user = action.payload; // Store user data
      state.loader = false; // Disable loader after user is loaded
    },
    userNotExist: (state) => {
      state.user = null;
      state.loader = false; // Disable loader if user does not exist
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(adminLogin.fulfilled,(state,action)=>{
      state.isAdmin=true;
      toast.success(action.payload)
    })
   .addCase(adminLogin.rejected,(state,action)=>{
      state.isAdmin=false;
      toast.error(action.error.message)
    })
    .addCase(adminGet.fulfilled,(state,action)=>{
      if(action.payload){
        state.isAdmin=true
      }
      else{
        state.isAdmin=false;
      }
      
     
    })
   .addCase(adminGet.rejected,(state,action)=>{
      state.isAdmin=false;
      toast.error(action.error.message)
    })
    .addCase(adminLogOut.fulfilled,(state,action)=>{
      state.isAdmin=false;
      toast.success(action.payload)
    })
   .addCase(adminLogOut.rejected,(state,action)=>{
      state.isAdmin=true;
      toast.error(action.error.message)
    })
  }
});

export const { userExist, userNotExist } = authSlice.actions;

// **Change this line**
export default authSlice;
