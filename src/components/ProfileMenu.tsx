import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../rtk-query/api-interceptor";

const ProfileMenu = ({
  anchorEl,
  open,
  handleClose,
}: {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}) => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Functions / handlers
  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(api.util.resetApiState());
    navigate("/login", { replace: true });
  };
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
