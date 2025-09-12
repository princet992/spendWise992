import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    token: null,
    email: null,
    userName: null,
    userId: null,
  },
  reducers: {
    setCredential: (state, action) => {
      const { token, email, userName, userId } = action.payload;
      state.token = token;
      state.email = email;
      state.userName = userName;
      state.userId = userId;
    },
    logOutUser: (state) => {
      state.token = null;
      state.email = null;
      state.userName = null;
      state.userId = null;
    },
  },
});

export const { setCredential, logOutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
