import React from 'react';
import { Box } from '@mui/material';
import type { ProjectStatus } from '@whilter/ui-kit/types';
import type { RecentProjectProps } from '@whilter/ui-kit/types';
import { RecentProjectsHeader } from './RecentProjectsHeader';
import { ProjectCard } from './ProjectCard';

export const RecentProjects:React.FC<RecentProjectProps> = ({data}) => {
  return (
    <Box className="w-full">
      <RecentProjectsHeader />

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14 py-4">
        {data.map((project) => (
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