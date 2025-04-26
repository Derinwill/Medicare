import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginUserApi } from "./api";
import { loginUser, registerUser, getMe } from "../composables/auth";
import { LoginResponse } from "../typings/auth";
import toast from "react-hot-toast";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "failed";
  error: string | null;
  userType: UserType | undefined;
  profileInfo: ProfileInfo | undefined
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
  userType: undefined,
  profileInfo:   undefined
};

import type { AppDispatch } from "./store"; // Import your store types
import { useDispatch } from "react-redux";
import { ProfileInfo, UserType } from "../typings/general";

export const useAppDispatch: () => AppDispatch = useDispatch;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getMe.pending, (state)=>{

      }).addCase(getMe.fulfilled, (state, action: PayloadAction<ProfileInfo>)=>{
        if(action.payload){
        state.profileInfo = action.payload
        }
      })
      builder.addCase(registerUser.pending, (state)=> {
        state.status = "loading";
        state.error = null;
      }).addCase(registerUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        console.log('log', action)
        state.token = action.payload.accessToken;
        state.isAuthenticated = !!state.token;;
        state.status = "idle";
        state.userType = action.payload.user.role
        localStorage.setItem("token", action.payload.accessToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthenticated = !!state.token;
        state.status = "failed";
        state.error = action.payload as string;
      });

      builder
        .addCase(loginUser.pending, (state) => {
          // toast.loading("loading...", {
          //   duration: 2000
          // })

          state.status = "loading";
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
          console.log('log', action)
          state.token = action.payload.accessToken;
          state.isAuthenticated = !!state.token;;
          state.status = "idle";
          state.userType = action.payload.user.role
          localStorage.setItem("token", action.payload.accessToken);
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isAuthenticated = !!state.token;
          state.status = "failed";
          state.error = action.payload as string;
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;