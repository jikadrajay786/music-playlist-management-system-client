import { api } from "./api-interceptor";

const playlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch playlist for current user
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

    // Create new playlist
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

    // Update playlist
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

    // Delete playlist
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
