import React, { useState } from "react";
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Button,
    Box,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";
import {v4} from "uuid";

function Add() {
    const [formValues, setFormValues] = useState({
        name: "",
        quantity: "",
        price: "",
        clearance: false,
    });

    const [loading, setLoading] = useState(false);
    const [serverMessage, setServerMessage] = useState(null);
    const [serverError, setServerError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerMessage(null);
        setServerError(null);
        setLoading(true);

        const formModel = {
            id: v4(),
            partition_key: 'heat_sensor',
            name: formValues.name,
            quantity: Number(formValues.quantity) || 0,
            price: Number(formValues.price),
            clearance: Boolean(formValues.clearance),
        };
        console.log(formModel);
        try {
            const url = new URL("http://localhost:8080/api/sensors/post");
            console.log(url);
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formModel),
            });
            const responseJson = await response.json();
            console.log(responseJson);

            if (responseJson.status === 201) {
                setServerMessage(responseJson.message + ' (' + responseJson.duration +' seconds)');
                setFormValues({name: undefined, quantity: undefined, price: undefined, clearance: false});
            }
            else if (responseJson.status === 404) {
                setServerError(responseJson.message + ' (' + responseJson.duration +' seconds)');
            }
            else if (responseJson.status === 400) {
                setServerError(responseJson.message + ' (' + responseJson.duration +' seconds)');
            }
        } catch (err) {
            setServerError(err.message || 'unexpected error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column">
                <Grid>
                    <TextField
                        label="Name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <TextField
                        label="Quantity"
                        type="number"
                        name="quantity"
                        value={formValues.quantity}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <TextField
                        label="Price"
                        type="number"
                        name="price"
                        value={formValues.price}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>

                <Grid>
                    <FormControlLabel
                        control={
                            <Switch
                                name="clearance"
                                checked={formValues.clearance}
                                onChange={handleChange}
                            />
                        }
                        label="Clearance"
                    />
                </Grid>

                <Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={18} /> : null}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </Grid>

                {serverMessage && (
                    <Grid>
                        <Alert severity="success">
                            <Typography variant="body2">{serverMessage}</Typography>
                        </Alert>
                    </Grid>
                )}
                {serverError && (
                    <Grid>
                        <Alert severity="error">
                            <Typography variant="body2">{serverError}</Typography>
                        </Alert>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default Add;
