import { createSlice } from "@reduxjs/toolkit";

const tokenId = localStorage.getItem("token");

const initialState = {
  token: tokenId,
  isAuthenticated: !!tokenId,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
