import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { TopNavBar } from '../components/TopNavBar';
import { Alert, Button, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { ConfigDto, getIdFromConfigPerson } from '../interfaces/ConfigDto';
import { GetFromServer, PostFromServer } from '../services/server';
import { MobileDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const Manage = () => {
  const [meetPeopleInDate, setMeetPeopleInDate] = useState<string[]>([]);
  const [person, setPerson] = useState('');
  const [peopleToMeetWith, setPeopleToMeetWith] = useState<ConfigDto[]>([]);
  const [calendar, setCalendar] = useState<Dayjs | null>(dayjs());

  const editMeeting = (add: boolean) => {
    PostFromServer({
      callbackFunction: (resp: any) => {  getMeetingPeople(); console.log(resp) },
      endpoint: add ? "manage/add" : "manage/remove",
      data: {
        configId: getIdFromConfigPerson(peopleToMeetWith, person),
        insertDate: calendar !== null ? calendar.toDate() : new Date()
      }
    })
  }
  const getMeetingPeople = () => {
    const configId = getIdFromConfigPerson(peopleToMeetWith, person);
    let dateTime = calendar !== null ? calendar.toDate() : new Date()
    let dateTimeStr = dateTime.getDate() + "/" + (dateTime.getMonth() + 1) + "/" + dateTime.getFullYear()
    console.log(dateTimeStr);
    //debugger;
    GetFromServer({
      callbackFunction: (resp: any) => {
        let d: string[] = resp; setMeetPeopleInDate(d);
        console.log(d);
      },
      endpoint: "visualizer?configId=" + configId + "&dateTime=" + dateTimeStr
    })
  }

  const handleChangee = (newValue: Dayjs | null) => {
    setCalendar(newValue); getMeetingPeople();
  };
  const handleChange = (event: SelectChangeEvent) => {
    setPerson(event.target.value as string); getMeetingPeople();
  };

  const onServerResponse = (json: any) => {
    let configUsers: ConfigDto[] = json;
    setPeopleToMeetWith(configUsers);
    if (configUsers.length > 0)
      setPerson(configUsers[0].name)

      //setTimeout(()=> getMeetingPeople(), 1000);
    

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
          }}
        >
          <Typography component="h6" variant="h6" marginBottom={'20px'}>
            Select the person you have meet today:
          </Typography>
          <Select
            label="Date mobile"
            value={person}
            onChange={handleChange}
          >
            {peopleToMeetWith.map((p) => <MenuItem key={p.id} value={p.name}>{p.name}</MenuItem>)}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack spacing={3}
              style={{ marginTop: '30px' }}>
              <MobileDatePicker
                label="Date mobile"
                inputFormat="DD/MM/YYYY"
                value={calendar}
                onChange={handleChangee}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>

        <Grid container direction="row" justifyContent="center" alignItems="center" marginBottom="10%"
          marginTop="20px"
          spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => editMeeting(true)}
              //color=""
              size="large"
            >
              Save meeting
            </Button>

          </Grid>
          <Grid item >
            <Button
              variant="contained"
              onClick={() => editMeeting(false)}
              color="error"
              size="large"
            >
              Delete meeting
            </Button>
          </Grid>
        </Grid>
      </Container>

      <div>
        {
          meetPeopleInDate.length > 0 ?
            meetPeopleInDate.map((p) => <Alert severity="success">You have add meet with {p}</Alert>)
            : <></>
        }
      </div>

    </>
  )
}
export default Manage;

// TODO: Al borrar user tengo que descarlo
// <Alert severity="error">You have add meet with {meetPerson}</Alert>