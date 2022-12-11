import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { GetUserDto } from '../util/util';
import { useEffect, useState } from 'react';
import { PostFromServer } from '../services/server';
import { UserDto } from '../interfaces/UserDto';
import 'animate.css';

export const Login = () => {
  const [user, setUser] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const navigate = useNavigate();

  const onServerResponse = (json: any) => {
    let raw: UserDto = json;
    if (raw.token === "") {
      setErrorSubmit(true);
      return;
    }
    // If OK:
    localStorage.setItem("user", JSON.stringify(json));
    let user: UserDto | null = GetUserDto();
    if (user != null) {
      navigate('/mainPage');
    }
  }

  const handleSubmit = () => {
    // TODO: this is just for testing, remove:
    PostFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'user',
      data: {
        "userNumber": user
      }
    });
  }

  useEffect(() => {
  });
  return (
    <>
      <canvas id="webgl"></canvas>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "10%",
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
          <Typography component="h1" variant="h4"
            className='animate__animated animate__bounceIn animate__slow animate__delay-2s '
          >
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
              control={<Checkbox value={false} color="primary" />}
              label="Remember me"
            // onChange={handleChangeAutologin}
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