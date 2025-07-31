import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type CustomError = FetchBaseQueryError & {
  data: {
    message?: string;
  };
};

interface IRefreshResponse {
  data: {
    success: boolean;
    message: string;
    data: {
      accessToken: string;
      refreshToken: string;
    };
  };
}
const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:4901/api",
  baseUrl:
    "https://music-playlist-management-system-server-qqyg.onrender.com/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authentication", token);
    }
    return headers;
  },
});

const baseQueryWithRefresh: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  const errorData = result?.error?.data as { message?: string };
  if (
    api?.endpoint !== "login" &&
    result?.error?.status === 401 &&
    errorData?.message &&
    errorData.message?.includes("jwt expired")
  ) {
    const refreshToken = localStorage.getItem("refreshToken");

    // Refresh token API call
    const refreshResult = (await baseQuery(
      {
        url: "/refresh",
        method: "POST",
        body: { token: refreshToken },
      },
      api,
      extraOptions
    )) as IRefreshResponse;

    if (refreshResult?.data && refreshResult.data?.success) {
      const { data } = refreshResult.data;
      const { accessToken, refreshToken: newRefreshToken } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      // Retry try original API call with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // When refresh also got failed
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/login");
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["getPlaylist"],
  endpoints: () => ({}),
});

// fetchBaseQuery({
//  baseUrl: "http://localhost:4901/api",
//  prepareHeaders: (headers, { getState }) => {
//    const token = localStorage.getItem("accessToken"); // or from Redux store
//    if (token) {
//      headers.set("Authentication", token);
//    }
//    return headers;
//  },
// }),
