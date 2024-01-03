import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserInfo, getUser } from "../../api/user";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  user: {},
};

export const addUserInfoThunk = createAsyncThunk("info/add", async (data) => {
  try {
    let res = await addUserInfo(data);
    return res;
  } catch (err) {
    return err.response.data;
  }
});

export const getUserThunk = createAsyncThunk("info/user", async () => {
  let res = await getUser();
  return res;
});

const userInfoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    clearUserInfoState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(addUserInfoThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserInfoThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addUserInfoThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload?.user;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearUserInfoState } = userInfoSlice.actions;

export default userInfoSlice.reducer;
