import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_REGISTER_URL }),
  endpoints: (builder) => ({
    //register User
    registerUser: builder.mutation({
      query: (data) => ({
        url: `userAuth`,
        method: "POST",
        body: data,
      }),
    }),
    //login user
    loginUser: builder.mutation({
      query: (data) => ({
        url: `loginAuth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = userApi;
