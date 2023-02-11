import { createSlice } from "@reduxjs/toolkit";

const email = localStorage.getItem("email");

const initialState = {
  emails: {},
  unreadCount: 0,
};

const emailSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {
    setEmails(state, action) {
      state.emails = action.payload;
    },
    readed(state, action) {
      state.emails[action.payload].read = true;
    },
    addCount(state) {
      Object.values(state.emails)
        .filter((mail) => mail.receiver === email)
        .map((mail) => !mail.read && state.unreadCount++);
    },
    removeCount(state, action) {
      if (!state.emails[action.payload].read) state.unreadCount--;
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
