import { api } from "./api-interceptor";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // User login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // User registration endpoint
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
