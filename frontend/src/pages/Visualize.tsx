import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
import { ConfigDto } from '../interfaces/ConfigDto';


export const Visualize = () => {
  let [userVisualizerDataMonths, setUserVisualizerDataMonths] = useState<VisualizerDto[]>([]);

  const [calendar, setCalendar] = useState<Dayjs | null>(dayjs('2022-12-18T21:11:54'));
  const handleChangee = (newValue: Dayjs | null) => {
    let selectedYear: number | undefined = newValue?.get("year");
    if (selectedYear !== undefined) 
      setYear(selectedYear);
    setCalendar(newValue);
  };

  const [person, setPerson] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [configOptions, setConfigOptions] = useState<ConfigDto[]>([]);
  const handleChange = (event: SelectChangeEvent) => {
    setPerson(event.target.value as string);
  };

  const onServerResponse = (json: any) => {
    let visualize: VisualizerDto[] = json;
    console.log(visualize);
    setUserVisualizerDataMonths(visualize);
  }
  const onServerResponseConfig = (json: any) => {
    let configUsers: ConfigDto[] = json;
    setConfigOptions(configUsers);
    if (configUsers.length > 0)
      setPerson(configUsers[0].name)
  }
  useEffect(() => {
    GetFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'visualizer/all?year=' + year,
    });
    GetFromServer({
      callbackFunction: onServerResponseConfig,
      endpoint: 'configuration',
    });
  }, [year]);

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
                value={calendar}
                onChange={handleChangee}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>

          <Select
            label="Select person"
            value={person}
            onChange={handleChange}
            sx={{marginTop: "5%"}}
          >
            {configOptions.length > 0 ? configOptions.map((p) => <MenuItem key={p.id + p.name} value={p.name}>{p.name}</MenuItem>) : <></>}
          </Select>
          {
            userVisualizerDataMonths.length > 0 ?
              <MonthCalendar data={userVisualizerDataMonths[0]} configUser={person} /> :
              <></>
          }

        </Box>
      </Container>
    </>
  )
}

export default Visualize;