import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import { Alert, Button, Grid,  MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { ConfigDto, getIdFromConfigPerson } from '../interfaces/ConfigDto';
import { GetFromServer, PostFromServer } from '../services/server';
import { MobileDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const Manage = () => {
  const [meetPerson, setMeetPerson] = useState("");
  const [person, setPerson] = useState('');
  const [peopleToMeetWith, setPeopleToMeetWith] = useState<ConfigDto[]>([]);
  const [calendar, setCalendar] = useState<Dayjs | null>(
    dayjs('2022-12-18T21:11:54'),
  );
  const saveMeeting = () => {
    PostFromServer({
      callbackFunction: () => {},
      endpoint: "manage/add",
      data: {
        configId: getIdFromConfigPerson(peopleToMeetWith, person),
        insertDate: calendar !== null ? calendar.toDate() : new Date()
      }
    })

  }

  const handleChangee = (newValue: Dayjs | null) => {
    setCalendar(newValue);
  };


  const handleChange = (event: SelectChangeEvent) => {
    setPerson(event.target.value as string);
  };

  useEffect(() => {
  }, []);

  const onServerResponse = (json: any) => {
    let configUsers: ConfigDto[] = json;
    setPeopleToMeetWith(configUsers);

    setMeetPerson("Rubén");
    setPerson('hola');
  }
  useEffect(() => {
    GetFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'configuration'
    });
  }, []);

  return (
    <>
      <TopNavBar pageName={'Manage Time'} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "10%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20%'
          }}
        >
          <Typography component="h6" variant="h6" marginBottom={'20px'}>
            Select the person you have meet today:
          </Typography>
          <Select
            value={person}
            label="Age"
            onChange={handleChange}
          >
            {peopleToMeetWith.map((p) => <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
          </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <MobileDatePicker
                  label="Date mobile"
                  inputFormat="MM/DD/YYYY"
                  value={calendar}
                  onChange={handleChangee}
                  renderInput={(params: any) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
        </Box>

        <Grid container direction="row" justifyContent="center" alignItems="center" marginBottom="40px"
          marginTop="20px"
          spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => saveMeeting()}
              color="inherit"
              size="large"
            >
              Save meeting
            </Button>

          </Grid>
          <Grid item >
            <Button
              variant="outlined"
              //onClick={handleClose}
              color="secondary"
              size="large"
            >
              Delete user
            </Button>
          </Grid>

          <Grid item >
          </Grid>
        </Grid>
        <Alert severity="success">You have add meet with {meetPerson}</Alert>
        <Alert severity="error">You have add meet with {meetPerson}</Alert>
      </Container>

    </>
  )
}
export default Manage;