import React, { useState } from "react";
import { Grid, Button, Typography, Input } from "@mui/material";

function Upload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (file) {
            console.log("Uploading file:", file);
        }
    };
    return(
        <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
                <Typography variant="h5">Upload Sensor File</Typography>
            </Grid>

            <Grid item>
                <Input type="file" onChange={handleFileChange} />
            </Grid>

            <Grid item>
                <Button variant="contained" color="primary" onClick={handleUpload}>
                    Upload
                </Button>
            </Grid>

            {file && (
                <Grid item>
                    <Typography variant="body1">Selected File: {file.name}</Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default Upload
