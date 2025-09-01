import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText, IconButton, Button, Modal, TextField, Grid, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from "../components/Modals/EditModal.jsx";
import DeleteModal from "../components/Modals/DeleteModal.jsx";
function Summary() {
    const [sensors, setSensors] = useState([]);
    const handleSubmit = (data) => {
        console.log("Sensor Data Submitted:", data);
    };
    const handleDelete = () => {
        console.log("Sensor deleted!");
    };
    const get = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/getAll");
            if (!response.ok) {
                console.error("Failed to fetch sensors");
            }
            const json = await response.json();
            const rows = Array.isArray(json?.data) ? json.data : Array.isArray(json) ? json : [];
            setSensors(rows);
        } catch (error) {
            console.error("Error fetching sensors:", error);
        }
    };
    useEffect(() => {
        get();
    }, []);


    return (
        <>
            <List>
                {sensors.map(sensor => (
                    <ListItem
                        key={sensor.id}
                        secondaryAction={
                            <Box>
                                <EditModal onSubmit={handleSubmit} sx={{ m: 4 }} >
                                    <IconButton color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </EditModal>
                                <DeleteModal sensorName="Sensor A" onDelete={handleDelete}  sx={{ m: 4 }} >
                                    <IconButton color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </DeleteModal>
                            </Box>
                        } >
                        <ListItemText
                            primary={sensor.text}
                            secondary={`ID: ${sensor.id}, PartitionKey: ${sensor.partition_key}`}
                        />
                    </ListItem>
                ))}
            </List>



        </>
    )
}
export default Summary
