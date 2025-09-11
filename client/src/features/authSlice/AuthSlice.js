import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    token: null,
    email: null,
    userName: null,
  },
  reducers: {
    setCredential: (state, action) => {
      const { token, email, userName } = action.payload;
      state.token = token;
      state.email = email;
      state.userName = userName;
    },
    logOutUser: (state) => {
      state.token = null;
      state.email = null;
      state.userName = null;
    },
  },
});

export const { setCredential, logOutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
