import { api } from "./api-interceptor";

export const tracksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Search tracks/songs
    searchTracks: builder.query({
      query: (params) => ({
        url: "/tracks/search",
        method: "GET",
        params,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),

    // Add track/song in playlist
    addToPlaylist: builder.mutation({
      invalidatesTags: ["getPlaylist"],
      query: (payload) => ({
        url: "/tracks/add-to-playlist",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useSearchTracksQuery, useAddToPlaylistMutation } = tracksApi;
