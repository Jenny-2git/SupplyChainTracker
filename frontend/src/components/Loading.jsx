import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ text = "Loading..." }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="300px"
      gap={2}
    >
      <CircularProgress />

      <Typography variant="h6">
        {text}
      </Typography>
    </Box>
  );
}