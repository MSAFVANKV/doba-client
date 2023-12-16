import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {  userURL } from '../../Base/Constent'

export const singleFormEnquiry = createAsyncThunk('user/form', async ({ formState }) => {
    try {
        const res = await axios.post(`${userURL}/singleform` ,{ formState });
        return res.data
    } catch (error) {
        console.log(error,'error form submition slice');
        throw Error(err.response?.data?.msg || "Login failed");
    }
})
export const getUserSingleForm = createAsyncThunk('user/singleform', async () => {
    try {
        const res = await axios.get(`${userURL}/singleform/getall` );
        return res.data;
    } catch (error) {
        console.log(error, 'error SingleForm slice');
        throw new Error(error.response?.data?.msg || "SingleForm failed"); // Throw the error with the correct error message
    }
});

export const markMessageAsRead = createAsyncThunk(
    'user/mark-as-read',
    async (messageId, { dispatch }) => {
      try {
        await axios.patch(`${userURL}/singleform/${messageId}/mark-as-read`);
        // Dispatch a separate action to update the read status in the store
        dispatch(markMessageAsReadLocally(messageId));
      } catch (error) {
        console.error('Error marking message as read:', error);
        throw new Error('Error marking message as read');
      }
    }
  );

export const SingleFormSlice = createSlice({
    name:"form",
    initialState: {
        form:[],
    },

    reducers: {
        formsingle: (state, action) => {
            state.form = action.payload; // Update the form field in the state
        },
        markMessageAsReadLocally: (state, action) => {
            const messageId = action.payload;
            const updatedForm = state.form.map((message) =>
              message._id === messageId ? { ...message, read: true } : message
            );
            state.form = updatedForm;
          },
    },
    extraReducers: builder => {
        builder
        .addCase(singleFormEnquiry.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(singleFormEnquiry.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.form = action.payload; // Update the form field in the state
        })
        
        .addCase(singleFormEnquiry.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; // Store the error message from the server
        })
        
        .addCase(markMessageAsRead.fulfilled, (state, action) => {
            // This case will be handled by markMessageAsReadLocally reducer
          });
    }
})

export const { formsingle, markMessageAsReadLocally  } = SingleFormSlice.actions

export const selectSigleForm = (state) => state.form.form;

export default SingleFormSlice.reducer