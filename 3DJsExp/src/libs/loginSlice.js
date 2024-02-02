import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    items: { status: null, token: null },
  },
  reducers: {
    logIn: (state, action) => {
      state.items = { status: true, token: action.payload };
    },
    logOut: (state) => {
      state.items = { status: null, token: null };
    },
  },
});
export default loginSlice.reducer;

export const { logIn, logOut } = loginSlice.actions;

// export const getLogin = (state) => state.items;

export const getLogin = (state) => state.login?.items;
