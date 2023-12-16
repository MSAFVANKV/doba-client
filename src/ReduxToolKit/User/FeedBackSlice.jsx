import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userURL } from "../../Base/Constent";

export const getFeedbackInfo = createAsyncThunk('form/getFeedbackInfo', async () => {
  const res = await axios.get(`${userURL}/form/feedback/getall`);
  return res.data;
});

export const feedbackUpload = createAsyncThunk('form/feedback', async ({ formState }) => {
  try {
      const res = await axios.post(`${userURL}/form/feedback` ,{ formState });
      return res.data
  } catch (error) {
      console.log(error,'error form feedback submition slice');
      throw Error(err.response?.data?.msg || "feedback failed");
  }
})

export const markFeedbackMessageAsRead = createAsyncThunk(
  'user/mark-as-read',
  async (messageId, { dispatch }) => {
    try {
      await axios.patch(`${userURL}/form/feedback/${messageId}/mark-as-read`);
      // Dispatch a separate action to update the read status in the store
      dispatch(markMessageAsReadLocally(messageId));
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw new Error('Error marking message as read');
    }
  }
);


export const FeedBackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedback: [],
  },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    markMessageAsReadLocally: (state, action) => {
      const messageId = action.payload;
      const updatedForm = state.feedback.map((message) =>
        message._id === messageId ? { ...message, read: true } : message
      );
      state.feedback = updatedForm;
    },
  },
  extraReducers: builder => {
    builder
        .addCase(getFeedbackInfo.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getFeedbackInfo.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.feedback = action.payload;
        })
        .addCase(getFeedbackInfo.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(feedbackUpload.pending, (state) => {
          state.status = 'loading';
      })
      .addCase(feedbackUpload.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.feedback = action.payload; // Update the form field in the state
      })
      
      .addCase(feedbackUpload.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload; // Store the error message from the server
      })
      
      .addCase(markFeedbackMessageAsRead.fulfilled, (state, action) => {
          // This case will be handled by markMessageAsReadLocally reducer
        });
}
});

export const { setFeedback, markMessageAsReadLocally } = FeedBackSlice.actions;
export default FeedBackSlice.reducer;
