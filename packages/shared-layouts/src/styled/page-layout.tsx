"use client";
import React, { ReactNode } from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider,
  Container,
  Fade,
  Skeleton,
  Breadcrumbs,
  Link,
  ContainerProps,
  Theme
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Type definitions
interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface ContainerConfig {
  padding?: number;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  minHeight?: string | number;
}

interface HeaderConfig {
  marginBottom?: number;
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
}

interface HeadingConfig {
  fontWeight?: string | number;
  color?: string;
  fontSize?: string;
  marginBottom?: number;
}

interface DescriptionConfig {
  color?: string;
  fontSize?: string;
  lineHeight?: number;
  maxWidth?: string;
}

interface ButtonConfig {
  gap?: number;
  wrap?: boolean;
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
}

interface ContentConfig {
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
  minHeight?: string | number;
  border?: string;
}

interface AnimationConfig {
  enabled?: boolean;
  timeout?: number;
}

interface DividerConfig {
  show?: boolean;
  margin?: number;
}

interface BreadcrumbsConfig {
  marginBottom?: number;
  fontSize?: string;
  linkColor?: string;
  linkHoverColor?: string;
  currentColor?: string;
  currentFontWeight?: number;
  separatorColor?: string;
}

export interface PageLayoutConfig {
  container?: ContainerConfig;
  header?: HeaderConfig;
  heading?: HeadingConfig;
  description?: DescriptionConfig;
  buttons?: ButtonConfig;
  content?: ContentConfig;
  animations?: AnimationConfig;
  divider?: DividerConfig;
  breadcrumbs?: BreadcrumbsConfig;
}

export interface PageLayoutProps extends Omit<ContainerProps, 'children'> {
  heading?: string;
  description?: string;
  buttons?: ReactNode[];
  breadcrumbs?: BreadcrumbItem[];
  hero?: ReactNode; // Add this line
  children?: ReactNode;
  config?: PageLayoutConfig;
  loading?: boolean;
  className?: string;
}

// Styled components with proper typing
const StyledPageContainer = styled(Container)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  padding: theme.spacing(config?.container?.padding || 0),
  minHeight: config?.container?.minHeight || 'auto',
}));

const StyledBreadcrumbs = styled(Breadcrumbs)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  marginBottom: theme.spacing(config?.breadcrumbs?.marginBottom || 2),
  '& .MuiBreadcrumbs-separator': {
    color: config?.breadcrumbs?.separatorColor || theme.palette.text.secondary,
  },
  '& .MuiBreadcrumbs-li': {
    fontSize: config?.breadcrumbs?.fontSize || '0.875rem',
  }
}));

const StyledBreadcrumbLink = styled(Link)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  textDecoration: 'none',
  color: config?.breadcrumbs?.linkColor || theme.palette.primary.main,
  fontSize: config?.breadcrumbs?.fontSize || '0.875rem',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
    color: config?.breadcrumbs?.linkHoverColor || theme.palette.primary.dark,
  },
}));

const StyledBreadcrumbText = styled(Typography)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  color: config?.breadcrumbs?.currentColor || theme.palette.text.primary,
  fontSize: config?.breadcrumbs?.fontSize || '0.875rem',
  fontWeight: config?.breadcrumbs?.currentFontWeight || 500,
}));

const StyledHeader = styled(Box)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  marginBottom: theme.spacing(config?.header?.marginBottom || 3),
  padding: config?.header?.padding ? theme.spacing(config.header.padding) : 0,
  backgroundColor: config?.header?.backgroundColor || 'transparent',
  borderRadius: config?.header?.borderRadius ? theme.spacing(config.header.borderRadius) : 0,
}));

const StyledHeading = styled(Typography)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  fontWeight: config?.heading?.fontWeight || 'bold',
  color: config?.heading?.color || theme.palette.text.primary,
  fontSize: config?.heading?.fontSize || '2rem',
  marginBottom: config?.heading?.marginBottom ? theme.spacing(config.heading.marginBottom) : theme.spacing(1),
}));

const StyledDescription = styled(Typography)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  color: config?.description?.color || theme.palette.text.secondary,
  fontSize: config?.description?.fontSize || '1rem',
  lineHeight: config?.description?.lineHeight || 1.6,
  maxWidth: config?.description?.maxWidth || '100%',
}));

const StyledButtonContainer = styled(Box)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  display: 'flex',
  gap: theme.spacing(config?.buttons?.gap || 1),
  flexWrap: config?.buttons?.wrap ? 'wrap' : 'nowrap',
  justifyContent: config?.buttons?.justify || 'flex-end',
  alignItems: config?.buttons?.align || 'center',
}));

const StyledContent = styled(Box)<{ config: PageLayoutConfig }>(({ theme, config }) => ({
  backgroundColor: config?.content?.backgroundColor || 'transparent',
  padding: config?.content?.padding ? theme.spacing(config.content.padding) : 0,
  borderRadius: config?.content?.borderRadius ? theme.spacing(config.content.borderRadius) : 0,
  minHeight: config?.content?.minHeight || 'auto',
  border: config?.content?.border || 'none',
}));

