"use client";
import React, { type ReactNode } from 'react';
import {
    Box,
    Paper,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { PageLayoutProps } from '@whilter/shared-layouts/styled';
import PageClientLayout from '@/layouts/page-client-layout/PageClientLayout';

// Type definitions
export interface ToolsLayoutProps extends Omit<PageLayoutProps, 'children'> {
    children?: ReactNode;
    headerSection?: ReactNode;
    toolsSection: ReactNode;
    controlsSection: ReactNode;
    splitRatio?: [number, number]; // [left, right] ratio (default: [8, 4])
    spacing?: number;
    elevation?: number;
    borderRadius?: number;
    headerHeight?: string;
    stickyHeader?: boolean;
}

// Styled components
const StyledLayoutContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    gap: theme.spacing(2),
}));

const StyledHeaderSection = styled(Paper, {
    shouldForwardProp: (prop) => prop !== 'stickyHeader',
})<{ stickyHeader?: boolean }>(({ theme, stickyHeader }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: "transparent",
    ...(stickyHeader && {
        position: 'sticky',
        top: 0,
        zIndex: theme.zIndex.appBar,
    }),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1.5, 2),
        flexDirection: 'column',
        gap: theme.spacing(1),
        alignItems: 'stretch',
    },
}));

const StyledContentWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
        gap: theme.spacing(2),
    },
}));

const StyledToolsContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(3),
    flex: 1,
    gridTemplateColumns: '1fr',
    alignItems: 'start',
    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'var(--tools-width) var(--controls-width)',
    },
    [theme.breakpoints.down('lg')]: {
        gap: theme.spacing(2),
    },
}));

const StyledToolsSection = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '500px',
    backgroundColor: 'transparent',
}));

const StyledControlsSection = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '500px',
    height: '100%',
    background: `linear-gradient(to bottom, ${theme.palette.blue?.[400] || '#42a5f5'}, ${theme.palette.blue?.[800] || '#1565c0'})`,
    [theme.breakpoints.up('lg')]: {
        position: 'sticky',
        top: theme.spacing(2),
        alignSelf: 'start',
    },
    [theme.breakpoints.down('lg')]: {
        height: 'auto',
    },
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2),
    },
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.grey[100],
        borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.grey[400],
        borderRadius: '3px',
        '&:hover': {
            background: theme.palette.grey[600],
        },
    },
}));

export const ToolsLayout: React.FC<ToolsLayoutProps> = ({
    headerSection,
    toolsSection,
    controlsSection,
    splitRatio = [8, 4],
    spacing = 3,
    elevation = 1,
    borderRadius = 2,
    headerHeight = 'auto',
    stickyHeader = false,
    children,
    ...pageLayoutProps
}) => {
    const theme = useTheme();
    const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));

    // Calculate CSS Grid template columns
    const getGridColumns = () => {
        const total = splitRatio[0] + splitRatio[1];
        const toolsPercent = (splitRatio[0] / total) * 100;
        const controlsPercent = (splitRatio[1] / total) * 100;

        return {
            '--tools-width': `${toolsPercent}%`,
            '--controls-width': `${controlsPercent}%`,
        };
    };

    const gridStyle = getGridColumns();

    return (
        <PageClientLayout {...pageLayoutProps}>
            <StyledLayoutContainer>
                {/* Header Section */}
                {headerSection && (
                    <StyledHeaderSection
                        elevation={elevation}
                        stickyHeader={stickyHeader}
                        sx={{
                            borderRadius: borderRadius,
                            height: headerHeight,
                        }}
                    >
                        {headerSection}
                    </StyledHeaderSection>
                )}

                {/* Main Content Wrapper */}
                <StyledContentWrapper>
                    {/* Main Content Area */}
                    <StyledToolsContainer
                        sx={{
                            gap: spacing,
                            ...gridStyle,
                        }}
                    >
                        {/* Tools Section */}
                        <StyledToolsSection
                            elevation={elevation}
                            sx={{
                                borderRadius: borderRadius,
                            }}
                        >
                            {toolsSection}
                        </StyledToolsSection>

                        {/* Controls Section */}
                        <StyledControlsSection
                            elevation={elevation}
                            sx={{
                                borderRadius: borderRadius,
                            }}
                        >
                            {controlsSection}
                        </StyledControlsSection>
                    </StyledToolsContainer>
                </StyledContentWrapper>

                {/* Additional content if provided */}
                {children && (
                    <Box sx={{ mt: spacing }}>
                        {children}
                    </Box>
                )}
            </StyledLayoutContainer>
        </PageClientLayout>
    );
};