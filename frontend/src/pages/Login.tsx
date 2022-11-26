import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { deepOrange } from '@mui/material/colors';
import { URL_REQUEST } from '../util/util';
import { useEffect, useState } from 'react';
import image_logo from './../images/time.png';
import { GetFromServer, PostFromServer } from '../services/server';
import { ServerAction } from '../interfaces/serverAction';

export const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorSubmit, setErrorSubmit] = useState(false);
  const navigate = useNavigate();
  const [autologin, setAutologin] = useState(false);
  const handleChangeAutologin = (e: any) => autologin ? setAutologin(false) : setAutologin(true);

  useEffect(() => {
    // Implementado autologin:
    let autoLogin: string | null = localStorage.getItem("autologin")
    if (autoLogin != null)
      navigate("courts")
  }, [navigate]);

  const onServerResponse = (json: string) => {
    console.log(json);
    // navigate('/mainPage');
  }

  const handleSubmit = () => {
    PostFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'user',
      data: {
        "userNumber": "1234",
        "token": "1234"
      }
    });
  }

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
          <Avatar sx={{ m: 2, bgcolor: deepOrange[600], width: 104, height: 104 }}
            variant="rounded"
            src={image_logo}>
            {/* <SportsBaseballIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h4">
            Time Yourself
          </Typography>
          <Typography component="h6" variant="h6">
            Remember living is just time
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
            <TextField
              margin="normal"
              fullWidth
              error={errorSubmit}
              label="Credentials"
              name="email"
              autoFocus
              onChange={(e: any) => { setUser(e.target.value); }}
            />
            <FormControlLabel
              control={<Checkbox value={autologin} color="primary" />}
              label="Remember me"
              onChange={handleChangeAutologin}
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Enter
            </Button>
          </Box>
        </Box>
      </Container>
      {/* </ThemeProvider> */}
    </>
  )
}
export default Login;