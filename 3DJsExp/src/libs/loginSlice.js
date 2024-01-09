import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    items: [{ status: false }],
  },
  reducers: {
    logIn: (state) => {
        state.items = [{ status: true }];
    },
    logOut: (state) => {
      state.items = [{ status: false }];
    },
  },
});
export default loginSlice.reducer;

export const { logIn, logOut } = loginSlice.actions;

export const getUser = (state) => state.items;
