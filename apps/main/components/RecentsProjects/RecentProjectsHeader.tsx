import { Stack, Typography } from "@mui/material";

export const RecentProjectsHeader = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" className="mb-6">
      <Typography variant="h2">Recent Projects</Typography>
      <Typography
        variant="body2"
        className="text-cyan-400 cursor-pointer hover:text-cyan-300"
      >
        View all
      </Typography>
    </Stack>
  );
};
