import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { uploadProduct } from "./ProductsSlice";
import axios from "axios";
import { adminbaseURL } from "../../Base/Constent";


export const uploadBanner = createAsyncThunk('banner/upload' ,async (formData) => {
    try {
        const res = await axios.post(`${adminbaseURL}/upload/banner` , formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
        
    } catch (error) {
        throw Error(error.response?.data?.msg || "Upload failed");
        
    }
})


export const getBanner = createAsyncThunk('admin/banner', async () => {
    const response = await axios.get(`${adminbaseURL}/allbanner`, { withCredentials: true });
    console.log(response.data,"In bannerSlice");
    return response.data;  // access the data property of the response
});


const bannerSlice = createSlice({
    name:"banner",
    initialState:{
        banner:[],
        error:null
    },
    reducers:{
        setBanner:(state, action) => {
            state.banner = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(uploadBanner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadBanner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.banner = action.payload.details;
                state.error = null;
            })
            .addCase(uploadBanner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getBanner.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBanner.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.banner = action.payload
                state.error = null;
            })
            .addCase(getBanner.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        }
})


export const { setBanner, setError  } = bannerSlice.actions;

export default bannerSlice.reducer