import React from 'react';
import { Box, Typography, Card, CardContent, LinearProgress, IconButton, Stack, useTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const projects = [
  {
    id: 1,
    title: 'TTS Audio Project',
    date: '20 January',
    status: 'completed',
    image: '/images/project1.png',
    progress: 100,
  },
  {
    id: 2,
    title: 'TTS Audio Project',
    date: '20 January',
    status: 'in-process',
    image: '/images/project2.png',
    progress: 10,
  },
  {
    id: 3,
    title: 'TTS Audio Project',
    date: '20 January',
    status: 'failed',
    image: '/images/project3.png',
    progress: 10,
  },
];

const statusColors = (theme, status) => {
  switch (status) {
    case 'in-process':
      return { bg: theme.palette.grey[800], text: theme.palette.text.primary };
    case 'failed':
      return { bg: theme.palette.error.dark, text: theme.palette.error.main };
    case 'completed':
    default:
      return { bg: theme.palette.background.paper, text: theme.palette.text.primary };
  }
};

export const RecentProjects = () => {
  const theme = useTheme();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Recent Projects</Typography>
        <Typography variant="body2" className='text-cyan-400' sx={{ cursor: 'pointer' }}>View all</Typography>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {projects.map((project) => {
          const { bg, text } = statusColors(theme, project.status);
          return (
            <Card
              key={project.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                background: bg,
                color: text,
                borderRadius: 3,
                boxShadow: theme.shadows[3],
                minHeight: 120,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: 2,
                  m: 2,
                  background: theme.palette.grey[900],
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {project.status === 'in-process' && 'In Process'}
                  {project.status === 'failed' && (
                    <Box component="span" sx={{ color: theme.palette.error.main, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ErrorOutlineIcon fontSize="small" /> Failed
                    </Box>
                  )}
                  {project.status === 'completed' && project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {project.date}
                </Typography>
                {project.status === 'in-process' && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={project.progress}
                      sx={{
                        flex: 1,
                        height: 6,
                        borderRadius: 3,
                        background: theme.palette.grey[700],
                        '& .MuiLinearProgress-bar': {
                          background: theme.palette.primary.main,
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ ml: 1 }}>{project.progress}%</Typography>
                  </Box>
                )}
              </CardContent>
              {project.status === 'completed' && (
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: theme.palette.primary.main,
                    color: '#fff',
                    boxShadow: theme.shadows[2],
                    '&:hover': { background: theme.palette.primary.dark },
                  }}
                >
                  <PlayArrowIcon />
                </IconButton>
              )}
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
