import { createSlice } from "@reduxjs/toolkit";

const storedData = JSON.parse(localStorage.getItem("auth"));

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    token: storedData?.token || null,
    email: storedData?.email || null,
    userName: storedData?.userName || null,
  },
  reducers: {
    setCredential: (state, action) => {
      const { token, email, userName } = action.payload;
      state.token = token;
      state.email = email;
      state.userName = userName;
      localStorage.setItem("auth", JSON.stringify({ token, email, userName }));
    },
    logOutUser: (state) => {
      state.token = null;
      state.email = null;
      state.userName = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredential, logOutUser } = AuthSlice.actions;
export default AuthSlice.reducer;
