import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { TopNavBar } from '../components/TopNavBar';

export const Visualize = () => {
  return (
    <>
        <TopNavBar pageName={'Visualize'} />
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: "50%",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4">
              Time Yourself
            </Typography>
            <Typography component="h6" variant="h6">
              Remember living is just time
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
            </Box>
          </Box>
        </Container>
    </>
  )
}
export default Visualize;