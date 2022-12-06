import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TopNavBar } from '../components/TopNavBar';
import { Button, ButtonGroup, Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { VisualizerDayDto, VisualizerDto, VisualizerMonthDto } from '../interfaces/VisualizerDto';
import { GetFromServer } from '../services/server';
import { MonthCalendar } from '../components/MonthCalendar';
import { MobileDatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export const Visualize = () => {
  let [userVisualizerDataMonths, setUserVisualizerDataMonths] = useState<VisualizerDto[]>([]);

  const [value, setValue] = useState<Dayjs | null>(
    dayjs('2022-12-18T21:11:54'),
  );
  const handleChangee = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  const [person, setPerson] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setPerson(event.target.value as string);
  };


  const onServerResponse = (json: any) => {
    let visualize: VisualizerDto[] = json;
    console.log(visualize);
    setUserVisualizerDataMonths(visualize);
  }

  useEffect(() => {
    GetFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'visualizer/all?year=2022',
    });
  }, []);

  return (
    <>
      <TopNavBar pageName={'Visualize'} />
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Select Year"
                inputFormat="YYYY"
                value={value}
                onChange={handleChangee}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

          <Select
            label="Select Year"
            value={person}
            onChange={handleChange}
          >
            {["test"].map((p) => <MenuItem value={p}>{p}</MenuItem>)}
          </Select>


          {
            userVisualizerDataMonths.length > 0 ?
              <MonthCalendar data={userVisualizerDataMonths[0]} /> :
              <></>
          }

        </Box>
      </Container>
    </>
  )
}

export default Visualize;