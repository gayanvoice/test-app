import { NavLink } from "react-router";
import { Box, Button } from "@mui/material";
import '@fontsource/roboto/300.css';
import React from "react";

function Nav() {
    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <Button component={NavLink} to="/sensors/index" variant="text" color="primary">Index</Button>
            <Button component={NavLink} to="/sensors/summary" variant="text" color="primary">Summary</Button>
            <Button component={NavLink} to="/sensors/add" variant="text" color="primary">Add</Button>
            <Button component={NavLink} to="/sensors/upload" variant="text" color="primary">Upload</Button>
        </Box>
    );
}
export default Nav;