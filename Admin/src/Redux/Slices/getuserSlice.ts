import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getuserApi = createApi({
  reducerPath: "usersplan",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.107:8000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    filterUsers: builder.query<
      any,
      {
        plan_id?: string;
        join?: string | null;
        page?: number;
      }
    >({
      query: ({
        plan_id = "0", // Default plan = 0
        join = null,
        page = 1, // Default page = 1
      }) => {
        const params = new URLSearchParams();

        params.append("plan", plan_id);
        if (join) params.append("join", join);
        params.append("page", page.toString());

        return `getusersearch?${params.toString()}`;
      },
    }),
  }),
});

export const { useFilterUsersQuery } = getuserApi;
