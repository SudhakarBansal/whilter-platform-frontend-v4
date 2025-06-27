'use client'

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import React, { useMemo, type ReactNode } from 'react';
import type { Direction } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import colors from './scss/variables.module.scss';
// import colors from "./theme.module.css";
import { colors } from './variables'; 
import componentsOverride from '../../../ui-kit/src/atoms';
import themePalette from './palette';
import themeTypography from './typography';


interface ThemeConfigProps {
  children: ReactNode;
}

export const ThemeConfig: React.FC<ThemeConfigProps> = ({ children }) => {
  const color = colors;
  const themeOption = useMemo(
    () => ({
      colors: color,
      heading: color.primaryMain,
      paper: color.paper,
      darkPaper:color.darkPaper,
      background: color.background,
      darkTextSecondary: color.gray400,
      textColor: color.textColor,
        navbar: {
        default: color.navbar.default, 
        light: color.navbar.light, 
        dark: color.navbar.dark, 
      },
      sidebar: {
        default: color.sidebar.default, 
        light: color.sidebar.light, 
        dark: color.sidebar.dark,
      },
      fontFamily: ['Rubik', 'Regular', 'sans-serif'].join(','),
      allVariants: {
        fontFamily: 'Rubik, sans-serif',
        textTransform: 'none' as const,
        fontSize: 16,
      },
      button: {
        primary: colors?.button?.primaryMain,
        primaryLight: colors?.button?.primaryLight,
        primaryDark: colors?.button?.primaryDark,
        secondary: colors?.button?.secondaryMain,
        secondaryLight: colors?.button?.secondaryLight,
        secondaryDark: colors?.button?.secondaryDark,
        disabled: colors?.button?.buttonDisabled,
      },
      divider:colors?.divider,
    }),
    [color],
  );

  const themeOptions = useMemo(
    () => ({
      direction: 'ltr' as Direction,
      palette: themePalette(themeOption),
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px',
          },
        },
      },
      shape: { borderRadius: 4 },
      typography: themeTypography(themeOption),
    }),
    [themeOption],
  );

  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes, themeOption);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

