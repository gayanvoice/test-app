import React, { useState } from "react";
import { Box, Button, Modal, TextField, Grid, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid black',
    boxShadow: 24,
    p: 4,
};

function EditModal({ sensorData, onSubmit, children }) {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState(sensorData || { id: '', name: '', partitionKey: '' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (onSubmit) onSubmit(formValues);
        handleClose();
    };
    return (
        <Box>
            <Box onClick={handleOpen} sx={{ display: 'inline' }}>
                {children}
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h6" mb={2}>
                        Add / Edit Sensor
                    </Typography>
                    <Grid container spacing={2} direction="column">
                        <Grid item>
                            <TextField
                                fullWidth
                                label="ID"
                                name="id"
                                value={formValues.id}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                fullWidth
                                label="Partition Key"
                                name="partitionKey"
                                value={formValues.partitionKey}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}
export default EditModal;