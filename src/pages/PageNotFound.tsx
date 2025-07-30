import { Box, Typography } from "@mui/material";

const PageNotFound = () => {
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      display="flex"
    >
      <Typography variant="h4" fontWeight={900}>
        404 Page Not Found
      </Typography>
    </Box>
  );
};

export default PageNotFound;
