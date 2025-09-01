import React from "react";
import {Outlet} from "react-router";
import Nav from "../Navs/Nav.jsx";
import {Box, Grid } from "@mui/material";

function Layout() {
    return (
        <Box sx={{ flexGrow: 1, p: 2, border: '2px solid black', width: '50%', mx: 'auto' }}>
            <Grid
                container
                direction="column"
                alignItems="center"
                spacing={2}>
                <Grid size={12}>
                        <Nav />
                </Grid>
                <Grid size={12}>
                    <Outlet />
                </Grid>
            </Grid>
        </Box>
    )
}
export default Layout