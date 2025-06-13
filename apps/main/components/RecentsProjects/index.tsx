import React from 'react';
import { Box } from '@mui/material';
import { projects } from '@/utils/data/projects';
import { ProjectStatus } from '@/types';
import { RecentProjectsHeader } from './RecentProjectsHeader';
import { ProjectCard } from './ProjectCard';

export const RecentProjects = () => {
  return (
    <Box className="w-full my-20">
      <RecentProjectsHeader />

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-14 py-4">
        {projects.map((project) => (
          <ProjectCard key={project.id}
            project={{
              ...project,
              status: project.status as ProjectStatus
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RecentProjects;