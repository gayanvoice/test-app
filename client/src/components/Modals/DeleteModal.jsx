import React, { useState } from "react";
import { Box, Button, Modal, Typography, Grid } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    border: '2px solid black',
    boxShadow: 24,
    p: 4,
};

function DeleteModal({ sensorName, onDelete, children  }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        if (onDelete) onDelete();
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
                        Confirm Deletion
                    </Typography>
                    <Typography variant="body1" mb={3}>
                        Are you sure you want to delete the sensor <strong>{sensorName}</strong>?
                    </Typography>
                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                            <Button variant="contained" onClick={handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}
export default DeleteModal;