import { ProjectStatusOverlayProps } from '@whilter/ui-kit/types';
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ProjectStatusOverlay: React.FC<ProjectStatusOverlayProps> = ({ status, progress }) => {
  return (
    <Box className="absolute inset-0 flex items-center justify-center flex-col z-10 bg-black/75">
      {status === 'in-process' && progress !== undefined && (
        <Box className="w-4/5 text-center">
          <Typography variant="subtitle1" className="mb-2">
            In Process
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} className="w-full">
            <LinearProgress
              variant="determinate"
              value={progress}
              className="w-full h-1.5 rounded-full bg-gray-600 [&>.MuiLinearProgress-bar]:bg-emerald-500"
            />
            <Typography variant="caption" className="text-white">
              {progress}%
            </Typography>
          </Stack>
        </Box>
      )}

      {status === 'failed' && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <ErrorOutlineIcon fontSize="small" className="text-error-dark" />
          <Typography variant="subtitle1" className="text-white">
            Failed
          </Typography>
        </Stack>
      )}
    </Box>
  );
};
