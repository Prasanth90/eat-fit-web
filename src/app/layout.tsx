'use client'

import * as React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import getTheme from '@/theme'
import { ThemeToggleContext } from '@/components/ThemeToggle/ThemeToggleContext'
import { PaletteMode } from '@mui/material'
import Appbar from '@/components/Appbar/Appbar'

export default function RootLayout(props: { children: React.ReactNode }) {
  const [mode, setMode] = React.useState<PaletteMode>('light')

  const paletteMode = React.useMemo(
    () => ({
      togglePaletteMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = React.useMemo(() => getTheme(mode), [mode])

  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <UserProvider>
            <ThemeToggleContext.Provider value={paletteMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Appbar />
                {props.children}
              </ThemeProvider>
            </ThemeToggleContext.Provider>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
