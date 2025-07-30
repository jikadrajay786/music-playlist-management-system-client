import { api } from "./api-interceptor";

const playlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylist: builder.query({
      providesTags: ["getPlaylist"],
      query: () => ({
        url: "/playlist",
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // User login endpoint
    addPlaylist: builder.mutation({
      invalidatesTags: ["getPlaylist"],
      query: (payload) => ({
        url: "/playlist",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // User registration endpoint
    updatePlaylist: builder.mutation({
      invalidatesTags: ["getPlaylist"],
      query: (payload) => {
        const { playlistId, ...other } = payload;
        const url = `/playlist/${playlistId}`;
        return {
          url,
          method: "PUT",
          body: other,
        };
      },
      transformResponse: (response) => {
        return response;
      },
    }),

    // User registration endpoint
    deletePlaylist: builder.mutation({
      invalidatesTags: ["getPlaylist"],
      query: (playlistId) => {
        const url = `/playlist/${playlistId}`;
        return {
          url,
          method: "DELETE",
        };
      },
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetPlaylistQuery,
  useAddPlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation,
} = playlistApi;
