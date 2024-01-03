import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSIPNotification } from "../api/notification";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  sipNotifications: [],
};

export const getSIPNotificationThunk = createAsyncThunk(
  "notifications/SIP",
  async () => {
    try {
      let res = await getSIPNotification();
      return res;
    } catch (err) {
      return err?.response.data;
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearNotification: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(getSIPNotificationThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSIPNotificationThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sipNotifications = payload?.notifications;
      })
      .addCase(getSIPNotificationThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
