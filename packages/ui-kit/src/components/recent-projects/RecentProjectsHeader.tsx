import { Stack, Typography } from "@mui/material";


export interface RecentHeaderProps {
  label: string;
}
export const RecentProjectsHeader = ({ label }: RecentHeaderProps) => {
  return (
    <Stack
      className="flex flex-col sm:flex-row mb-6"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h2">{label}</Typography>
      <Typography
        variant="body2"
        className="text-cyan-400 cursor-pointer hover:text-cyan-300"
      >
        View all
      </Typography>
    </Stack>
  );
};

