import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { adminbaseURL, userURL } from "../../Base/Constent";

export const uploadVideo = createAsyncThunk('video/upload' ,async (formData) => {
    try {
        const res = await axios.post(`${adminbaseURL}/upload/video` , formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
        
    } catch (error) {
        throw Error(error.response?.data?.msg || "Upload failed");
        
    }
})


export const getVideos = createAsyncThunk('admin/video', async () => {
    const response = await axios.get(`${adminbaseURL}/videos`, { withCredentials: true });
    console.log(response.data,"In videoSlice");
    return response.data;  // access the data property of the response
});
export const getVideosHome = createAsyncThunk('home/video', async () => {
    const response = await axios.get(`${userURL}/get/videos`, { withCredentials: true });
    console.log(response.data,"In videoSlice home");
    return response.data;  // access the data property of the response
});

const videoSlice = createSlice({
    name:"video",
    initialState:{
        video:[],
        error:null
    },
    reducers:{
        setVideo:(state, action) => {
            state.video = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(uploadVideo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadVideo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.video = action.payload.details;
                state.error = null;
            })
            .addCase(uploadVideo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getVideos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getVideos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.video = action.payload
                state.error = null;
            })
            .addCase(getVideos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getVideosHome.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getVideosHome.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.video = action.payload
                state.error = null;
            })
            .addCase(getVideosHome.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        }
})


export const { setVideo } = videoSlice.actions;

export default videoSlice.reducer