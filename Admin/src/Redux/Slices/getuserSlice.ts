// Redux/Slices/getuserSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FilterUsersParams, FilterUsersResponse } from "../../Interface/Interfaces";

export const getuserApi = createApi({
  reducerPath: "usersplan",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.107:8000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log(token)
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    filterUsers: builder.query<FilterUsersResponse, FilterUsersParams>({
      query: ({ plan_id = "0", join = null, page = 1 }) => {
        const params = new URLSearchParams();
        params.append("plan_id", plan_id);
        if (join) params.append("join", join);
        params.append("page", page.toString());
        return `usersplan?${params.toString()}`;
      },
    }),
  }),
});

export const { useFilterUsersQuery } = getuserApi;
