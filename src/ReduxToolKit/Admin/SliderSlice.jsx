import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { adminbaseURL, userURL } from '../../Base/Constent'

export const getSlider = createAsyncThunk('admin/slider', async () => {
    const response = await axios.get(`${adminbaseURL}/allslider`, { withCredentials: true });
    // console.log(response.data,"In sliderSlice");
    return response.data;  // access the data property of the response
});
export const getSliderHome = createAsyncThunk('home/slider', async () => {
    const response = await axios.get(`${userURL}/get/allslider`, { withCredentials: true });
    // console.log(response.data,"In home sliderSlice");
    return response.data;  // access the data property of the response
});

export const uploadSlider = createAsyncThunk('slider/upload', async (formData) => {
    try {
        const res = await axios.post(`${adminbaseURL}/upload/slider`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw Error(error.response?.data?.msg || "Upload failed");
    }
});

const sliderSlice = createSlice({
    name:'slider',
    initialState:{
        slider:[],
        error: null,
    },
    reducers:{
        setSlider: (state, action) => {
            state.slider = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(uploadSlider.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(uploadSlider.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.slider = action.payload.details;
                state.error = null;
            })
            .addCase(uploadSlider.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getSlider.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSlider.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.slider = action.payload
                state.error = null;
            })
            .addCase(getSlider.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getSliderHome.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSliderHome.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.slider = action.payload
                state.error = null;
            })
            .addCase(getSliderHome.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        }
})


export const {setslider} = sliderSlice.actions;

export default sliderSlice.reducer;