export const PageLayout: React.FC<PageLayoutProps> = ({
  heading,
  description,
  buttons = [],
  breadcrumbs = [],
  children,
  config = {},
  loading = false,
  className = "",
  hero, // Destructure hero prop
  ...props
}) => {
  // Default configuration
  const defaultConfig: PageLayoutConfig = {
    container: {
      padding: 0,
      maxWidth: 'lg',
      minHeight: 'auto',
    },
    header: {
      marginBottom: 3,
      padding: 0,
      backgroundColor: 'transparent',
      borderRadius: 0,
    },
    heading: {
      fontWeight: 'bold',
      fontSize: '2rem',
      marginBottom: 1,
    },
    description: {
      fontSize: '1rem',
      lineHeight: 1.6,
      maxWidth: '100%',
    },
    buttons: {
      gap: 1,
      wrap: false,
      justify: 'flex-end',
      align: 'center',
    },
    content: {
      padding: 0,
      backgroundColor: 'transparent',
      borderRadius: 0,
      minHeight: 'auto',
      border: 'none',
    },
    animations: {
      enabled: true,
      timeout: 300,
    },
    divider: {
      show: true,
      margin: 2,
    },
    breadcrumbs: {
      marginBottom: 2,
      fontSize: '0.875rem',
      currentFontWeight: 500,
    }
  };

  // Deep merge configuration
  const mergeConfig = (def: PageLayoutConfig, custom: PageLayoutConfig): PageLayoutConfig => ({
    container: { ...def.container, ...custom.container },
    header: { ...def.header, ...custom.header },
    heading: { ...def.heading, ...custom.heading },
    description: { ...def.description, ...custom.description },
    buttons: { ...def.buttons, ...custom.buttons },
    content: { ...def.content, ...custom.content },
    animations: { ...def.animations, ...custom.animations },
    divider: { ...def.divider, ...custom.divider },
    breadcrumbs: { ...def.breadcrumbs, ...custom.breadcrumbs },
  });

  const mergedConfig = mergeConfig(defaultConfig, config);

  const PageContent: React.FC = () => (
    <StyledPageContainer
      config={mergedConfig}
      className={`${className} transition-all duration-300 max-w-[90vw] px-10`}
      {...props}
    >
      {/* Breadcrumbs Section */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <StyledBreadcrumbs
          config={mergedConfig}
          className="animate-fade-in"
          aria-label="breadcrumb"
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            if (loading) {
              return (
                <Skeleton
                  key={index}
                  variant="text"
                  width={60}
                  height={20}
                />
              );
            }

            return isLast ? (
              <StyledBreadcrumbText
                key={index}
                config={mergedConfig}
                aria-current="page"
              >
                {crumb.label}
              </StyledBreadcrumbText>
            ) : (
              <StyledBreadcrumbLink
                key={index}
                config={mergedConfig}
                href={crumb.href}
                onClick={(e) => {
                  if (crumb.onClick) {
                    e.preventDefault();
                    crumb.onClick();
                  }
                }}
              >
                {crumb.label}
              </StyledBreadcrumbLink>
            );
          })}
        </StyledBreadcrumbs>
      )}

      {/* Hero Section */}
      {hero && (
        <Box className="mb-20 animate-fade-in">
          {hero}
        </Box>
      )}

      {/* Header Section */}
      <StyledHeader config={mergedConfig}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', sm: 'flex-center' }}
          spacing={2}
        >
          {/* Title and Description */}
          <Box sx={{ flex: 1 }}>
            {loading ? (
              <>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="80%" height={24} />
              </>
            ) : (
              <>
                {heading && (
                  <StyledHeading
                    variant="h1"
                    config={mergedConfig}
                    className="animate-fade-in"
                  >
                    {heading}
                  </StyledHeading>
                )}
                {description && (
                  <StyledDescription
                    variant="body1"
                    config={mergedConfig}
                    className="animate-fade-in animation-delay-100"
                  >
                    {description}
                  </StyledDescription>
                )}
              </>
            )}
          </Box>

          {/* Action Buttons */}
          {buttons && buttons.length > 0 && (
            <StyledButtonContainer
              config={mergedConfig}
              className="animate-fade-in animation-delay-200"
            >
              {loading ? (
                Array.from({ length: Math.min(buttons.length, 3) }).map((_, index) => (
                  <Skeleton key={index} variant="rectangular" width={80} height={36} />
                ))
              ) : (
                buttons.map((button, index) => (
                  <Box key={index}>
                    {button}
                  </Box>
                ))
              )}
            </StyledButtonContainer>
          )}
        </Stack>
      </StyledHeader>

      {/* Divider */}
      {mergedConfig.divider?.show && (breadcrumbs?.length > 0 || heading || description || (buttons && buttons.length > 0)) && (
        <Divider
          className="animate-fade-in animation-delay-300"
          sx={{
            my: mergedConfig.divider.margin,
            opacity: 0.1
          }}
        />
      )}

      {/* Main Content */}
      <StyledContent
        config={mergedConfig}
        className="animate-fade-in animation-delay-400"
      >
        {loading ? (
          <Stack spacing={2}>
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
          </Stack>
        ) : (
          <Stack spacing={12} paddingY={3}>
            {children}
          </Stack>
        )}
      </StyledContent>
    </StyledPageContainer>
  );

  // Return with or without animation based on config
  return mergedConfig.animations?.enabled ? (
    <Fade in timeout={mergedConfig.animations.timeout}>
      <div>
        <PageContent />
      </div>
    </Fade>
  ) : (
    <PageContent />
  );
};