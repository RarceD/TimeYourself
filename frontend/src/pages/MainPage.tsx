import {Avatar, Button, Typography, Container, Box} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Implementado autologin:
    let autoLogin: string | null = localStorage.getItem("autologin")
    if (autoLogin != null)
      navigate("courts")
  }, [navigate]);

  return (
    <>
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
          <Avatar sx={{ m: 2, width: 104, height: 104 }}
            variant="rounded"
            src={"/static/time.png"}>
            {/* <SportsBaseballIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h4">
            Time Yourself
          </Typography>
          <Typography component="h6" variant="h6">
            Remember living is just time
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => navigate('/visualize')}
              color="error"
              sx={{ mt: 1, mb: 1 }}
            >
              Visualize
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => navigate('/manage')}
              color="info"
              sx={{ mt: 1, mb: 1 }}
            >
              Manage time
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => navigate('/config')}
              color="inherit"
              sx={{ mt: 1, mb: 1 }}
            >
              Configuration
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default MainPage;