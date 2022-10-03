import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import * as api from "../api.js"


 export const login=createAsyncThunk("auth/login", async({formValue,navigate,toast},{rejectWithValue})=>{

    try {
        
        const { data } = await api.signIn(
        formValue);
          localStorage.setItem("profile", JSON.stringify(data));
          navigate("/")
          toast.success("Login Successfully")
          return data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});


export const register = createAsyncThunk("auth/register", async ({formValue,navigate,toast},{rejectWithValue})=>{

    try {
        const response = await api.signUp(formValue)
        navigate("/login")
        toast.success("Registered Successfully")
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }   
})
export const logout = createAsyncThunk("auth/logout", async (payload,{rejectWithValue})=>{

    try {
        localStorage.removeItem("profile");
    } catch (error) {
        return rejectWithValue(error.response.data)
    }   
})




const userLoginFromStorage = localStorage.getItem("profile")
  ? JSON.parse(localStorage.getItem("profile"))
  : null;





 const authSlice= createSlice({
    name:"auth",
    initialState:{
        user:userLoginFromStorage,
        
    },
    extraReducers:{
        [login.pending]:(state,action)=>{
            state.loading=true;
        },
        [login.fulfilled]:(state,action)=>{
            state.loading=false;
            state.user= action?.payload
        },
        [login.rejected]:(state,action)=>{
            state.loading=false;
            state.error= action.payload.message
        },
        [register.pending]:(state,action)=>{
            state.loading=true;
        },
        [register.fulfilled]:(state,action)=>{
            state.loading=false;
            state.user= action.payload
        },
        [register.rejected]:(state,action)=>{
            state.loading=false;
            state.error= action.payload.message
        },
        [logout.pending]:(state,action)=>{
            state.loading=true;
        },
        [logout.fulfilled]:(state,action)=>{
            state.loading=false;
            state.user=undefined
        },
        [logout.rejected]:(state,action)=>{
            state.loading=false;
            state.error= action.payload.message
        },



    }
})


export default authSlice.reducer