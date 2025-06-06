import { PaletteOptions } from '@mui/material/styles';
import "../types/index"

interface ThemeColors {
  darkPaper?: string;
  white?: string;
  primaryLight?: string;
  primaryMain?: string;
  primaryDark?: string;
  primary500?: string;
  secondaryMain?: string;
  secondaryLight?: string;
  secondaryDark?: string;
  errorMain?: string;
  errorLight?: string;
  errorDark?: string;  
  warningLight?: string;
  warningMain?: string;
  warningDark?: string;
  successMain?: string;
  successDark?: string;
  borderColor?: string;
  borderColorFocus?: string;
  grey50?: string;
  grey100?: string;
  grey200?: string;
  gray400?: string;
  gray800?: string;
  blue50?: string;
  blue100?: string;
  blue200?: string;
  blue300?: string;
  blue400?: string;
  blue500?: string;
  blue600?: string;
  blue700?: string;
  blue800?: string;
  blue900?: string;
  darkTextPrimary?: string;
  darkLevel1?: string;
  darkLevel2?: string;
  darkBackground?: string;
  textDisabled?: string;
  navBackgroundLight?: string;
  mainBackgroundLight?: string;
  buttonDisabled?: string;
  button?: {
    primaryMain?: string;
    primaryLight?: string;
    primaryDark?: string;
    secondaryMain?: string;
    secondaryLight?: string;
    secondaryDark?: string;
    buttonDisabled?: string;
  };
  navbar?: {
    default?: string;
    light?: string;
    dark?: string;
  };
  sidebar?: {
    default?: string;
    light?: string;
    dark?: string;
  };
}

interface ThemeOptions {
  navType?: 'light' | 'dark';
  colors?: ThemeColors;
  darkTextSecondary?: string;
  heading?: string;
  textDark?: string;
  textColor?: string;
  paper?: string;
  backgroundDefault?: string;
  background?: string;
  darkBottomNav?: string;
}

export default function themePalette(theme: ThemeOptions): PaletteOptions {
  console.log('theme --00', theme);
  return {
    mode: theme?.navType,
    common: {
      black: theme.colors?.darkPaper,
      white: theme.colors?.white,
    },
    primary: {
      light: theme.colors?.primaryLight,
      main: theme.colors?.primaryLight ?? '#2196F3',
      dark: theme.colors?.primaryDark,
    },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain ?? '#31C48D',
      dark: theme.colors?.secondaryDark,
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain ?? '#F05252',
      dark: theme.colors?.errorDark
    },
    blue: {
      300: theme.colors?.blue300,
      400: theme.colors?.blue400,
      450: theme.colors?.blue400,
      500: theme.colors?.blue500,
      600: theme.colors?.blue600,
      700: theme.colors?.blue700,
      800: theme.colors?.blue800,
      900: theme.colors?.blue900,
    },
    
    gray:{
      400:theme.colors?.gray400,
      800:theme.colors?.gray800,
    },

    dark: {
      main: theme.colors?.darkLevel1,
    },
    text: {
      primary: theme.textColor,
      secondary: theme.darkTextSecondary,
      disabled: theme.colors?.textDisabled,
    },
    background: {
      paper: theme.paper,
      default: theme.background,  // Changed from 'main' to 'default'
    },
    navbar: {
      default: theme.colors?.navbar?.default,
      light: theme.colors?.navbar?.light,
      dark: theme.colors?.navbar?.dark,
    },
    sidebar: {
      default: theme.colors?.sidebar?.default,
      light: theme.colors?.sidebar?.light,
      dark: theme.colors?.sidebar?.dark,
    },
    button: {
      primary: theme.colors?.button?.primaryMain,
      primaryLight: theme.colors?.button?.primaryLight,
      primaryDark: theme.colors?.button?.primaryDark,
      secondary: theme.colors?.button?.secondaryMain,
      secondaryLight: theme.colors?.button?.secondaryLight,
      secondaryDark: theme.colors?.button?.secondaryDark,
      disabled: theme.colors?.button?.buttonDisabled,
    },
    shadows: {
      button: `0px 4px 10px ${theme.colors?.primaryMain}40`,
      card: `0px 2px 8px ${theme.colors?.grey200}`,
      modal: `0px 10px 20px ${theme.colors?.grey200}80`,
    },
  };
}