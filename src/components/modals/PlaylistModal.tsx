import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useForm } from "react-hook-form";
import RHFTextfield from "../hook-form/RHFTextfield";
import RHFFormProvider from "../hook-form/RHFFormProvider";
import {
  useAddPlaylistMutation,
  useUpdatePlaylistMutation,
} from "../../rtk-query/playlist-actions";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import type { CustomError } from "../../rtk-query/api-interceptor";

interface IFormValues {
  playlistName: string;
  description: string;
}

const playlistSchema = Yup.object().shape({
  playlistName: Yup.string()
    .required("Playlist name is required")
    .min(6)
    .max(20),
  description: Yup.string()
    .required("Description is required")
    .min(10)
    .max(150),
});

const PlaylistModal = ({
  open,
  handleClose,
  playlistData,
}: {
  open: boolean;
  handleClose: () => void;
  playlistData?: {
    _id: string;
    playlistName: string;
    description: string;
  } | null;
}) => {
  // API
  const [addPlaylist, { isLoading: addingPlaylist }] = useAddPlaylistMutation();
  const [updatePlaylist, { isLoading: updatingPlaylist }] =
    useUpdatePlaylistMutation();

  // Form
  const methods = useForm({
    resolver: yupResolver(playlistSchema),
    reValidateMode: "onChange",
    defaultValues: { playlistName: "", description: "" },
  });
  const { handleSubmit, reset } = methods;

  // Functions / handlers
  const onSubmit = async (formValues: IFormValues) => {
    let res;
    if (playlistData?._id) {
      res = await updatePlaylist({
        ...formValues,
        playlistId: playlistData?._id,
      });
    } else {
      res = await addPlaylist(formValues);
    }
    if (res?.data?.success) {
      enqueueSnackbar(res?.data?.message, { variant: "success" });
      reset({ playlistName: "", description: "" });
      handleClose();
    } else {
      enqueueSnackbar((res?.error as CustomError)?.data?.message, {
        variant: "error",
      });
    }
  };

  const onClose = () => {
    if (!addingPlaylist && !updatingPlaylist) {
      reset({ playlistName: "", description: "" });
      handleClose();
    }
  };

  useEffect(() => {
    if (playlistData?._id && playlistData?.playlistName) {
      reset({
        playlistName: playlistData?.playlistName,
        description: playlistData?.description,
      });
    }
  }, [
    playlistData?._id,
    playlistData?.description,
    playlistData?.playlistName,
    reset,
  ]);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {playlistData?._id ? "Update Playlist" : "Create Playlist"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To create playlist please provide playlist name and its descriptions
          and add songs of into it.
        </DialogContentText>
        <RHFFormProvider
          methods={methods}
          onSubmit={handleSubmit((value) => onSubmit(value))}
        >
          <Stack direction={"column"} gap={2} mt={4}>
            <RHFTextfield name="playlistName" placeholder="playlist name" />
            <RHFTextfield
              name="description"
              placeholder="playlist description"
            />
            <Stack direction={"row"} justifyContent={"flex-end"} gap={2}>
              <Button
                variant="outlined"
                size="large"
                onClick={onClose}
                sx={{ borderRadius: 8 }}
                disabled={addingPlaylist || updatingPlaylist}
              >
                <Typography>Cancel</Typography>
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit((values) => onSubmit(values))}
                sx={{ borderRadius: 8 }}
                loading={addingPlaylist || updatingPlaylist}
                disabled={addingPlaylist || updatingPlaylist}
              >
                <Typography>
                  {playlistData?._id ? "Update" : "Create"}
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </RHFFormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistModal;
