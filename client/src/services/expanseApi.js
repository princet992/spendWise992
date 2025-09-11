import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expanseApi = createApi({
  reducerPath: "expanseData",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_EXPANSE_URL }),
  tagTypes: ["expanse"],
  endpoints: (builder) => ({
    //post Data
    createExpanseData: builder.mutation({
      query: (data) => ({
        url: `expanseData`,
        method: "POST",
        body: data,
      }),
      providesTags: ["expanse"],
    }),

    //get Expanse data
    getExpanseData: builder.query({
      query: () => ({
        url: `expanseData`,
        method: "GET",
      }),
      invalidatesTags: ["expanse"],
    }),
  }),
});

export const { useCreateExpanseDataMutation, useGetExpanseDataQuery } = expanseApi;
