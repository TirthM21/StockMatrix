import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserNominate, getUserNominate } from "../../api/user";

const initialState = {
  isSuccess: false,
  isLoading: false,
  isError: false,
  nominate: {},
};

export const addNominateThunk = createAsyncThunk(
  "nominate/add",
  async (data) => {
    let res = await addUserNominate(data);
    return res;
  }
);

export const getNominateThunk = createAsyncThunk(
  "nominate/allNominates",
  async () => {
    let res = await getUserNominate();
    return res;
  }
);

const nominateSlice = createSlice({
  name: "nominate",
  initialState,
  reducers: {
    clearUserNominateState: () => initialState,
  },
  extraReducers: (build) => {
    build
      .addCase(addNominateThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNominateThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addNominateThunk.rejected, (state) => {
        state.isLoading = true;
        state.isError = true;
      })
      .addCase(getNominateThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNominateThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nominate = payload?.userNominate;
      })
      .addCase(getNominateThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { clearUserNominateState } = nominateSlice.actions;

export default nominateSlice.reducer;
