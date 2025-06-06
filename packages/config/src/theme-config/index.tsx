'use client'

import { CssBaseline, StyledEngineProvider, Theme, ThemeOptions } from '@mui/material';
import React, { useMemo, ReactNode } from 'react';
import { Direction, ThemeProvider, createTheme } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import colors from './scss/variables.module.scss';
// import colors from "./theme.module.css";
import { colors } from './variables'; 
import componentsOverride from './overrides';
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
        textTransform: 'none',
        fontSize: 16,
      },
      button: {
        default:color.button.defaultBackground,
        primaryLight: color.button.primaryLight,
        primaryDark: color.button.primaryDark,
        disabled: color.button.buttonDisabled,
      },
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

