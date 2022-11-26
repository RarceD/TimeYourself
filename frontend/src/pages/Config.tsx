import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router';
import { URL_REQUEST } from '../util/util';
import { useEffect, useState } from 'react';
import { TopNavBar } from '../components/TopNavBar';



export const Config = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [errorSubmit, setErrorSubmit] = useState(false);
  const navigate = useNavigate();
  const [autologin, setAutologin] = useState(false);
  const handleChangeAutologin = (e: any) =>  autologin ? setAutologin(false) : setAutologin(true);

  useEffect(() => {
    // Implementado autologin:
    let autoLogin: string | null = localStorage.getItem("autologin")
    if (autoLogin != null)
      navigate("courts")
  }, [navigate]);

  const handleSubmit = () => {
    let data = { user: user, pass: "" }
    const to_send = JSON.stringify(data)
    const requestOptions = {
      method: 'POST',
      mode: "cors" as RequestMode,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: to_send
    };

    fetch(URL_REQUEST + "login", requestOptions)
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response["success"]) {
          localStorage.setItem("id", response["id"]);
          localStorage.setItem("token", response["token"]);
          if (autologin)
            localStorage.setItem("autologin", "1");
          else
            localStorage.setItem("autologin", "0");
          ;
        }
        else
          setErrorSubmit(true);
      });
  }

  return (
    <>
        <TopNavBar pageName={'Configuration'} />
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
export default Config;