import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useGetPlaylistQuery } from "../../rtk-query/playlist-actions";
import { useCallback, useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import { useAddToPlaylistMutation } from "../../rtk-query/tracks-actions";
import { enqueueSnackbar } from "notistack";
import type { CustomError } from "../../rtk-query/api-interceptor";

interface ITrack {
  id: string;
  name: string;
  album: { name: string };
  artists: { name: string }[];
}
interface IAddToPlaylistModalProps {
  isOpen: boolean;
  handleClose: () => void;
  track: ITrack | null;
}
const AddToPlaylistModal = ({
  isOpen,
  handleClose,
  track,
}: IAddToPlaylistModalProps) => {
  // Local state
  const [addingToPlaylist, setAddingToPlaylist] = useState<{
    loading: boolean;
    playlistId: string | null;
  }>({
    loading: true,
    playlistId: null,
  });

  // API call
  const { data: playlistData } = useGetPlaylistQuery({});
  const [addToPlaylist] = useAddToPlaylistMutation();

  // Functions / handlers
  const handlePlaylistSelection = useCallback(
    async (playlistId: string) => {
      try {
        setAddingToPlaylist({ loading: true, playlistId });

        const res = await addToPlaylist({ playlistId, track });
        if (res?.data?.success) {
          enqueueSnackbar(res?.data?.message, {
            variant: "success",
          });
          setAddingToPlaylist({ loading: false, playlistId: null });
          handleClose();
        } else {
          enqueueSnackbar((res?.error as CustomError)?.data?.message, {
            variant: "error",
          });
          setAddingToPlaylist({ loading: false, playlistId: null });
        }
      } catch (error) {
        console.log("error while adding songs to playlist", error);
        setAddingToPlaylist({ loading: false, playlistId: null });
      }
    },
    [addToPlaylist, handleClose, track]
  );
  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="xs">
      <IconButton
        onClick={() => !addingToPlaylist?.loading && handleClose()}
        sx={{ position: "absolute", right: 5, top: 5 }}
      >
        <CloseOutlined />
      </IconButton>
      <DialogContent>
        <Typography mt={4} variant="h6">
          Add Track to Playlist
        </Typography>

        <Stack direction={"column"} spacing={1} mt={2}>
          {playlistData?.data?.map(
            (item: { _id: string; playlistName: string }) => {
              return (
                <Box
                  bgcolor={"ghostwhite"}
                  key={item?._id}
                  onClick={() => {
                    handlePlaylistSelection(item?._id);
                  }}
                  px={2}
                  py={1}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#e0e0e0",
                    color: "white",
                    transition: "background-color 0.3s ease-in-out",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    },
                    borderRadius: 2,
                  }}
                >
                  <Typography>{item?.playlistName}</Typography>
                  {addingToPlaylist?.loading &&
                  item?._id === addingToPlaylist?.playlistId ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : null}
                </Box>
              );
            }
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddToPlaylistModal;
