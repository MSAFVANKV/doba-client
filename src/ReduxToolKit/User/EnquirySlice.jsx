import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {  userURL } from '../../Base/Constent'

export const FormEnquiry = createAsyncThunk('user/enquiry', async ({ formState }) => {
    try {
        const res = await axios.post(`${userURL}/form/enquiry` ,{ formState });
        return res.data
    } catch (error) {
        console.log(error,'error form submition slice');
        throw Error(err.response?.data?.msg || "Login failed");
    }
})
export const getEnquiryForm = createAsyncThunk('user/form', async () => {
    try {
        const res = await axios.get(`${userURL}/form/enquiy/getall` );
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
        await axios.patch(`${userURL}/form/enquiy/${messageId}/mark-as-read`);
        // Dispatch a separate action to update the read status in the store
        dispatch(markMessageAsReadLocally(messageId));
      } catch (error) {
        console.error('Error marking message as read:', error);
        throw new Error('Error marking message as read');
      }
    }
  );

export const EnquirySlice = createSlice({
    name:"enquiry",
    initialState: {
        enquiry:[],
    },

    reducers: {
        enquiryForm: (state, action) => {
            state.enquiry = action.payload; // Update the form field in the state
        },
        markMessageAsReadLocally: (state, action) => {
            const messageId = action.payload;
            const updatedForm = state.enquiry.map((message) =>
              message._id === messageId ? { ...message, read: true } : message
            );
            state.enquiry = updatedForm;
          },
    },
    extraReducers: builder => {
        builder
        .addCase(FormEnquiry.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(FormEnquiry.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.enquiry = action.payload; // Update the enquiry field in the state
        })
        
        .addCase(FormEnquiry.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; // Store the error message from the server
        })
        .addCase(getEnquiryForm.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getEnquiryForm.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.enquiry = action.payload; // Update the enquiry field in the state
        })
        
        .addCase(getEnquiryForm.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; // Store the error message from the server
        })
        .addCase(markMessageAsRead.fulfilled, (state, action) => {
            // This case will be handled by markMessageAsReadLocally reducer
          });
    }
})

export const { enquiryForm, markMessageAsReadLocally  } = EnquirySlice.actions

export const selectEnquiryForm = (state) => state.enquiry.enquiry;

export default EnquirySlice.reducer