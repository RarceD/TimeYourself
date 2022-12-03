import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TopNavBar } from '../components/TopNavBar';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { VisualizerDayDto, VisualizerDto, VisualizerMonthDto } from '../interfaces/VisualizerDto';
import { GetFromServer } from '../services/server';
import { MonthCalendar } from '../components/MonthCalendar';


export const Visualize = () => {
  let [userVisualizerDataMonths, setUserVisualizerDataMonths] = useState<VisualizerDto>({ months: [] });

  const onServerResponse = (json: any) => {
    console.log(json)
    let visualize: VisualizerDto = json;
    setUserVisualizerDataMonths(visualize);
  }

  useEffect(() => {
    GetFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'visualizer/all',
    });
  }, []);

  return (
    <>
      <TopNavBar pageName={'Visualize'} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: "50%",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        </Box>
       <MonthCalendar data={userVisualizerDataMonths} /> 
      </Container>
    </>
  )
}

export default Visualize;