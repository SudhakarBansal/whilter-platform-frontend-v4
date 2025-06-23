import type { TypographyOptions } from '@mui/material/styles/createTypography';

interface ThemeTypographyOptions {
  fontFamily?: string;
  allVariants?: {
    fontFamily: string;
    textTransform: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width' | 'full-size-kana';
    fontSize: number;
  };
  textColor?: string;
  heading?: string;
  darkTextSecondary?: string;
  background?: string;
  borderRadius?: number;
  grey500?: string;
}

/**
 * Typography used in theme
 * @param {ThemeTypographyOptions} theme Theme customization object
 */
export default function themeTypography(theme: ThemeTypographyOptions): TypographyOptions {
  return {
    fontFamily: theme?.fontFamily,
    allVariants: theme?.allVariants,
    fontSize: 16,
    h6: {
      fontWeight: 500,
      color: theme.textColor,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '1rem',
      color: theme.textColor,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.375rem',
      color: theme.textColor,
      fontWeight: 400,
    },
    h3: {
      fontSize: '1.5rem',
      color: theme.textColor,
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.875rem',
      color: theme.textColor,
      fontWeight: 500,
    },
    h1: {
      fontSize: '2rem',
      color: theme.textColor,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 400,
      color: theme.textColor,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
      color: theme.textColor,
      textTransform: 'uppercase',
    },
    caption: {
      fontSize: '0.75rem',
      color: theme.textColor,
      fontWeight: 400,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: theme.textColor,
      // lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.textColor,
    },
    button: {
      textTransform: 'capitalize',
    }
  };
}