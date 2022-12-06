import { Button, Grid, Typography } from "@mui/material";
import { VisualizerDayDto, VisualizerDto, VisualizerMonthDto } from "../interfaces/VisualizerDto";

const numberToMonth = (numMonth: number): string => {
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return months[numMonth - 1];
}

interface MonthProps {
    data: VisualizerDto,
    configUser: string
}
export const MonthCalendar = (props: MonthProps) => {
    // TODO: Improve visualization of this component
    const { data, configUser } = props;
    return (
        <>
            {
                data.months.map((month: VisualizerMonthDto) => {
                    return <>
                        <Typography component="h6" variant="h6"
                            fontStyle={"italic"}
                            //key={month.id + month.days[month.id].id}
                            style={{
                                marginBottom: "20px"
                            }}>
                            {numberToMonth(month.id)}
                        </Typography>

                        <Grid container
                            //key={month.id}
                            spacing={{ xs: 1 }}
                            columns={{ xs: 4 }}
                            margin="10px"
                        >
                            {month.days.map((day: VisualizerDayDto) => {
                                return (
                                    <>
                                        <Button
                                            key={day.id ** month.id}
                                            color={day.people.length > 0 && configUser === day.people[0] ? "error" : "inherit"}
                                            variant={day.people.length > 0 ? "contained" : "outlined"}
                                            size="large"
                                        >
                                        </Button>
                                    </>
                                );
                            })}
                        </Grid>
                    </>;
                }
                )
            }
        </>
    )
}