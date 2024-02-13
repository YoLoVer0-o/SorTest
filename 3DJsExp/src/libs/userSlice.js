import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    items: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    deleteUser: (state) => {
      state.items = [];
    },
  },
});
export default userSlice.reducer;

export const { setUserData, deleteUser } = userSlice.actions;

export const getUser = (state) => state.user?.items;
