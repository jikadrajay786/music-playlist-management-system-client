import {
  Box,
  CardActionArea,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import TopNavbar from "../../components/TopNavbar";
import { useSearchTracksQuery } from "../../rtk-query/tracks-actions";
import Playlists from "./components/Playlists";
import { AddCircle } from "@mui/icons-material";
import AddToPlaylistModal from "../../components/modals/AddToPlaylistModal";

interface ITrack {
  id: string;
  name: string;
  album: { name: string };
  artists: { name: string }[];
}

interface IAddToPlaylistState {
  isOpen: boolean;
  track: ITrack | null;
}

const Dashboard = () => {
  // Local state
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // API
  const {
    data: searchedTracks,
    isLoading,
    isFetching,
  } = useSearchTracksQuery({
    searchText: debouncedSearch,
  });

  // constants
  const tracks = useMemo(() => {
    return searchedTracks?.data;
  }, [searchedTracks?.data]);
  const searching = useMemo(
    () => isLoading || isFetching,
    [isFetching, isLoading]
  );

  // Track add to
  const [addToPlaylist, setAddToPlaylist] = useState<IAddToPlaylistState>({
    isOpen: false,
    track: null,
  });

  // Effects
  useEffect(() => {
    const customDebounce = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    // clean up
    return () => {
      clearTimeout(customDebounce);
    };
  }, [searchText]);
  return (
    <Container maxWidth="xl">
      <TopNavbar setSearchText={setSearchText} searching={searching} />

      {tracks?.length ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"row"}
          sx={{}}
        >
          <Box
            width={{ xs: "100%", sm: "80%", md: "60%", lg: "50%" }}
            borderRadius={4}
            sx={{
              mt: 1,
              p: 1,
              overflow: "scroll",
              maxHeight: 250,
              "&::-webkit-scrollbar": {
                display: "none",
              },
              alignSelf: "center",
              backgroundColor: "transparent.paper",
            }}
            boxShadow={3}
          >
            {tracks?.map(
              (item: {
                id: string;
                album: { name: string };
                name: string;
                artists: { name: string }[];
              }) => {
                return (
                  <Box key={item?.id} sx={{ display: "flex" }}>
                    <CardActionArea
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack>
                        <Typography variant="subtitle1">
                          {`Album: ${item?.album}`}
                        </Typography>
                        <Typography variant="subtitle2">{`Song: ${item?.name}`}</Typography>
                        <Typography variant="caption">{`Artists: ${item?.artists.join(
                          ", "
                        )}`}</Typography>
                      </Stack>
                      <Tooltip title="Add to playlist">
                        <IconButton
                          onClick={() =>
                            setAddToPlaylist({ isOpen: true, track: item })
                          }
                        >
                          <AddCircle />
                        </IconButton>
                      </Tooltip>
                    </CardActionArea>
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
      ) : null}

      <Playlists />

      <AddToPlaylistModal
        isOpen={addToPlaylist?.isOpen}
        handleClose={() => setAddToPlaylist({ isOpen: false, track: null })}
        track={addToPlaylist?.track}
      />
    </Container>
  );
};

export default Dashboard;
