import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import {
  useDeletePlaylistMutation,
  useGetPlaylistQuery,
} from "../../../rtk-query/playlist-actions";
import PlaylistModal from "../../../components/modals/PlaylistModal";
import PlaylistDetailDrawer from "../../../components/drawers/PlaylistDetailDrawer";
import ConfirmationDialog from "../../../components/modals/ConfirmationDialog";
import album2 from "../../../assets/album2.jpg";
import album3 from "../../../assets/album3.jpg";
import { enqueueSnackbar } from "notistack";
import type { CustomError } from "../../../rtk-query/api-interceptor";

interface IPlaylistData {
  _id: string;
  playlistName: string;
  description: string;
}

const Playlists = () => {
  // Local states
  const [playlistModalData, setPlaylistModalData] = useState<{
    isOpen: boolean;
    playlistData: IPlaylistData | null;
  }>({
    isOpen: false,
    playlistData: null,
  });
  const [drawerData, setDrawerData] = useState({
    isDrawerOpen: false,
    data: null,
  });
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    playlistId?: string | null;
  }>({
    isOpen: false,
    playlistId: null,
  });

  // API
  const {
    data: playlistData,
    isLoading: loadingPlaylist,
    isFetching: fetchingPlaylist,
  } = useGetPlaylistQuery({});
  const [
    deletePlaylist,
    { isLoading: deletingPlaylist, isSuccess: playlistDeleted },
  ] = useDeletePlaylistMutation();

  // Constants
  const loading = useMemo(() => {
    return loadingPlaylist || fetchingPlaylist;
  }, [fetchingPlaylist, loadingPlaylist]);

  // Functions / handlers
  const handleEventDelegation = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const element = (e?.target as Element)?.closest("[data-id]");
      if (element) {
        const data = element.getAttribute("data-id");
        const filteredData = playlistData?.data?.filter(
          (item: { _id: string }) => item?._id === data
        );
        setDrawerData({ isDrawerOpen: true, data: filteredData?.[0] });
      }
    },
    [playlistData?.data]
  );

  const deleteHandler = useCallback(async () => {
    try {
      const res = await deletePlaylist(confirmationModal?.playlistId);
      if (res?.data?.success || playlistDeleted) {
        setConfirmationModal({ isOpen: false, playlistId: null });
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
        });
      } else {
        enqueueSnackbar((res?.error as CustomError)?.data?.message, {
          variant: "error",
        });
      }
    } catch (error) {
      console.log("error in delete playlist:::", error);
      setConfirmationModal({ isOpen: false, playlistId: null });
    }
  }, [confirmationModal?.playlistId, deletePlaylist, playlistDeleted]);

  return (
    <>
      {loading ? (
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="background.default"
        >
          <Stack spacing={2} width={150}>
            <Typography variant="h6">Loading...</Typography>
            <Skeleton variant="rectangular" height={20} />
            <Skeleton variant="rectangular" height={20} />
            <Skeleton variant="rectangular" height={20} />
          </Stack>
        </Box>
      ) : playlistData?.data?.length ? (
        <>
          <Stack direction={"row"} justifyContent={"flex-end"} mt={4}>
            <Button
              variant="text"
              size="small"
              onClick={() =>
                setPlaylistModalData({ isOpen: true, playlistData: null })
              }
            >
              <Typography sx={{ fontSize: 14 }}>Add Playlist</Typography>
            </Button>
          </Stack>
          <Grid container spacing={2} onClick={handleEventDelegation}>
            {playlistData?.data?.map(
              (
                item: {
                  _id: string;
                  playlistName: string;
                  description: string;
                },
                index: number
              ) => {
                return (
                  <Grid
                    key={item?._id}
                    data-id={item?._id}
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    mt={4}
                  >
                    <Card sx={{ display: "flex", borderRadius: 4 }}>
                      <CardActionArea
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          height: "100%",
                          "&[data-active]": {
                            backgroundColor: "action.selected",
                            "&:hover": {
                              backgroundColor: "action.selectedHover",
                            },
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              textAlign={"start"}
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {item?.playlistName}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              lineHeight={1.5}
                              sx={{
                                color: "text.secondary",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {item?.description}
                            </Typography>
                          </CardContent>
                        </Box>
                        <CardMedia
                          component="img"
                          sx={{ width: 110 }}
                          image={index % 2 === 0 ? album2 : album3}
                          alt="Live from space album cover"
                        />
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              }
            )}
          </Grid>
        </>
      ) : (
        <Stack alignItems={"center"} justifyContent={"center"} mt={8} gap={2}>
          <Typography variant="h5">No Playlist</Typography>
          <Button
            variant="text"
            size="small"
            onClick={() =>
              setPlaylistModalData({ isOpen: true, playlistData: null })
            }
          >
            <Typography sx={{ fontSize: 14 }}>Add Playlist</Typography>
          </Button>
        </Stack>
      )}

      <PlaylistModal
        open={playlistModalData?.isOpen}
        playlistData={playlistModalData?.playlistData}
        handleClose={() =>
          setPlaylistModalData({ isOpen: false, playlistData: null })
        }
      />

      <PlaylistDetailDrawer
        drawerOpen={drawerData?.isDrawerOpen}
        handleDrawerClose={() =>
          setDrawerData({ isDrawerOpen: false, data: null })
        }
        drawerData={drawerData?.data}
        setPlaylistModalData={setPlaylistModalData}
        setConfirmationModal={setConfirmationModal}
      />

      <ConfirmationDialog
        open={confirmationModal?.isOpen}
        onClose={() =>
          setConfirmationModal({ isOpen: false, playlistId: null })
        }
        deleteHandler={deleteHandler}
        loading={deletingPlaylist}
      />
    </>
  );
};

export default Playlists;
