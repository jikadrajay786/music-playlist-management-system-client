import {
  CloseOutlined,
  DeleteOutline,
  EditOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

interface IPlaylistData {
  _id: string;
  playlistName: string;
  description: string;
  tracks?: {
    id: string;
    album: { name: string };
    name: string;
    artists: { name: string }[];
  }[];
}
const PlaylistDetailDrawer = ({
  drawerOpen,
  handleDrawerClose,
  drawerData,
  setPlaylistModalData,
  setConfirmationModal,
}: {
  drawerOpen: boolean;
  handleDrawerClose: () => void;
  drawerData: IPlaylistData | null;
  setPlaylistModalData: ({
    isOpen,
    playlistData,
  }: {
    isOpen: boolean;
    playlistData: IPlaylistData | null;
  }) => void;
  setConfirmationModal: ({
    isOpen,
    playlistId,
  }: {
    isOpen: boolean;
    playlistId?: string;
  }) => void;
}) => {
  // Constants
  const tracks = useMemo(() => {
    return drawerData?.tracks;
  }, [drawerData?.tracks]);

  // Functions / handlers
  const handleEditClick = () => {
    handleDrawerClose();
    setPlaylistModalData({ isOpen: true, playlistData: drawerData });
  };
  const handleDeleteClick = () => {
    handleDrawerClose();
    setConfirmationModal({ isOpen: true, playlistId: drawerData?._id });
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            width: 350,
            p: 2,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{drawerData?.playlistName}</Typography>
          <Stack
            direction={"row"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            spacing={1}
          >
            <Tooltip title="Edit Playlist">
              <IconButton size="small" onClick={handleEditClick}>
                <EditOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Playlist">
              <IconButton size="small" onClick={handleDeleteClick}>
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close Playlist">
              <IconButton onClick={handleDrawerClose} size="small">
                <CloseOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
        <Box mt={2}>
          <Typography variant="body1">{drawerData?.description}</Typography>
        </Box>

        <Divider sx={{ mt: 1 }} />
        {tracks?.length ? (
          <Box
            borderRadius={4}
            sx={{
              mt: 1,
              mb: 1,
              overflow: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {tracks?.map(
              (item: {
                id: string;
                album: { name: string };
                name: string;
                artists: { name: string }[];
              }) => {
                return (
                  <Box
                    key={item?.id}
                    sx={{
                      display: "flex",
                      bgcolor: "#f5f5f5",
                      borderRadius: 4,
                      px: 2,
                      py: 1,
                      my: 1,
                    }}
                  >
                    <Stack>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >{`Song: ${item?.name}`}</Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {`Album: ${item?.album}`}
                      </Typography>
                      <Typography variant="caption">{`Artists: ${item?.artists.join(
                        ", "
                      )}`}</Typography>
                    </Stack>
                  </Box>
                );
              }
            )}
          </Box>
        ) : (
          <Stack height={100} alignItems={"center"} justifyContent={"center"}>
            <Typography>No songs in this playlist</Typography>
          </Stack>
        )}
      </Drawer>
    </>
  );
};

export default PlaylistDetailDrawer;
