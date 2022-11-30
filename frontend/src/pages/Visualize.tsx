import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TopNavBar } from '../components/TopNavBar';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { VisualizerDayDto, VisualizerDto, VisualizerMonthDto } from '../interfaces/VisualizerDto';
import { GetFromServer } from '../services/server';



export const Visualize = () => {
  let [userVisualizerDataMonths, setUserVisualizerDataMonths] = useState<VisualizerDto>({ months: [] });

  const onServerResponse = (json: any) => {
    let visualize: VisualizerDto = json;
    setUserVisualizerDataMonths(visualize);
  }

  useEffect(() => {
    GetFromServer({
      callbackFunction: onServerResponse,
      endpoint: 'visualizer/test?userId=1&configId=1',
    });
  }, []);

  const renderMonths = () => {
    return userVisualizerDataMonths.months.map((month: VisualizerMonthDto) => {
      return (
        <>
          <div>
            {month.id}
          </div>
        </>
      )
    })
  }


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
          <Typography component="h6" variant="h6">
            January:
          </Typography>
          {renderMonths()}


        </Box>
      </Container>
    </>
  )
}

/*
          <Grid container
            spacing={{ xs: 0 }}
            columns={{ xs: 11 }}>
            {userVisualizerDataMonths.months.map((data: VisualizerDto) => <Grid item xs={2} >
              <Button
                variant={data.person !== "" ? "outlined" : "contained"}
                size="small" >
              </Button>
            </Grid>
            )}
          </Grid>
*/
export default Visualize;
