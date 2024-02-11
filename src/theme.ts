'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode: mode,
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === 'info' && {
              backgroundColor: '#60a5fa',
            }),
          }),
        },
      },
    },
  });
}

export default getTheme;
