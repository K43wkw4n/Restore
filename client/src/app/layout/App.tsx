import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react'
import Catalog from '../../features/Catalog';
import catalog from '../../features/Catalog';
import Header from './Header'


export default function App() {
  const [mode, setMode] = useState(true)
  const displayMode = mode ?  'light' : 'dark'

  const darkTheme = createTheme({
    palette: {
      mode: displayMode
    },
  });
  
  const handlemode=()=>setMode(!mode)

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header handlemode={handlemode}/>
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </>
  )
}
