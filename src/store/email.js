import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emails: [],
  unreadCount: 0,
};

const emailSlice = createSlice({
  name: "email",
  initialState: initialState,
  reducers: {
    setEmails(state, action) {
      state.emails = action.payload;
    },
    addEmail(state, action) {
      state.emails.push(action.payload);
    },
    readed(state, action) {
      state.emails.forEach(
        (mail) => mail.id === action.payload && (mail.read = true)
      );
    },
    addCount(state) {
      const email = localStorage.getItem("email");
      state.unreadCount = 0;
      state.emails
        .filter((mail) => mail.receiver === email)
        .map((mail) => !mail.read && state.unreadCount++);
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
