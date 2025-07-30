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
        // Assuming the response contains an accessToken
        return response;
      },
      //   async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //     try {
      //       const { data } = await queryFulfilled;
      //       localStorage.setItem("accessToken", data.accessToken);
      //       // Optionally, you can dispatch an action to update the auth state
      //       // dispatch(setCredentials({ token: data.accessToken, user: data.user }));
      //     } catch (error) {
      //       console.error("Login error", error);
      //       // Handle login error
      //     }
      //   },
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
