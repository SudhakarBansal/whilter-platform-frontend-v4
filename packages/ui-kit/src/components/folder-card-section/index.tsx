import React from 'react';
import { Box } from '@mui/material';
import { ProjectsHeader } from './ProjectsHeader';
import { FolderCard } from './FolderCard';
import type { FolderCardSectionProps } from '@whilter/ui-kit/types';

export const FolderCardSection: React.FC<FolderCardSectionProps> = ({ data }) => {
    return (
        <Box className="w-full">
            <ProjectsHeader />

            <Box className="flex flex-row flex-wrap sm:gap-6 md:gap-14 py-4">
                {data.folders.map((folder, index) => (
                    <FolderCard
                        key={index}
                        title={folder.title}
                        projectCount={folder.projectCount}
                        avatars={folder.avatars}
                    />
                ))}
            </Box>
        </Box>
    );
};
