import { HomeFilled, NoiseAware } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";

function TopNavbar({
  setSearchText,
  searching
}: {
  setSearchText: (data: string) => void;
  searching:boolean
}) {
  // Hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Local states
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Constants
  const open = Boolean(anchorEl);

  // Functions / handlers
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#fff",
        borderRadius: 8,
        pr: 1,
        zIndex: 999,
      }}
    >
      <Stack
        direction={{ xs: "row", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        // pb={matches ? 2 : 0}
      >
        <IconButton>
          <NoiseAware fontSize="large" />
        </IconButton>

        <Stack direction={"row"} alignItems={"center"} gap={1}>
          {isMobile ? null : (
            <IconButton onClick={() => setSearchText("")}>
              <HomeFilled />
            </IconButton>
          )}
          <SearchBar
            onSearch={(val: string) => {
              setSearchText(val);
            }}
            searching={searching}
          />
        </Stack>

        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} />
        </IconButton>
      </Stack>
      {/* <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={matches ? 2 : 0}
      >
        {matches ? (
          <Stack
            width={"100%"}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack
              direction={"row"}
              gap={2}
              alignItems={"center"}
              pl={2}
              py={1}
            >
              <IconButton>
                <NoiseAware fontSize="large" />
              </IconButton>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={0}
              pr={2}
              py={1}
            >
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Stack>
          </Stack>
        ) : null}
        {!matches ? (
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <IconButton>
              <NoiseAware fontSize="large" />
            </IconButton>
          </Stack>
        ) : null}

        {!matches ? (
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <IconButton onClick={() => setSearchText("")}>
              <HomeFilled />
            </IconButton>
            <SearchBar
              onSearch={(val: string) => {
                setSearchText(val);
              }}
            />
          </Stack>
        ) : null}

        {!matches ? (
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Stack>
        ) : null}

        {matches ? (
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <IconButton onClick={() => setSearchText("")}>
              <HomeFilled />
            </IconButton>
            <SearchBar
              onSearch={(val: string) => {
                setSearchText(val);
              }}
            />
          </Stack>
        ) : null}
      </Stack> */}
      <ProfileMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </AppBar>
  );
}

export default TopNavbar;
