import { CloseOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

interface IConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  deleteHandler: () => void;
  loading?: boolean;
}

const ConfirmationDialog = ({
  open,
  onClose,
  deleteHandler,
  loading,
}: IConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"}>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <IconButton
          onClick={() => onClose()}
          sx={{ position: "absolute", right: 5, top: 5 }}
        >
          <CloseOutlined />
        </IconButton>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h5" fontWeight={500} textAlign={"center"}>
            Delete Playlist
          </Typography>
        </Stack>
        <Typography
          variant="subtitle1"
          color="secondary.subtitle"
          px={2}
          lineHeight={1.3}
          textAlign={"center"}
        >
          Are tou sure you want to delete this playlist? this action is not
          reversible. all saved songs in it will be removed permanently!
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={deleteHandler}
          sx={{ borderRadius: 8 }}
          loading={loading}
          disabled={loading}
        >
          <Typography>Delete</Typography>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
