import React from "react";
import {Box, Grid, Typography} from "@mui/material";

function Index() {
    return (
            <Grid container spacing={3} alignItems="center">
                <Grid>
                    <Typography variant="h3" gutterBottom>
                        Sensor Management App
                    </Typography>
                    <Typography variant="body1">
                        This application allows you to manage and monitor different types of sensors
                        including temperature, pressure, and humidity sensors. You can add new sensors,
                        edit existing ones, and keep track of sensor data easily through a clean interface.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Built with React and Material-UI, the app ensures a responsive and modern design,
                        making sensor management efficient and user-friendly.
                    </Typography>
                </Grid>
            </Grid>
    )
}
export default Index