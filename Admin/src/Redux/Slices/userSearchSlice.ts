import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { http } from "../../API/API";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: http,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchUsers: builder.query<any, { query: string }>({
      query: ({ query }) => {
        const params = new URLSearchParams();
        if (query) params.append("query", query);
        return `getusersearch?${params.toString()}`;
      },
    }),
  }),
});

export const { useSearchUsersQuery } = userApi;
