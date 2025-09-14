import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const expanseApi = createApi({
  reducerPath: "expanseData",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ["expanse"],
  endpoints: (builder) => ({
    //get Expanse data
    getExpanseData: builder.query({
      query: (userId) => ({
        url: `expanseData`,
        method: "GET",
      }),
      providesTags: ["expanse"],
    }),

    //post Data
    createExpanseData: builder.mutation({
      query: (data) => ({
        url: `expanseData`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expanse"],
    }),

    //delete expanse data
    removeExpanseData: builder.mutation({
      query: (Id) => ({
        url: `expanseData/${Id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expanse"],
    }),
  }),
});

export const {
  useCreateExpanseDataMutation,
  useGetExpanseDataQuery,
  useRemoveExpanseDataMutation,
} = expanseApi;
