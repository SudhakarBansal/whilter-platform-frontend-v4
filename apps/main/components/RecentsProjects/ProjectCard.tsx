import { ProjectCardProps } from "@/types";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { ProjectStatusOverlay } from "./ProjectStatusOverlay";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const needsOverlay = project.status === 'in-process' || project.status === 'failed';

    return (
        <Card className="relative flex items-center bg-paper p-2 w-full">
            {needsOverlay && (
                <ProjectStatusOverlay
                    status={project.status}
                    progress={project.progress}
                />
            )}

            <Box
                component="img"
                src={project.image}
                alt={project.title}
                className="w-20 h-20 object-cover rounded-xl bg-primary-dark flex-shrink-0"
            />

            {project.status === 'completed' && (
                <>
                    <CardContent className="flex-1 flex-wrap p-2 pl-3 last:pb-2 text-start">
                        <Typography variant="subtitle1" className='text-blue-900'>
                            {project.title}
                        </Typography>
                        <Typography variant="body2" className="text-gray-400">
                            {project.date}
                        </Typography>
                    </CardContent>

                    <IconButton className="absolute shadow-lg right-4 top-1/2 -translate-y-1/2 text-primary w-10 h-10 hover:scale-110">
                        <PlayArrowIcon />
                    </IconButton>
                </>
            )}
        </Card>
    );
};
