import { createAsyncThunk } from "@reduxjs/toolkit";
import {  useRequest } from './http';
import { useGlobalErrorHandler } from "./error";
import toast from "react-hot-toast";
import { GenderEnum, UserRole } from "../typings/general";
import { AxiosError } from "axios";

interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: GenderEnum;
  userType: UserRole
  dob?: string;
  hospitalName:string;
  address?: string
  speciality?: string
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }:LoginPayload, { rejectWithValue }) => {
      try {
        const response = await useRequest({
            method: "POST",
            url: "auth/login",
            data: {
                email,
                password
            }
        })
        const successResponseCode = [200, 201, 204]
       
        if(successResponseCode.includes(response.status)){
            toast.success('Successfully logged in')
        }
        return response.data; // API returns user details
      } catch (error: unknown) {
        useGlobalErrorHandler(error, false)
        return rejectWithValue("Failed to login user");
      }
    }
  );



  export const registerUser = createAsyncThunk(
    "auth/register",
    async (registerPayload:RegisterPayload, { rejectWithValue }) => {
      try {
        const response = await useRequest({
            method: "POST",
            url: "auth",
            data: {
                ...registerPayload
            }
        })
        const successResponseCode = [200, 201, 204]
       
        if(successResponseCode.includes(response.status)){
            toast.success('Successfully registered account')
        }
        return response.data; // API returns user details
      } catch (error: unknown) {
        useGlobalErrorHandler(error, false)
        return rejectWithValue("Failed to login user");
      }
    }
  );


  export const getMe = createAsyncThunk(
    "auth/me",
    async (_, { rejectWithValue }) => {
      try {
        const response = await useRequest({
          method: "GET",
          url: "auth/me",
        });
  
        return response.data; // API returns user details
      } catch (error) {
        const err = error as AxiosError;
        useGlobalErrorHandler(err, false);
        return rejectWithValue(err.response?.data || "Failed to fetch user details");
      }
    }
  );