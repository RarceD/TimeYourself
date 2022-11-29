import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TopNavBar } from '../components/TopNavBar';
import { Button, ButtonGroup, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { VisualizerDayDto, VisualizerDto, VisualizerMonthDto } from '../interfaces/VisualizerDto';



export const Visualize = () => {
  let [userVisualizerDataMonths, setUserVisualizerDataMonths] = useState<VisualizerDto>({ months: [] });

  useEffect(() => {
    let visualize: VisualizerDto = { months: [] };

    // Add days to months:
    for (let x = 0; x < 5; x++) {
      let month: VisualizerMonthDto = { days: [] };
      for (let i = 0; i < 30; i++) {
        let j: VisualizerDayDto = {
          id: i,
          person: i % 2 === 0 ? "test" : ""
        }
        month.days.push(j);
      }
      visualize.months.push(month);
    }
    setUserVisualizerDataMonths(visualize);

    /*
    for (let i = 0; i < 30; i++) {
    }
    setUserVisualizerData(total);
    let months: VisualizerDto = {months: []};
    months.push(total)

    */
  }, []);

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
