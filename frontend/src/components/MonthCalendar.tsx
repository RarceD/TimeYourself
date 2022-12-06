import { Button, Grid, Typography } from "@mui/material";
import { VisualizerDayDto, VisualizerDto, VisualizerMonthDto } from "../interfaces/VisualizerDto";

const numberToMonth = (numMonth: number): string => {
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    return months[numMonth - 1];
}

interface MonthProps {
    data: VisualizerDto
}
export const MonthCalendar = (props: MonthProps) => {
    // TODO: Improve visualization of this component
    const { data } = props;
    return (
        <>
            {
                data.months.map((month: VisualizerMonthDto) => {
                    return <>
                        <Typography component="h6" variant="h6"
                            style={{
                                marginBottom: "20px"
                            }}>
                            - {numberToMonth(month.id)}:
                        </Typography>

                        <Grid container
                            spacing={{ xs: 1 }}
                            columns={{ xs: 4 }}
                            margin="10px"
                        >
                            {month.days.map((day: VisualizerDayDto) => {
                                return (
                                    <>
                                        <Button
                                            key={day.id}
                                            color={day.people.length > 0 ? "error" : "inherit"}
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